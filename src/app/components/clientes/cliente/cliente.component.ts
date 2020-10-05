import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//Service
import { ClienteService } from 'src/app/services/cliente.service';
// Class
import { Cliente } from '../../../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  
  constructor(
    public clienteService: ClienteService,
    public toastr: ToastrService
  ) { }

  ngOnInit() {
    this.clienteService.getClientes();
    this.resetForm();
  }
  onSubmit(clienteForm: NgForm) {
    if (clienteForm.value.$key == null)
      this.clienteService.insertCliente(clienteForm.value);
    else
      this.clienteService.updateCliente(clienteForm.value);

    this.resetForm(clienteForm);
    this.toastr.success('Sucessful Operation', 'Cliente registrado');
  }
  // Para limpiar el formulario
  resetForm(clienteForm?: NgForm) {
    if (clienteForm != null)
      clienteForm.reset();
    this.clienteService.selectedCliente = new Cliente();
  }


}

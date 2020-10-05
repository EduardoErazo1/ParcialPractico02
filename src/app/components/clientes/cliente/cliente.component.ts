import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
//Service
import { ClienteService } from 'src/app/services/cliente.service';
// Class
import { Cliente } from '../../../models/cliente';
// toastr
import { ToastrService } from 'ngx-toastr';

import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

/*ticket:boolean=false;
clientef:NgForm;
cliente:Cliente;*/
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

    this.clienteService.ticket=true;
    this.clienteService.clientef=clienteForm;
    this.toastr.success('Sucessful Operation', 'Cliente registrado');
  }
  download(){
    var element = document.getElementById('pdf')
    html2canvas(element).then((canvas) => {
      console.log(canvas)
      var imgData = canvas.toDataURL('image/png')
      var doc = new jspdf()
      var imgHeight = canvas.height * 208 / canvas.width;
      doc.addImage(imgData,0,0,208,imgHeight)
      doc.save("factura.pdf")
    })
  }
  apareceForm()
  {
    this.clienteService.ticket=false;
    this.resetForm(this.clienteService.clientef);
    
  }
  // Para limpiar el formulario
  resetForm(clienteForm?: NgForm) {
    if (clienteForm != null)
      clienteForm.reset();
    this.clienteService.selectedCliente = new Cliente();
  }


}

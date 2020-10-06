import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
// model
import { Cliente } from '../../../models/cliente';

// service
import { ClienteService } from '../../../services/cliente.service';

// toastr
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  clienteList: Cliente[];
    conta:number;
    buscar:string;
  
  constructor(
    public clienteService2: ClienteService,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private firebase: AngularFireDatabase
  ) { }

  ngOnInit() {
    this.mostrarRegistros(); 
  }

  mostrarRegistros(){
    this.clienteService.getClientes()
      .snapshotChanges().subscribe(item => {
        this.clienteList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.clienteList.push(x as Cliente);
        });
      });
  }

  /* 
   Recibe una varible de tipo 'Product' para invocar el servicio de firebase, para actualizarlo
   Para no ocupar el doble enlace de datos ' [(ngModel)]' , se va utilizar 'Object.assign({}, product)'  
  */
  onEdit(cliente: Cliente) {
    this.clienteService.selectedCliente = Object.assign({}, cliente);
  }
  onEdit2(cliente: Cliente) {
    this.clienteService.selectedCliente = Object.assign({}, cliente);
    this.clienteService2.ticket=true;
  }
  onDelete($key: string) {
    if (confirm('Estas seguro de borrar el registro seleccionado?')) {
      this.clienteService.deleteProduct($key);
      this.toastr.warning('Borrado exitoso', 'Cliente removido');
    }
  }

  consulClie(){
    

    this.clienteService.getClientes()
      .snapshotChanges().subscribe(item => {
        this.clienteList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          this.clienteList.push(x as Cliente);
        });

        this.clienteList = this.clienteList.filter(data => {
          return data.dui.toString().trim() === this.buscar;
        })
  
        if(this.clienteList.length === 0){
          this.toastr.warning('Registro no encontrado', 'Advertencia');
          this.mostrarRegistros();
        }
      });
  }
  
// Para limpiar el formulario
resetForm(clienteForm2?: NgForm) {
  if (clienteForm2 != null)
    clienteForm2.reset();
  this.clienteService.selectedCliente = new Cliente();
}

filterPost = '';

}

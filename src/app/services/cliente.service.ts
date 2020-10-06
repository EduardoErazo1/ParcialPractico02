import { Injectable } from '@angular/core';
import { query } from '@angular/animations';
import { NgForm } from '@angular/forms';
// Firebase
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

// Model
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  clienteList: AngularFireList<any>;
  // Una variable temporal, para guardar los datos seleccionados, del tipo Product
  selectedCliente: Cliente = new Cliente();
  clientesreg: Cliente[]= [];

  ticket:boolean=false;
  ticket2:boolean=false;
  clientef:NgForm;
  cliente:Cliente;
  constructor(private firebase: AngularFireDatabase) { }
    // Traer todos los productos desde firebase 
    getClientes() { // guarda los elementos en la varible 'clientes'

    this.firebase.list('clientes').snapshotChanges().subscribe(item => {
      this.clientesreg = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clientesreg.push(x as Cliente);
      });
    });

    return this.clienteList = this.firebase.list('clientes');
  }

  // crear un nuevo producto  , recibiendo un parametro de tipo Product
  insertCliente(cliente: Cliente) {
    let cuenta =0;
  
      for (let clie of this.clientesreg){      
        if(clie.dui==cliente.dui){
          cuenta++;        
        }
      }
      if(cuenta == 0)
      {
        cliente.descuento = 0;        
      }else if(cuenta >=1 && cuenta <= 4){
        cliente.descuento = 0.05;   
      } else if(cuenta > 4){
        cliente.descuento = 0.08;   
      }

      cliente.total = cliente.costo -(cliente.costo * cliente.descuento);
      this.selectedCliente.total= cliente.total;
      this.selectedCliente.descuento= cliente.descuento;

    // agregar un dato al final de la lista, como recibe un objeto del tipo Product , puede acceder a sus propiedades
    this.clienteList.push({
      nombre: cliente.nombre,
      dui: cliente.dui,
      nombreM: cliente.nombreM,
      tratamiento:cliente.tratamiento,
      medicamento:cliente.medicamento,
      costo:cliente.costo,
      descuento: cliente.descuento,
      total: cliente.total
    });
  }

  // Actualiza un producto, recibiendo un parametro de tipo Product
  updateCliente(cliente: Cliente) {
    // Utilizando el metodo update de firebase , se envia clave y los parametros que va actualizar 
    this.clienteList.update(cliente.$key, {
      nombre: cliente.nombre,

      nombreM: cliente.nombreM,
      tratamiento:cliente.tratamiento,
      medicamento:cliente.medicamento
    });
  }

  // Elimina un producto, recibiendo como parametro la clave , utilizando el metodo remove de firebase
  deleteProduct($key: string) {
    this.clienteList.remove($key);
  }


 
}

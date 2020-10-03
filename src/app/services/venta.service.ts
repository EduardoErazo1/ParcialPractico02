import { Injectable } from '@angular/core';

import {AngularFireDatabase, AngularFireDatabaseModule, AngularFireList} from '@angular/fire/database'
import {Venta} from '.././models/venta'

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  
  ventaList: AngularFireList<any>;
  selectedVenta: Venta = new Venta();

  constructor(private firebase: AngularFireDatabase) { }


  getVentas(){
    return this.ventaList = this.firebase.list('venta');
  }

  insertVenta(venta: Venta)
  {
    this.ventaList.push({
      nombre: venta.nombre,
      dui: venta.dui,
      mascota: venta.mascota,
      trata: venta.trata,
      medica: venta.medica,
      costo: venta.costo,
      descu: venta.descu,
      costoF: venta.costoF
    });
  }

  updateVenta(venta: Venta){
    this.ventaList.update(venta.dui,{
      nombre: venta.nombre,
      mascota: venta.mascota,
      trata: venta.trata,
      medica: venta.medica,
    });
  }
}
import { Component, OnInit } from '@angular/core';
//Agregando módulos
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {Venta} from '../../models/venta';
import {VentaService} from '../../services/venta.service'
//Service
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit {
  objVenta: Venta = new Venta();
  registro=[];
  persona:any;
  nombre:string;
  dui:string;
  nombremascota:string;
  tratamiento:string;
  medicamento:string;
  costo:number;
  contador:number;
  descuento1:number;
  descuento2:number;
  monto:number;
  montot:number;
  visitas:number;
  descuentot:string;
  trata;
  error:string;
  trata1:string;
  buscar: string;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.trata = ["Control de pulgas","Control de garrapatas","Baño medicado"];
    this.nombre='';
    this.contador=0;
    this.nombremascota='';
    this.costo=this.costo;
    this.visitas=1;
    this.descuento1=0.05;
    this.descuento2=0.1;
    this.monto=0;
    this.montot=0;
    this.descuentot='0%';
    this.trata1='';
    this.tratamiento = "Selecciona";
    this.error='';
  }
  
  //Funciones
  capturar(){
    switch(this.tratamiento){
      case 'Control de pulgas':
      this.trata1='Control de pulgas';
      break;
      case 'Control de garrapatas':
      this.trata1='Control de garrapatas';
      break;
      case 'Baño medicado':
      this.trata1='Baño medicado';
      break;
    }
  }

  calcular(){
    this.visitas=1;
    if(this.contador===0)
    {
    
    }
    else
    {
      this.error="2";
    }
    for(let x=0; x<=this.registro.length; x++){
      if(this.registro[x]['dui']==this.dui){
      this.visitas++;
      }   
      if(this.visitas==1)
      {
        this.descuentot="0%";
        this.montot=this.costo;
      }  
      if(this.visitas==2)
      {
        this.descuentot="5%";
        this.monto = this.costo * this.descuento1;
        this.montot = this.costo - this.monto;
      }
      if(this.visitas>4)
      {
        this.descuentot="10%";
        this.monto = this.costo * this.descuento2;
        this.montot = this.costo - this.monto;
      }      
  } 
    
}
  
  guardar(){
    if(this.contador===0)
    {
      this.montot = this.costo;
    }
    let vacio = new RegExp("^[^]+$");//Validar que no este en blanco
    let letra = new RegExp(/^[\u00F1A-Za-z _]*[\u00F1A-Za-z][\u00F1A-Za-z _]*$/);//Validar que solo hayan letras
    let formato = new RegExp("^[0-9]{8}-[0-9]{1}$");//Validacion de formato DUI 00000000-0
    this.error = "";
                     //this.persona={"nombre":this.nombre,"dui":this.dui,"nombremascota":this.nombremascota,"trata1":this.trata1,"medicamento":this.medicamento,"costo":this.costo,"descuentot":this.descuentot,"montot":this.montot};
                     //this.registro.push(this.persona);
                     this.persona={"nombre":this.nombre,"dui":this.dui,"mascota":this.nombremascota,"trata":this.trata1,"medica":this.medicamento,"costo":this.costo,"descu":this.descuentot,"costoF":this.montot};                       
                       /*this.objVenta.nombre = this.nombre;
                       this.objVenta.dui = this.dui;
                       this.objVenta.mascota = this.nombremascota;
                       this.objVenta.trata = this.trata1;
                       this.objVenta.medica = this.medicamento;
                       this.objVenta.costo = this.costo;
                       this.objVenta.descu = this.descuentot;
                       this.objVenta.costoF = this.montot;
                      this.ventaService.insertVenta(this.persona);
                       this.contador++;*/
  }
}
  
              

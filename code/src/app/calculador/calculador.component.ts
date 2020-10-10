import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculador',
  templateUrl: './calculador.component.html',
  styleUrls: ['./calculador.component.css']
})
export class CalculadorComponent implements OnInit {

  valor:number;
  value1: string;
  selectedIva: any = null;

  ivas: any[] = [
    { name: 'IVA 19%', value: 19 },
    { name: 'IVA 10%', value: 10 },
    { name: 'IVA 5%', value: 5 },
    { name: 'NO', value: 1 }
  ];  

  constructor() { }

  ngOnInit(): void {
  }

  agregarIva(valor: number){
    let iva = 1;
     if(this.selectedIva!=1){
      iva = (this.selectedIva/100)+1;
     }
    return valor*iva;
  }

  quitarIva(valor: number){
    let iva = 1;
     if(this.selectedIva!=1){
      iva = (this.selectedIva/100)+1;
     }
    return valor/iva;
  }

}

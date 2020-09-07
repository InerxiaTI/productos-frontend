import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ProductoService } from '../shared/service/producto.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  selectedIva: any = null;

  ivas: any[] = [
    {name: 'IVA 19%', key: 'A'}, 
    {name: 'IVA 10%', key: 'M'}, 
    {name: 'IVA 5%', key: 'P'}, 
    {name: 'NO', key: 'N'}];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private _location: Location
  ) { }

  ngOnInit(): void {
    this.selectedIva = this.ivas[1];
  }

  goBack() {
    this._location.back();
  }

}

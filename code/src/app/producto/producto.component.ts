import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import {TableModule, Table} from 'primeng/table';
import {CardModule} from 'primeng/card';
import {TabViewModule} from 'primeng/tabview';

import { ProductoService } from '../shared/service/producto.service'
import { ProductoDto } from '../shared/dto/ProductoDto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  loading: boolean;
  productosDto: Array<ProductoDto> = [];
  productoDto: ProductoDto;

  @ViewChild('dt') table: Table;

  columnas = [
    {field: 'foto', header: 'Foto'},
    {field: 'nombre', header: 'Nombre'},
    {field: 'precio_compra', header: 'Precio compra'},
    {field: 'precio_venta', header: 'Precio venta'},
    {field: 'idProveedor_fk', header: 'Proveedor'},
  ];

  constructor(
    private productoService: ProductoService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllProductos();
  }

  getAllProductos() {
    this.loading = true;
    this.productoService.getAllProductos().subscribe(data => {
      if (!data.body) {
        return;
      }
      this.productosDto = data.body;
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
      this.loading = false;
    });
  }

  onActivityChange(event) {
    const value = event.target.value;
    if (value && value.trim().length) {
        const activity = parseInt(value);

        if (!isNaN(activity)) {
            this.table.filter(activity, 'activity', 'gte');
        }
    }
  }



}



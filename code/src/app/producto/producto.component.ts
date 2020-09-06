import { Component, OnInit } from '@angular/core';
import {TableModule} from 'primeng/table';
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

  constructor(private productoService: ProductoService) { }

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
      console.log(this.productosDto);
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
      this.loading = false;
    });
  }

}

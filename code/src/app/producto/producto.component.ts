import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

import { ProductoService } from '../shared/service/producto.service'
import { ProductoDto } from '../shared/dto/ProductoDto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProductoComponent implements OnInit {
  @ViewChild('dt', { static: false }) table: Table;
  loading: boolean = true;
  productosDto: Array<ProductoDto> = [];
  productoDto: ProductoDto;

  displayMostrar: boolean = false;
  productoMostrar: ProductoDto = new ProductoDto();

  public idProductoRuta!: number;

  msgs: Message[] = [];

  columnas = [
    { field: 'nombre', header: 'Nombre' },
    { field: 'precio_compra', header: 'Precio compra' },
    { field: 'precio_venta', header: 'Precio venta' },
    { field: 'nombre_empresa', header: 'Proveedor' },
  ];

  constructor(
    private productoService: ProductoService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {    
    this.getAllProductos();
    this.primengConfig.ripple = true;
  }

  getAllProductos() {
    this.loading = true;
    this.productoService.getAllProductos().subscribe(data => {
      if (!data.body) {
        return;
      }
      this.productosDto = data.body;
      this.productosDto.forEach(p=>{
        p.nombre_empresa = p.proveedor_fk.nombre_empresa;
        p.nombre_vendedor = p.proveedor_fk.nombre_vendedor;
      });

    }, error => {
      console.log('Error'.concat(error));
    }, () => {
      this.loading = false;
    });
  }


  delete(producto: ProductoDto) {
    this.productoService.deleteProducto(producto.id).subscribe(
      data => {
        if (!data.body) {
          this.mostrarToast('info', 'Info', 'Eliminado correctamente');
          return;
        }
      }, error => this.mostrarToast('error', 'Error', 'No fue eliminado'),
      () => {
        this.getAllProductos();
      }
    )
  }

  deleteProducto(producto: ProductoDto) {
    this.confirmationService.confirm({
      message: '¿Seguro que quiere eliminar este producto?',
      header: 'Advertencia',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.delete(producto);
      },
      reject: () => {
        this.mostrarToast('info', 'Info', 'Cancelado');
      }
    });
  }

  editProducto(producto: ProductoDto){
    this.router.navigate(['/form-producto/editar/', producto.id]);   
  }

  mostrarProducto(producto: ProductoDto){
    this.displayMostrar = true;
    this.productoMostrar =producto;
  }

  mostrarToast(severity: any, summary: any, detail: any) {
    this.messageService.add({
      key: 'tc',
      severity: severity,
      summary: summary,
      detail: detail
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



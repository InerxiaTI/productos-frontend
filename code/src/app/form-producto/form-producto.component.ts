import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';


import { ProductoService } from '../shared/service/producto.service';
import { ProveedorService } from '../shared/service/proveedor.service';
import { ProveedorDto } from '../shared/dto/ProveedorDto';
import { ProductoDto } from '../shared/dto/ProductoDto';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css'],
  providers: [MessageService]
})
export class FormProductoComponent implements OnInit {

  selectedIva: any = null;
  productoDto = new ProductoDto();

  proveedoresDto: Array<ProveedorDto> = [];
  proveedorDto: ProveedorDto;
  today = new Date();

  ivas: any[] = [
    { name: 'IVA 19%', value: 19 },
    { name: 'IVA 10%', value: 10 },
    { name: 'IVA 5%', value: 5 },
    { name: 'NO', value: 0 }];

  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    precio_compra: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]),
    precio_venta: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]),
    iva: new FormControl('', Validators.required),
    marca: new FormControl(''),
    fecha_compra: new FormControl('', Validators.required),
    foto: new FormControl(''),
    idProveedor_fk: new FormControl('', Validators.required)
  });

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private router: Router,
    private _location: Location,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {
   }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getAllProveedores();   
  }

  getAllProveedores() {
    this.proveedorService.getAllProveedores().subscribe(data => {
      if (!data.body) {
        return;
      }
      this.proveedoresDto = data.body;
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
    });
  }

  onSubmit() {
    if (this.productoForm.invalid) {
      return;
    }
    this.assignData();
    this.guardar();
  }

  assignData() {
    this.productoDto.nombre = this.productoForm.value.nombre;
    this.productoDto.descripcion = this.productoForm.value.descripcion;
    this.productoDto.precio_compra = this.productoForm.value.precio_compra;
    this.productoDto.precio_venta = this.productoForm.value.precio_venta;
    this.productoDto.iva = this.productoForm.value.iva.value;
    this.productoDto.marca = this.productoForm.value.marca;
    this.productoDto.fecha_compra = this.productoForm.value.fecha_compra;
    this.productoDto.foto = "url de la foto";
    this.productoDto.idProveedor_fk = this.productoForm.value.idProveedor_fk.id; 
  }

  guardar(){
    this.productoService.createProducto(this.productoDto).subscribe(data => {
      if (!data.body) {
        this.mostrarToast('error', 'Error','No fue guardado');
        return;
      }
      this.mostrarToast('success', 'Guardado','Producto guardado correctamente');
      this.productoForm.reset();
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
    });
  }

  mostrarToast(severity: any, summary: any,detail: any){
    this.messageService.add({
      key: 'tc', 
      severity:severity, 
      summary: summary, 
      detail: detail});
  }

  goBack() {
    this._location.back();
  }

}

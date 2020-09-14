import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductoService } from '../shared/service/producto.service';
import { ProveedorService } from '../shared/service/proveedor.service';
import { ProveedorDto } from '../shared/dto/ProveedorDto';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styleUrls: ['./form-producto.component.css']
})
export class FormProductoComponent implements OnInit {

  selectedIva: any = null;
  proveedoresDto: Array<ProveedorDto> = [];
  proveedorDto: ProveedorDto;
  today = new Date();

  ivas: any[] = [
    { name: 'IVA 19%', key: 'A' },
    { name: 'IVA 10%', key: 'M' },
    { name: 'IVA 5%', key: 'P' },
    { name: 'NO', key: 'N' }];

  productoForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    precio_compra: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]),
    precio_venta: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]),
    iva: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(.[0-9]{0,6})?$')]),
    marca: new FormControl(''),
    fecha_compra: new FormControl('', Validators.required),
    foto: new FormControl(''),
    idProveedor_fk: new FormControl('', Validators.required)
  });

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService,
    private router: Router,
    private _location: Location
  ) {
    this.today= new Date();
   }

  ngOnInit(): void {
    this.getAllProveedores();
    console.log(this.today);
    
    
  }

  getAllProveedores() {
    this.proveedorService.getAllProveedores().subscribe(data => {
      if (!data.body) {
        return;
      }
      this.proveedoresDto = data.body;
      console.log(this.proveedoresDto);
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
    });
  }
  guardar(){
    console.log(this.productoForm.value.fecha_compra);
    
  }

  goBack() {
    this._location.back();
  }

}

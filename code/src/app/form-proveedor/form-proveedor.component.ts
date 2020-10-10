import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ProveedorDto } from '../shared/dto/ProveedorDto';
import { ProveedorService } from '../shared/service/proveedor.service';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css'],
  providers: [MessageService]
})
export class FormProveedorComponent implements OnInit {

  proveedorDto = new ProveedorDto();

  public accion!: any;
  public idProveedorRuta!: number;
  labelBoton: string;

  proveedorForm = new FormGroup({
    nombre_empresa: new FormControl('', Validators.required),
    telefono_empresa: new FormControl(''),
    direccion_empresa: new FormControl(''),
    nombre_vendedor: new FormControl(''),
    telefono_vendedor: new FormControl(''),
    observacion: new FormControl('')
  });

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _location: Location,
    private proveedorService: ProveedorService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {
    this.labelBoton="Guardar";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        this.accion = params.accion;
        this.idProveedorRuta = params.id;
        if(this.accion === 'editar'){
          this.labelBoton="Actualizar";
          this.getProveedor(this.idProveedorRuta);
        }
      }
    );
    this.primengConfig.ripple = true;
  }

  getProveedor(id: number){
    this.proveedorService.getProveedorById(id).subscribe(
      data=>{
        if (!data.body) {
          return;
        }
        this.proveedorDto=data.body;
        this.updateForm();
      }
    )
  }

  updateForm() {
    this.proveedorForm.setValue({
      nombre_empresa: this.proveedorDto.nombre_empresa,
      telefono_empresa: this.proveedorDto.telefono_empresa,
      direccion_empresa: this.proveedorDto.direccion_empresa,
      nombre_vendedor: this.proveedorDto.nombre_vendedor,
      telefono_vendedor: this.proveedorDto.telefono_vendedor,
      observacion: this.proveedorDto.observacion
    });
  }

  onSubmit() {
    if (this.proveedorForm.invalid) {
      return;
    }
    if(this.accion === 'editar'){
      this.assignData();
      this.editar();
    }else{
      this.assignData();
      this.guardar();
    }
  }

  assignData() {
    this.proveedorDto.nombre_empresa = this.proveedorForm.value.nombre_empresa;
    this.proveedorDto.telefono_empresa = this.proveedorForm.value.telefono_empresa;
    this.proveedorDto.direccion_empresa = this.proveedorForm.value.direccion_empresa;
    this.proveedorDto.nombre_vendedor = this.proveedorForm.value.nombre_vendedor;
    this.proveedorDto.telefono_vendedor = this.proveedorForm.value.telefono_vendedor;
    this.proveedorDto.observacion = this.proveedorForm.value.observacion;
  }

  guardar(){
    this.proveedorService.createProveedor(this.proveedorDto).subscribe(data => {
      if (!data.body) {
        this.mostrarToast('error', 'Error','No fue guardado');
        return;
      }
      this.mostrarToast('success', 'Guardado','Proveedor guardado correctamente');
      this.proveedorForm.reset();
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
    });
  }

  editar(){
    this.proveedorService.editProveedor(this.proveedorDto).subscribe(data => {
      if (!data.body) {
        this.mostrarToast('error', 'Error','No fue actualizado');
        return;
      }
      this.mostrarToast('success', 'Actualizado','Proveedor actualizado correctamente');
      this.proveedorForm.reset();
      setTimeout( s =>{
        this.router.navigate(['/proveedor/']);  
      },2000);
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

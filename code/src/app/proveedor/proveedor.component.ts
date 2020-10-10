import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';

import { ProveedorService } from '../shared/service/proveedor.service';
import { ProveedorDto } from '../shared/dto/ProveedorDto';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class ProveedorComponent implements OnInit {

  @ViewChild('dt', { static: false }) table: Table;
  loading: boolean = true;
  proveedoresDto: Array<ProveedorDto> = [];
  proveedorDto: ProveedorDto;

  public idProveedorRuta!: number;

  displayMostrar: boolean = false;
  proveedorMostrar: ProveedorDto = new ProveedorDto();

  msgs: Message[] = [];

  columnas = [
    { field: 'nombre_empresa', header: 'Nombre' },
    { field: 'telefono_empresa', header: 'Teléfono' },
  ];

  constructor(
    private proveedorService: ProveedorService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.getAllProveedores();
    this.primengConfig.ripple = true;
  }

  getAllProveedores() {
    this.loading = true;
    this.proveedorService.getAllProveedores().subscribe(data => {
      if (!data.body) {
        return;
      }
      this.proveedoresDto = data.body;
      console.log(this.proveedoresDto);
      
    }, error => {
      console.log('Error'.concat(error));
    }, () => {
      this.loading = false;
    });
  }

  delete(proveedor: ProveedorDto) {
    this.proveedorService.deleteProveedor(proveedor.id).subscribe(
      data => {
        if (!data.body) {
          this.mostrarToast('info', 'Info', 'Eliminado correctamente');
          return;
        }
      }, error => this.mostrarToast('error', 'Error', 'No fue eliminado'),
      () => {
        this.getAllProveedores();
      }
    )
  }

  deleteProveedor(proveedor: ProveedorDto) {
    this.confirmationService.confirm({
      message: '¿Seguro que quiere eliminar este proveedor?',
      header: 'Advertencia',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Eliminar',
      rejectLabel: 'Cancelar',
      accept: () => {
        this.delete(proveedor);
      },
      reject: () => {
        this.mostrarToast('info', 'Info', 'Cancelado');
      }
    });
  }

  editProveedor(proveedor: ProveedorDto){
    this.router.navigate(['/form-proveedor/editar/', proveedor.id]);   
  }

  mostrarProveedor(proveedor: ProveedorDto){
    this.displayMostrar = true;
    this.proveedorMostrar =proveedor;
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

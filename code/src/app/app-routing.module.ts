import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { CalculadorComponent } from './calculador/calculador.component';
import { FormProveedorComponent } from './form-proveedor/form-proveedor.component';

const routes: Routes = [
  {path: '', redirectTo: '/producto', pathMatch: 'full'},
  {path: 'producto', component: ProductoComponent},
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'calculador', component: CalculadorComponent},
  {path: 'form-producto/:accion/:id', component: FormProductoComponent},
  {path: 'form-proveedor/:accion/:id', component: FormProveedorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

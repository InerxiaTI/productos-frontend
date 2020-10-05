import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductoComponent } from './producto/producto.component';
import { ProveedorComponent } from './proveedor/proveedor.component';
import { FormProductoComponent } from './form-producto/form-producto.component';

const routes: Routes = [
  {path: '', redirectTo: '/producto', pathMatch: 'full'},
  {path: 'producto', component: ProductoComponent},
  {path: 'proveedor', component: ProveedorComponent},
  {path: 'form-producto/:accion/:id', component: FormProductoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

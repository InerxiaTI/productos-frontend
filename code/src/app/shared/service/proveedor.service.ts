import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ProveedorDto } from '../dto/ProveedorDto';
import { Observable } from 'rxjs';

const urlBase = environment.SERVER_API_URL;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private httpClient: HttpClient) { }

  getProductoById(id: number): any {
    return this.httpClient.get<ProveedorDto>(`${urlBase}/proveedor/get-por-id/${id}`, httpOptions);
  }

  getAllProductos(): Observable<any> {
    return this.httpClient.get<ProveedorDto[]>(`${urlBase}/proveedor/get-todos`, httpOptions);
  }

  createProducto(proveedorDto: ProveedorDto): Observable<any> {
    return this.httpClient.post(urlBase.concat('/proveedor'), proveedorDto, httpOptions);
  }

  editProducto(proveedorDto: ProveedorDto): Observable<any> {
    return this.httpClient.put(urlBase.concat('/proveedor'), proveedorDto, httpOptions);
  }

  deleteProducto(id: number): Observable<any> {
    return this.httpClient.delete(`${urlBase}/proveedor/${id}`, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ProductoDto } from '../dto/ProductoDto';
import { Observable } from 'rxjs';

const urlBase = environment.SERVER_API_URL;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private httpClient: HttpClient) { }

  getProductoById(id: number): any {
    return this.httpClient.get<ProductoDto>(`${urlBase}/producto/get-por-id/${id}`, httpOptions);
  }

  getAllProductos(): Observable<any> {
    return this.httpClient.get<ProductoDto[]>(`${urlBase}/producto/get-todos`, httpOptions);
  }

  createProducto(productoDto: ProductoDto): Observable<any> {
    return this.httpClient.post(urlBase.concat('/producto'), productoDto, httpOptions);
  }

  editProducto(productoDto: ProductoDto): Observable<any> {
    return this.httpClient.put(urlBase.concat('/producto'), productoDto, httpOptions);
  }

  deleteProducto(id: number): Observable<any> {
    return this.httpClient.delete(`${urlBase}/producto/${id}`, httpOptions);
  }
}

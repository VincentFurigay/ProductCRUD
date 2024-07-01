import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://localhost:7057/api/Product'

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}`)
  }

  addProduct(product: Product): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, product)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/' + id)
  }

  updateProduct(id: number, product: Product): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, product)
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }


}

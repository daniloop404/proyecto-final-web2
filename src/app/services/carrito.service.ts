import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(private http: HttpClient) { }

  private API_CELULARES = "https://app-web-2-d5607-default-rtdb.firebaseio.com/carrito"

  //MÉTODO GET
  //METODO POST
  postCarrito(nuevoCarrito: any): Observable<any>{
    const url = `${this.API_CELULARES}.${"json"}`;
    return this.http.post(url, nuevoCarrito)
  }

}

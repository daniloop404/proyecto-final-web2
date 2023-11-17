import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  constructor(private http: HttpClient) {}

  private API_CARRITO =
    'https://app-web-2-d5607-default-rtdb.firebaseio.com/carrito';

  //MÉTODO GET
  getCelulares(): Observable<any> {
    const url = `${this.API_CARRITO}.${'json'}`;
    return this.http.get(url);
  }

  //METODO POST
  postCarrito(nuevoCarrito: any): Observable<any> {
    const url = `${this.API_CARRITO}.${'json'}`;
    return this.http.post(url, nuevoCarrito);
  }
  //MÉTODO DELETE
  deleteCarrito(key: string): Observable<any> {
    const url = `${this.API_CARRITO}/${key}.json`;
    return this.http.delete(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private API_CARRITO = "https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios";

  constructor(private http: HttpClient) { }

  getCarrito(userKey: string): Observable<any> {
    const url = `${this.API_CARRITO}/${userKey}.json`;
    return this.http.get(url);
  }

  agregarAlCarrito(celular: any, userKey: string, celularKey: string, unidades: number): Observable<any> {
    return this.getCarrito(userKey).pipe(
      switchMap((existingCarrito: any) => {
        let updatedCarrito = existingCarrito && existingCarrito.carrito ? existingCarrito.carrito : {};
  
        if (updatedCarrito[celularKey]) {
          // Celular already exists in the cart, update the quantity
          updatedCarrito[celularKey].unidades += unidades;
        } else {
          // Celular doesn't exist in the cart, add it with the specified quantity
          updatedCarrito[celularKey] = { unidades: unidades, info: celular };
        }
  
        const url = `${this.API_CARRITO}/${userKey}.json`;
        return this.http.patch(url, { carrito: updatedCarrito });
      })
    );
  }
}
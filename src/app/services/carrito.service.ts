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
          // Set the new quantity instead of adding to the existing quantity
          updatedCarrito[celularKey].unidades = unidades;
        } else {
          // Celular doesn't exist in the cart, add it with the specified quantity
          updatedCarrito[celularKey] = { unidades: unidades, info: celular };
        }
  
        const url = `${this.API_CARRITO}/${userKey}.json`;
        return this.http.patch(url, { carrito: updatedCarrito });
      })
    );
  }

  eliminarDelCarrito(userKey: string, celularKey: string): Observable<any> {
    return this.getCarrito(userKey).pipe(
      switchMap((existingCarrito: any) => {
        let updatedCarrito = existingCarrito && existingCarrito.carrito ? existingCarrito.carrito : {};
  
        if (updatedCarrito[celularKey]) {
          // Remove the item from the cart
          delete updatedCarrito[celularKey];
  
          // Update the cart in the database
          const url = `${this.API_CARRITO}/${userKey}.json`;
          return this.http.patch(url, { carrito: updatedCarrito });
        } else {
          // Item not found in the cart
          return new Observable(); // Return an empty observable or handle the scenario as needed
        }
      })
    );
  }
}
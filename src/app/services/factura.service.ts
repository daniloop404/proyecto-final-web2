import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private API_USUARIOS = "https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios";

  constructor(private http: HttpClient) { }

  agregarFactura(userKey: string, facturaData: any): Observable<any> {
    const url = `${this.API_USUARIOS}/${userKey}/facturas.json`;
    return this.http.post(url, facturaData);
  }

  getFacturas(userKey: string): Observable<any> {
    const url = `${this.API_USUARIOS}/${userKey}/facturas.json`;
    return this.http.get(url);
  }
}
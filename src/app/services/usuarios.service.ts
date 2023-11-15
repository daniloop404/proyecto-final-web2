import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  private API_USUARIOS = "https://app-web-2-d5607-default-rtdb.firebaseio.com/usuarios"

  getUsuarios() : Observable <any>{
    const url = `${this.API_USUARIOS}.${"json"}`;
    return this.http.get(url)
  }
  postUsuario(nuevoUsuario: any): Observable<any> {
    const url = `${this.API_USUARIOS}.json`;
    return this.http.post(url, nuevoUsuario);
  }
}

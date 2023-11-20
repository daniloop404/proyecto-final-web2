import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


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
  getUsuarioPorId(key: string): Observable<any> {
    const url = `${this.API_USUARIOS}/${key}.json`;
    return this.http.get(url);
  }
  putUsuario(key: string, usuario: any): Observable<any> {
    const url = `${this.API_USUARIOS}/${key}.json`;
    return this.http.put(url, usuario);
  }
  public checkUsernameExists(username: string): Observable<boolean> {
    const url = `${this.API_USUARIOS}.json?orderBy="nombreUsuario"&equalTo="${username}"`;
    return this.http.get<any>(url).pipe(
      map(response => response && Object.values(response).length > 0)
    );
  }

  public checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.API_USUARIOS}.json?orderBy="correo"&equalTo="${email}"`;
    return this.http.get<any>(url).pipe(
      map(response => response && Object.values(response).length > 0)
    );
  }
}

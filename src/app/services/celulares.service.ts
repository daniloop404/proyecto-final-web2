import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CelularesService {

  constructor(private http: HttpClient) { }

  private API_CELULARES = "https://app-web-2-d5607-default-rtdb.firebaseio.com/celulares"

  //METODO GET
  getCelulares() : Observable <any>{
    const url = `${this.API_CELULARES}.${"json"}`;
    return this.http.get(url)
  }
  //METODO PARA OBTENER UNA COLECCION POR ID
  getCelularPorId(key: string): Observable<any> {
    const url = `${this.API_CELULARES}/${key}.json`;
    return this.http.get(url);
  }
  //METODO POST
  postCelular(nuevoCelular: any): Observable<any> {
    const url = `${this.API_CELULARES}.json`;
    return this.http.post(url, nuevoCelular);
  }
  //METODO UPDATE
  updateCelular(key: string, updatedCelular: any): Observable<any> {
    const url = `${this.API_CELULARES}/${key}.json`;
    return this.http.put(url, updatedCelular);
  }
  deleteCelular(key: string): Observable<any> {
    const url = `${this.API_CELULARES}/${key}.json`;
    return this.http.delete(url);
  }



}
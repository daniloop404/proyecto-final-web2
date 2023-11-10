import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class CelularesService {

  constructor(private http: HttpClient) { }

  private API_CELULARES = "http://localhost:3000/modelos_celulares"

  //METODO GET
  getCelulares() : Observable <any>{
    return this.http.get(this.API_CELULARES)
  }



}
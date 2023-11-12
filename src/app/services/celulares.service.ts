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
  getCelularPorId(id: number): Observable<any> {
    const url = `${this.API_CELULARES}/${id-1}.json`;
    return this.http.get(url);
  }


}
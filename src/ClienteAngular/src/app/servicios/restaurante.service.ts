import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Restaurante } from '../modelos/restaurante';

@Injectable({
  providedIn: 'root'
})
export class RestauranteService {

  url:String = 'http://localhost:8080/UzhcaFajardo-Jonnathan-Examen/rest/restaurantes'

  constructor(private http:HttpClient) {}

  registrar(restaurante: Restaurante): Observable<any> {
    return this.http.post<Restaurante>(`${this.url}/registrar`, restaurante);
  }

  buscar(descripcion: string): Observable<any> {
    return this.http.get<Restaurante>(`${this.url}/buscar?descripcion=${descripcion}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../modelos/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  url:String = 'http://localhost:8080:/UzhcaFajardo-Jonnathan-Examen/rest/reservas'

  constructor(private http:HttpClient) {}

  registrar(reserva: Reserva): Observable<any> {
    return this.http.post<Reserva>(`${this.url}/registrar`, reserva);
  }

  listar(filtro: string): Observable<any> {
    return this.http.get<Reserva>(`${this.url}/listar?filtro=${filtro}`);
  }
}

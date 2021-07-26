import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../modelos/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url:String = 'http://localhost:8080:/UzhcaFajardo-Jonnathan-Examen/rest/clientes'

  constructor(private http:HttpClient) {}

  registrar(cliente: Cliente): Observable<any> {
    return this.http.post<Cliente>(`${this.url}/registrar`, cliente);
  }

  buscar(cedula: string): Observable<any> {
    return this.http.get<Cliente>(`${this.url}/buscar?cedula=${cedula}`);
  }
}
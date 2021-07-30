import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/modelos/reserva';
import { ReservaService } from 'src/app/servicios/reserva.service';

@Component({
  selector: 'app-listar-reservas',
  templateUrl: './listar-reservas.component.html',
  styleUrls: ['./listar-reservas.component.css']
})
export class ListarReservasComponent implements OnInit {

  mensaje: string;
  filtro: string;
  fecha: string;
  reservas: Reserva[];

  constructor(private servicioReserva:ReservaService) {}

  ngOnInit(): void {
    this.reservas = [];
  }

  listarReservas(): void {
    this.mensaje = '';
    if (this.filtro) {
      this.servicioReserva.listar(this.filtro).subscribe(
        listado => {
          this.reservas = listado;
          if (this.fecha == '') {
            alert('Seleccione la fecha a buscar.')
          } else {
            this.reservas = this.reservas.filter(
              reserva => reserva.fecha == this.fecha
            )
          }
          if (this.reservas.length == 0) {
            this.mensaje = 'No se han encontrado reservas con el filtro aplicado.'
          } 
        }
      );
    } else {
      this.mensaje = 'Debe ingresar una cédula de identidad o nombre de restaurante';
    }
  }
}

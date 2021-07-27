import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { Reserva } from 'src/app/modelos/reserva';
import { Restaurante } from 'src/app/modelos/restaurante';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { ReservaService } from 'src/app/servicios/reserva.service';
import { RestauranteService } from 'src/app/servicios/restaurante.service';

@Component({
  selector: 'app-registrar-reserva',
  templateUrl: './registrar-reserva.component.html',
  styleUrls: ['./registrar-reserva.component.css']
})
export class RegistrarReservaComponent implements OnInit {

  mensaje: string;
  horasDisponibles = [
    '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', 
    '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
  ];
  minutosDisponibles = ['00', '15', '30', '45'];

  cedulaCliente: string;
  nombreCliente: string;

  descripcionRestaurante: string;
  aforoMaximo: number;

  fecha: string;
  hora: string;
  minutos: string;
  totalPersonas: number;

  cliente: Cliente;
  restaurante: Restaurante;
  reserva: Reserva;

  constructor(
    private servicioCliente: ClienteService,
    private servicioRestaurante: RestauranteService,
    private servicioReserva: ReservaService
  ) {}

  ngOnInit(): void {
    this.mensaje = '';
    this.reserva = new Reserva();
  }

  esNumero(valor: string): boolean {
    let expresionRegular = new RegExp("[0-9]+");
    return expresionRegular.test(valor);
  }

  esCedulaValida(cedula: string): boolean {
    if (cedula.length == 10) {
      const multiplicadores = [2,1,2,1,2,1,2,1,2];
      let sumatoria = 0;
      let multiplicacion;
      let digitoVerificador;
      for (let i = 0; i < cedula.length - 1; i++) {
        multiplicacion = (multiplicadores[i] * parseInt(cedula[i]));
        multiplicacion > 9? sumatoria += (multiplicacion - 9): sumatoria += multiplicacion;
      }
      const decenaSuperior = (parseInt(`${sumatoria}`[0]) + 1) * 10;
      digitoVerificador = decenaSuperior - sumatoria;
      if (digitoVerificador == 10) {
        digitoVerificador = 0;
      }
      return digitoVerificador == parseInt(cedula[9]);
    } else {
      return false;
    }
  }

  establecerDatosReserva(): void {
    this.reserva.fecha = `${this.fecha}T${this.hora}:${this.minutos}:00`;
    this.reserva.totalPersonas = this.totalPersonas;
    this.reserva.cliente = this.cliente;
    this.reserva.restaurante = this.restaurante;
  }

  buscarCliente(): void {
    this.mensaje = '';
    if (this.esCedulaValida(this.cedulaCliente)) {
      this.servicioCliente.buscar(this.cedulaCliente).subscribe(
        cliente => {
          this.cliente = cliente;
          this.nombreCliente = `${this.cliente.nombre} ${this.cliente.apellido}`;
        },
        error => this.mensaje = 'Este cliente no existe.'
      );
    } else {
      this.mensaje = 'La cédula no es valida.'
    }
  }

  buscarRestaurante(): void {
    this.mensaje = '';
    this.servicioRestaurante.buscar(this.descripcionRestaurante).subscribe(
      restaurante => {
        this.restaurante = restaurante;
        this.aforoMaximo = this.restaurante.aforoMaximo;
      },
      error => this.mensaje = 'Este restaurante no existe.'
    );
  }

  registrar(): void {
    this.mensaje = '';
    this.establecerDatosReserva();
    if (this.fecha && this.hora && this.minutos && this.totalPersonas) {
      this.servicioReserva.verificarAforo(this.reserva).subscribe(
        casoExitoso => {
          this.servicioReserva.registrar(this.reserva).subscribe(
            casoExitoso => {
              this.reserva = new Reserva();
              this.cliente = new Cliente();
              this.restaurante = new Restaurante();
              this.cedulaCliente = '';
              this.nombreCliente = '';
              this.descripcionRestaurante = '';
              this.aforoMaximo = 0;
              this.fecha = '';
              this.hora = '';
              this.minutos = '';
              this.totalPersonas = 1;
              this.mensaje = 'Reserva registrada correctamente.';
            },
            casoFallido => {
              console.log(casoFallido);
              this.mensaje = 'No se ha podido registrar la reserva.';
            }
          );
        },
        casoFallido => this.mensaje = 'No existe aforo disponible para la fecha y hora seleccionada.'
      );
    } else {
      this.mensaje = 'Todos los campos deben ser completados.'
    }
  }
}

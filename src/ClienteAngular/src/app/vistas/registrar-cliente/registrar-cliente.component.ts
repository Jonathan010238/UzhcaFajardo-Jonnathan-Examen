import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/modelos/cliente';
import { ClienteService } from 'src/app/servicios/cliente.service';

@Component({
  selector: 'app-registrar-cliente',
  templateUrl: './registrar-cliente.component.html',
  styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {

  mensaje: string;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  direccion: string;
  telefono: string;

  cliente: Cliente;

  constructor(private servicioCliente: ClienteService) {}

  ngOnInit(): void {
    this.mensaje = '';
    this.cliente = new Cliente();
  }

  esNumero(valor: string): boolean {
    let expresionRegular = new RegExp("[0-9]+");
    return expresionRegular.test(valor);
  }

  esLetra(valor: string): boolean {
    let expresionRegular = new RegExp("[a-zA-Z]");
    return expresionRegular.test(valor);
  }

  esCorreoElectronico(valor: string): boolean {
    let expresionRegular = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/;
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

  establecerDatosCliente(): void {
    this.cliente.nombre = this.nombre;
    this.cliente.apellido = this.apellido;
    this.cliente.cedula = this.cedula;
    this.cliente.email = this.email;
    this.cliente.direccion = this.direccion;
    this.cliente.telefono = this.telefono;
  }

  registrar(): void {
    this.mensaje = '';
    if (this.nombre && this.apellido && this.cedula &&
        this.email && this.direccion && this.telefono) {
      if (!this.esLetra(this.nombre)) {
        this.mensaje += "El nombre solo debe contener letras.\n"
      }
      if (!this.esLetra(this.apellido)) {
        this.mensaje += "El apellido solo debe contener letras.\n"
      }
      if (!this.esNumero(this.cedula)) { 
        this.mensaje += 'La cedula solo debe contener números.\n'
      } else {
        if (!this.esCedulaValida(this.cedula)) {
          this.mensaje += 'La cédula no es válida.\n';
        }
      }
      if (!this.esCorreoElectronico(this.email)) {
        this.mensaje += "El e-mail esta mal escrito.\n"
      }
      if (!this.esNumero(this.telefono)) {
        this.mensaje += 'El telefono solo debe contener números.\n'
      }
      if (this.mensaje === '') {
        this.servicioCliente.buscar(this.cedula).subscribe(
          casoExitoso => this.mensaje = 'Este cliente ya se encuentra registrado.',
          casoFallido => {
            this.establecerDatosCliente();
            this.servicioCliente.registrar(this.cliente).subscribe(
              casoExitoso =>  {
                this.cliente = new Cliente();
                this.mensaje = 'Cliente registrado correctamente.';
              },
              casoFallido => {
                console.log(casoFallido)
                this.mensaje = 'ERROR: No se ha podido registrar el cliente.'
              }
            );
          }
        );
      }
    } else {
      this.mensaje = 'Todos los campos deben ser completados.'
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Restaurante } from 'src/app/modelos/restaurante';
import { RestauranteService } from 'src/app/servicios/restaurante.service';

@Component({
  selector: 'app-registrar-restaurante',
  templateUrl: './registrar-restaurante.component.html',
  styleUrls: ['./registrar-restaurante.component.css']
})
export class RegistrarRestauranteComponent implements OnInit {

  mensaje: string;
  descripcion: string;
  direccion: string;
  telefono: string;
  aforoMaximo: number;

  restaurante: Restaurante;

  constructor(private servicioRestaurate: RestauranteService) {}

  ngOnInit(): void {
    this.mensaje = '';
    this.aforoMaximo = 0;
    this.restaurante = new Restaurante();
  }

  esNumero(valor: string): boolean {
    let expresionRegular = new RegExp("[0-9]+");
    return expresionRegular.test(valor);
  }

  establecerDatosRestaurante(): void {
    this.restaurante.descripcion = this.descripcion;
    this.restaurante.direccion = this.direccion;
    this.restaurante.telefono = this.telefono;
    this.restaurante.aforoMaximo = this.aforoMaximo;
  }

  registrar(): void {
    this.mensaje = '';
    if (this.descripcion && this.direccion && this.telefono && this.aforoMaximo) {
      if (!this.esNumero(this.telefono)) {
        this.mensaje += 'El telefono solo debe contener números.\n'
      }
      if (this.mensaje === '') {
        this.servicioRestaurate.buscar(this.descripcion).subscribe(
          casoExitoso => this.mensaje = 'Este restaurante ya se encuentra registrado.',
          casoFallido => {
            this.establecerDatosRestaurante();
            this.servicioRestaurate.registrar(this.restaurante).subscribe(
              casoExitoso => {
                this.restaurante = new Restaurante();
                this.mensaje = 'Cliente registrado correctamente.';
              },
              casoFallido => {
                console.log(casoFallido)
                this.mensaje = 'ERROR: No se ha podido registrar el restaurante.'
              }
            );
          }
        );
      }
    } else {
      this.mensaje = 'Todos los campos deben ser completados.';
    }
  }
}

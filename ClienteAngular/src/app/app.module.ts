import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrarClienteComponent } from './vistas/registrar-cliente/registrar-cliente.component';
import { RegistrarRestauranteComponent } from './vistas/registrar-restaurante/registrar-restaurante.component';
import { RegistrarReservaComponent } from './vistas/registrar-reserva/registrar-reserva.component';
import { ListarReservasComponent } from './vistas/listar-reservas/listar-reservas.component';
import { ClienteService } from './servicios/cliente.service';
import { RestauranteService } from './servicios/restaurante.service';
import { ReservaService } from './servicios/reserva.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RegistrarClienteComponent,
    RegistrarRestauranteComponent,
    RegistrarReservaComponent,
    ListarReservasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    ClienteService,
    RestauranteService,
    ReservaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

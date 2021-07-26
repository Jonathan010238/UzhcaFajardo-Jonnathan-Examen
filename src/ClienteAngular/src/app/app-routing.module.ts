import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarReservasComponent } from './vistas/listar-reservas/listar-reservas.component';
import { RegistrarClienteComponent } from './vistas/registrar-cliente/registrar-cliente.component';
import { RegistrarReservaComponent } from './vistas/registrar-reserva/registrar-reserva.component';
import { RegistrarRestauranteComponent } from './vistas/registrar-restaurante/registrar-restaurante.component';

const routes: Routes = [
  {path: '', redirectTo: 'registrar-cliente', pathMatch: 'full'},
  {path: 'registrar-cliente', component: RegistrarClienteComponent},
  {path: 'registrar-restaurante', component: RegistrarRestauranteComponent},
  {path: 'registrar-reserva', component: RegistrarReservaComponent},
  {path: 'listar-reservas', component: ListarReservasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

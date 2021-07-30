import { Cliente } from "./cliente";
import { Restaurante } from "./restaurante";

export class Reserva {

    id: number;
    fecha: string;
    totalPersonas: number;
    restaurante: Restaurante;
    cliente: Cliente;
}
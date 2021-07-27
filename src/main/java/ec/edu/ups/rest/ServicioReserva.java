package ec.edu.ups.rest;

import java.util.List;

import javax.ejb.EJB;
import javax.json.bind.Jsonb;
import javax.json.bind.JsonbBuilder;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import ec.edu.ups.jpa.ReservaDAO;
import ec.edu.ups.modelos.Reserva;

@Path(value = "/reservas")
public class ServicioReserva {

	@EJB
	private ReservaDAO reservaDAO;
	
	@POST
	@Path(value = "/registrar")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.TEXT_PLAIN)
	public Response registrar(String reservaJSON) {
		Jsonb constructor = JsonbBuilder.create();
		Reserva reserva = constructor.fromJson(reservaJSON, Reserva.class);
		try {
			reservaDAO.agregar(reserva);
			return Response.status(200).entity(true).build();
		} catch (Exception e) {
			return Response.status(404).entity(false).build();
		}
	}
	
	@POST
	@Path(value = "/verificar-aforo")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.TEXT_PLAIN)
	public Response verificarAforo(String reservaJSON) {
		Jsonb constructor = JsonbBuilder.create();
		Reserva reserva = constructor.fromJson(reservaJSON, Reserva.class);
		if (reservaDAO.hayAforoDisponible(reserva)) {
			return Response.status(200).entity(true).build();
		} else {
			return Response.status(404).entity(false).build();
		}
	}
	
	@GET
	@Path(value = "/listar")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response listar(@QueryParam(value = "filtro") String filtro) {
		Jsonb constructor = JsonbBuilder.create();
		List<Reserva> reservas = reservaDAO.buscarPorCliente(filtro);
		if (reservas.size() == 0) {
			reservas = reservaDAO.buscarPorRestaurante(filtro);
		}
		return Response.status(200).entity(constructor.toJson(reservas)).build();
	}
}

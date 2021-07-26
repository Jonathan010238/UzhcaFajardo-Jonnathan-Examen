package ec.edu.ups.rest;

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

import ec.edu.ups.jpa.RestauranteDAO;
import ec.edu.ups.modelos.Restaurante;

@Path(value = "/restaurantes")
public class ServicioRestaurante {

	@EJB
	private RestauranteDAO restauranteDAO;
	
	@POST
	@Path(value = "/registrar")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.TEXT_PLAIN)
	public Response registrar(String restauranteJSON) {
		Jsonb constructor = JsonbBuilder.create();
		Restaurante restaurante = constructor.fromJson(restauranteJSON, Restaurante.class);
		try {
			restauranteDAO.agregar(restaurante);
			return Response.status(200).build();
		} catch (Exception e) {
			return Response.status(404).build();
		}
	}
	
	@GET
	@Path(value = "/buscar")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response buscar(@QueryParam(value = "descripcion") String descripcion) {
		Jsonb constructor = JsonbBuilder.create();
		Restaurante restaurante = restauranteDAO.buscarPorDescripcion(descripcion);
		if (restaurante != null) {
			return Response.status(200).entity(constructor.toJson(restaurante)).build();
		} else {
			return Response.status(404).build();
		}
	}
}

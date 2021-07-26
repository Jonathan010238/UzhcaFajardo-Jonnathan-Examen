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

import ec.edu.ups.jpa.ClienteDAO;
import ec.edu.ups.modelos.Cliente;

@Path(value = "/clientes")
public class ServicioCliente {

	@EJB
	private ClienteDAO clienteDAO;
	
	@POST
	@Path(value = "/registrar")
	@Consumes(value = MediaType.APPLICATION_JSON)
	@Produces(value = MediaType.TEXT_PLAIN)
	public Response registrar(String clienteJSON) {
		Jsonb constructor = JsonbBuilder.create();
		Cliente cliente = constructor.fromJson(clienteJSON, Cliente.class);
		try {
			clienteDAO.agregar(cliente);
			return Response.status(200).build();
		} catch (Exception e) {
			return Response.status(404).build();
		}
	}
	
	@GET
	@Path(value = "/buscar")
	@Produces(value = MediaType.APPLICATION_JSON)
	public Response buscar(@QueryParam(value = "cedula") String cedula) {
		Jsonb constructor = JsonbBuilder.create();
		Cliente cliente = clienteDAO.buscarPorCedula(cedula);
		if (cliente != null) {
			return Response.status(200).entity(constructor.toJson(cliente)).build();
		} else {
			return Response.status(404).build();
		}
	}
}

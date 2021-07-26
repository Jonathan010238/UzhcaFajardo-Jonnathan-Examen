package ec.edu.ups.jpa;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import ec.edu.ups.modelos.Reserva;

@Stateless
public class ReservaDAO extends DAO<Reserva, Integer> {

	@PersistenceContext(unitName = "UzhcaFajardo-Jonnathan-Examen")
	private EntityManager gestor;

	public ReservaDAO() {
		super(Reserva.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return gestor;
	}
	
	public boolean hayAforoDisponible(Reserva reserva) {
		List<Reserva> reservas = listar();
		reservas = reservas.stream()
			.filter(aux -> aux.getRestaurante().getId() == reserva.getRestaurante().getId())
			.filter(aux -> aux.getFecha().getYear() == reserva.getFecha().getYear())
			.filter(aux -> aux.getFecha().getMonth() == reserva.getFecha().getMonth())
			.filter(aux -> aux.getFecha().getDayOfMonth() == reserva.getFecha().getDayOfMonth())
			.filter(aux -> aux.getFecha().getHour() == reserva.getFecha().getHour())
			.filter(aux -> aux.getFecha().getMinute() == reserva.getFecha().getMinute())
			.collect(Collectors.toList());
		int aforoDisponible = reserva.getRestaurante().getAforoMaximo();
		for (Reserva aux : reservas) {
			aforoDisponible -= aux.getTotalPersonas();
		}
		return aforoDisponible >= reserva.getTotalPersonas();
	}
	
	public List<Reserva> buscarPorCliente(String cedula) {
		String jpql = "SELECT r FROM Reserva r JOIN r.cliente c WHERE c.cedula = '" + cedula + "'";
		try {
			return gestor.createQuery(jpql, Reserva.class).getResultList();
		} catch (NoResultException e) {
			return new ArrayList<Reserva>();
		}
	}
	
	public List<Reserva> buscarPorRestaurante(String descripcion) {
		String jpql = "SELECT r FROM Reserva r JOIN r.restaurante rs WHERE rs.descripcion = '" + descripcion + "'";
		try {
			return gestor.createQuery(jpql, Reserva.class).getResultList();
		} catch (NoResultException e) {
			return new ArrayList<Reserva>();
		}
	}
}

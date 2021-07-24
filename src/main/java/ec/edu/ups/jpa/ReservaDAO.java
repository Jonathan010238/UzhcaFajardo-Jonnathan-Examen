package ec.edu.ups.jpa;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
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
}

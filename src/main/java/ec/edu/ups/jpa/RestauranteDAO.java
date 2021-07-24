package ec.edu.ups.jpa;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import ec.edu.ups.modelos.Restaurante;

@Stateless
public class RestauranteDAO extends DAO<Restaurante, Integer> {

	@PersistenceContext(unitName = "UzhcaFajardo-Jonnathan-Examen")
	private EntityManager gestor;
	
	public RestauranteDAO() {
		super(Restaurante.class);
	}
	
	@Override
	protected EntityManager getEntityManager() {
		return gestor;
	}
}

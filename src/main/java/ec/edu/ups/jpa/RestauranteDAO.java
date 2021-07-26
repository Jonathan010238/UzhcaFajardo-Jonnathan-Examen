package ec.edu.ups.jpa;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
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
	
	public Restaurante buscarPorDescripcion(String descripcion) {
		String jpql = "SELECT r FROM Restaurante r WHERE r.descripcion = '" + descripcion + "'";
		try {
			return gestor.createQuery(jpql, Restaurante.class).getSingleResult();
		} catch (NoResultException e) {
			return null;
		}
	}
}

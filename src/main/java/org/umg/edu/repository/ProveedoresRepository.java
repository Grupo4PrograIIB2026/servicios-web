package org.umg.edu.repository;

import static io.quarkus.hibernate.orm.panache.PanacheEntityBase.getEntityManager;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.Query;
import java.util.List;
import org.umg.edu.model.Proveedores;

/**
 *
 * @author willi
 */

/*@RequestScoped
public class ProveedoresRepository implements PanacheRepository<Proveedores>{
    
    @Transactional
    public void create(Proveedores nuevoProveedor){
        this.persist(nuevoProveedor);
    }
    
    public List<Proveedores> findProveedores(){
        try {
            Query q =getEntityManager().createQuery("SELECT P FROM Proveedores P order by P.idProveedor asc");
            return q.getResultList();
        } catch (Exception e) {
            System.out.println("e-> "+e);
            return null;
        }
    }
}*/

@ApplicationScoped
public class ProveedoresRepository implements PanacheRepositoryBase<Proveedores, Integer> {

    public List<Proveedores> findProveedores() {
        Query consulta = getEntityManager().createQuery(
                "SELECT P FROM Proveedores P ORDER BY P.idProveedor ASC"
        );

        return consulta.getResultList();
    }
}

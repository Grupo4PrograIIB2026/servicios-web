
package org.umg.edu.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.util.List;
import org.umg.edu.model.Proveedores;

/**
 *
 * @author mende
 */

@RequestScoped
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
}

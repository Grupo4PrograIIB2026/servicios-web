
package org.umg.edu.repository;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.context.RequestScoped;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import java.util.List;
import org.umg.edu.model.ProductosAgricolas;
import org.umg.edu.model.Proveedores;

/**
 *
 * @author willi
 */

/*@RequestScoped
public class ProductosAgricolasRepository implements PanacheRepository<ProductosAgricolas>{
    
    @Transactional
    public void create(ProductosAgricolas nuevoProductosAgricolas){
        this.persist(nuevoProductosAgricolas);
    }
    
    public List<ProductosAgricolas> findProductosAgricolas(){
        try {
            Query q =getEntityManager().createQuery("SELECT P FROM ProductosAgricolas P order by P.idProducto asc");
            return q.getResultList();
        } catch (Exception e) {
            System.out.println("e-> "+e);
            return null;
        }
    }
}*/

@ApplicationScoped
public class ProductosAgricolasRepository implements PanacheRepositoryBase<ProductosAgricolas, Integer> {

    public List<ProductosAgricolas> findProductosAgricolas() {
        Query consulta = getEntityManager().createQuery(
                "SELECT P FROM ProductosAgricolas P ORDER BY P.idProducto ASC"
        );

        return consulta.getResultList();
    }
}

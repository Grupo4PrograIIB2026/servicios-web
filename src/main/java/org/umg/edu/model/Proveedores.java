
package org.umg.edu.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.io.Serializable;

/**
 *
 * @author willi
 */

@Entity
@Table(name="Proveedores")
public class Proveedores implements Serializable{
    
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    @Column(name="idProveedor")
    private Integer idProveedor;
    
    @Column(name="nombre")
    private String nombre;
    
    @Column(name="direccion")
    private String direccion;
    
    @Column(name="telefono")
    private String telefono;
    
    @Column(name="correo")
    private String correo;

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    @Override
    public String toString() {
        return "Proveedores { " + "idProveedor = " + idProveedor + ", nombre = " + nombre + ", direccion = " + direccion + ", telefono = " + telefono + ", correo = " + correo + '}';
    }
}
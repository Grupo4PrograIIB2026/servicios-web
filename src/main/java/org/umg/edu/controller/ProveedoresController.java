package org.umg.edu.controller;

import jakarta.transaction.Transactional;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.JSONParser;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.json.simple.JSONArray;
import org.umg.edu.model.Proveedores;
import org.umg.edu.repository.ProveedoresRepository;
import org.json.simple.JSONObject;
import jakarta.persistence.EntityManager;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;

/**
 *
 * @author willi
 */
@Path("/Proveedores")
public class ProveedoresController {

    @Inject
    EntityManager em;

    @Inject
    ProveedoresRepository ProveedoresRepo;

    // Prueba en base al video datos por medio de JSON
    /*@POST
    @Transactional
    public Response saveNewProveedor(Proveedores nuevoProveedor) {

        System.out.println("nuevoProveedor-> " + nuevoProveedor.toString());
        JSONObject JsonRespuesta = new JSONObject();

        try {
            ProveedoresRepo.create(nuevoProveedor);
            JsonRespuesta.put("Estado", 1);
            JsonRespuesta.put("Mensaje", "Proveedor creado");
            return Response.ok().entity(JsonRespuesta).build();
        } catch (Exception e) {
            JsonRespuesta.put("Estado", 0);
            JsonRespuesta.put("Mensaje", "Proveedor no creado");
            return Response.serverError().entity(JsonRespuesta).build();
        }
    }*/
    
    // Prueba FRONTEND
    @POST
    @Transactional
    public Response guardarProveedor(Proveedores nuevoProveedor) {
        ProveedoresRepo.persist(nuevoProveedor);
        return Response.status(Response.Status.CREATED)
                .entity(nuevoProveedor)
                .build();
    }

    @GET
    public Response getProveedores() {

        return Response.ok(
                ProveedoresRepo.findProveedores()
        ).build();
    }

    public Response findProveedores() {
        JSONObject JsonRespuesta = new JSONObject();
        try {
            List<Proveedores> lstProveedores = ProveedoresRepo.findProveedores();
            ObjectMapper objMapper = new ObjectMapper();
            String jsonArray = objMapper.writeValueAsString(lstProveedores);
            JSONParser parser = new JSONParser();
            JSONArray jsonProveedores = (JSONArray) parser.parse(jsonArray);
            JsonRespuesta.put("Estado", 1);
            JsonRespuesta.put("Mensaje", "Consulta exitosa");
            JsonRespuesta.put("Proveedores", jsonProveedores);

            return Response.ok().entity(JsonRespuesta).build();
        } catch (Exception e) {
            JsonRespuesta.put("Estado", 0);
            JsonRespuesta.put("Mensaje", "Consulta no exitosa");
            return Response.serverError().build();
        }
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Response actualizarProveedor(
            @PathParam("id") Integer id,
            Proveedores datos) {

        Proveedores proveedor = ProveedoresRepo.findById(id);

        if (proveedor == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"mensaje\":\"Proveedor no encontrado\"}")
                    .build();
        }

        proveedor.setNombre(datos.getNombre());
        proveedor.setDireccion(datos.getDireccion());
        proveedor.setTelefono(datos.getTelefono());
        proveedor.setCorreo(datos.getCorreo());

        return Response.ok(proveedor).build();
    }
}

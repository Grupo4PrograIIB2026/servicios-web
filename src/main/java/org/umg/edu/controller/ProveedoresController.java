package org.umg.edu.controller;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.umg.edu.model.Proveedores;
import org.umg.edu.repository.ProveedoresRepository;

/**
 *
 * @author willi
 */
@Path("/Proveedores")
public class ProveedoresController {

    @Inject
    ProveedoresRepository ProveedoresRepo;

    @POST
    @Transactional
    public Response saveNewProveedor(Proveedores nuevoProveedor) {

        try {

            ProveedoresRepo.create(nuevoProveedor);

            System.out.println(
                    "nuevoProveedor-> "
                    + nuevoProveedor.toString()
            );

            return Response.ok(nuevoProveedor).build();

        } catch (Exception e) {

            e.printStackTrace();

            return Response.serverError()
                    .entity(e.getMessage())
                    .build();
        }
    }

    /*public Response saveNewProveedor(Proveedores nuevoProveedor) {

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

    @GET
    public Response getProveedores() {

        return Response.ok(
                ProveedoresRepo.findProveedores()
        ).build();
    }
    /*public Response findProveedores(){
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
    }*/
}

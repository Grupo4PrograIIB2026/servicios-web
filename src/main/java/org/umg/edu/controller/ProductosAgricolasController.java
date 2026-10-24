package org.umg.edu.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.JSONParser;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.json.simple.JSONArray;
import org.umg.edu.model.ProductosAgricolas;
import org.umg.edu.repository.ProductosAgricolasRepository;
import org.json.simple.JSONObject;

/**
 *
 * @author Juan Mendoza
 */
@Path("/ProductosAgricolas")
public class ProductosAgricolasController {

    @Inject
    ProductosAgricolasRepository ProductosAgricolasrepo;

    @POST
    public Response saveNewProveedor(ProductosAgricolas nuevoProductosAgricolas) {

        System.out.println("nuevoProducto-> " + nuevoProductosAgricolas.toString());
        JSONObject JsonRespuesta = new JSONObject();

        try {
            ProductosAgricolasrepo.create(nuevoProductosAgricolas);
            JsonRespuesta.put("Estado", 1);
            JsonRespuesta.put("Mensaje", "Producto creado");
            return Response.ok().entity(JsonRespuesta).build();
        } catch (Exception e) {
            JsonRespuesta.put("Estado", 0);
            JsonRespuesta.put("Mensaje", "Producto no creado");
            return Response.serverError().entity(JsonRespuesta).build();
        }
    }

    @GET
    public Response findProductosAgricolas() {
        JSONObject JsonRespuesta = new JSONObject();
        try {
            List<ProductosAgricolas> lstProductosAgricolas = ProductosAgricolasrepo.findProductosAgricolas();
            ObjectMapper objMapper = new ObjectMapper();
            String jsonArray = objMapper.writeValueAsString(lstProductosAgricolas);
            JSONParser parser = new JSONParser();
            JSONArray jsonProductosAgricolas = (JSONArray) parser.parse(jsonArray);
            JsonRespuesta.put("Estado", 1);
            JsonRespuesta.put("Mensaje", "Consulta exitosa");
            JsonRespuesta.put("ProductosAgricolas", jsonProductosAgricolas);

            return Response.ok().entity(JsonRespuesta).build();
        } catch (Exception e) {
            JsonRespuesta.put("Estado", 0);
            JsonRespuesta.put("Mensaje", "Consulta no exitosa");
            return Response.serverError().build();
        }
    }
}

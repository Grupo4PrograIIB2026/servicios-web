package org.umg.edu.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.simple.parser.JSONParser;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.core.Response;
import java.util.List;
import org.json.simple.JSONArray;
import org.umg.edu.model.ProductosAgricolas;
import org.umg.edu.repository.ProductosAgricolasRepository;
import org.json.simple.JSONObject;

/**
 *
 * @author willi
 */
@Path("/ProductosAgricolas")
public class ProductosAgricolasController {

    @Inject
    EntityManager em;

    @Inject
    ProductosAgricolasRepository ProductosAgricolasRepo;

    @POST
    @Transactional
    public Response guardarProductoAgricola(ProductosAgricolas nuevoProductoAgricola) {
        ProductosAgricolasRepo.persist(nuevoProductoAgricola);
        return Response.status(Response.Status.CREATED)
                .entity(nuevoProductoAgricola)
                .build();
    }

    @GET
    public Response getProveedores() {

        return Response.ok(
                ProductosAgricolasRepo.findProductosAgricolas()
        ).build();
    }

    public Response findProductosAgricolas() {
        JSONObject JsonRespuesta = new JSONObject();
        try {
            List<ProductosAgricolas> lstProductosAgricolas = ProductosAgricolasRepo.findProductosAgricolas();
            ObjectMapper objMapper = new ObjectMapper();
            String jsonArray = objMapper.writeValueAsString(lstProductosAgricolas);
            JSONParser parser = new JSONParser();
            JSONArray jsonProductosAgricolas = (JSONArray) parser.parse(jsonArray);
            JsonRespuesta.put("Estado", 1);
            JsonRespuesta.put("Mensaje", "Consulta exitosa");
            JsonRespuesta.put("Productos Agricolas", jsonProductosAgricolas);

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
    public Response actualizarProductoAgricola(
            @PathParam("id") Integer id,
            ProductosAgricolas datos) {

        ProductosAgricolas productoAgricola = ProductosAgricolasRepo.findById(id);

        if (productoAgricola == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"mensaje\":\"Producto Agricola no encontrado\"}")
                    .build();
        }

        productoAgricola.setNombre(datos.getNombre());
        productoAgricola.setDescripcion(datos.getDescripcion());
        productoAgricola.setUnidadMedida(datos.getUnidadMedida());
        productoAgricola.setPrecioUnitario(datos.getPrecioUnitario());
        productoAgricola.setExistencia(datos.getExistencia());

        return Response.ok(productoAgricola).build();
    }

}

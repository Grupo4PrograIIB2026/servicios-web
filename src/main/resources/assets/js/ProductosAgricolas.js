document.addEventListener("DOMContentLoaded", function () {
    cargarProductosAgricolas();
});

// Prueba 1 FRONTEND
/*function cargarProveedores() {
 
 fetch("/Proveedores")
 .then(response => {
 
 if (!response.ok) {
 throw new Error("Error al consultar proveedores");
 }
 
 return response.json();
 })
 .then(proveedores => {
 
 const tabla = document.getElementById("Proveedores");
 
 tabla.innerHTML = "";
 
 proveedores.forEach(proveedor => {
 
 const fila = document.createElement("tr");
 
 fila.innerHTML = `
 <td>${proveedor.idProveedor}</td>
 <td>${proveedor.nombre}</td>
 <td>${proveedor.direccion}</td>
 <td>${proveedor.telefono}</td>
 <td>${proveedor.correo}</td>
 <td>
 <button onclick="actualizarProveedor(${proveedor.idProveedor})">
 Actualizar
 </button>
 </td>
 `;
 
 tabla.appendChild(fila);
 });
 
 })
 .catch(error => {
 
 console.error(error);
 
 alert("No se pudieron cargar los proveedores");
 });
 }*/

// Prueba 2 FRONTEND

let productosAgricolasEditandoId = null;

function cargarProductosAgricolas() {
    fetch("/ProductosAgricolas")
            .then(async response => {
                if (!response.ok) {
                    const detalle = await response.text();
                    throw new Error(
                            `HTTP ${response.status}: ${detalle}`
                            );
                }
                return response.json();
            })
            .then(respuesta => {
                const tabla = document.getElementById(
                        "tablaProductosAgricolas"
                        );
                if (!tabla) {
                    throw new Error(
                            "No existe la tabla de productos agrícolas"
                            );
                }

                // Admite distintas estructuras de respuesta JSON
                const productos = Array.isArray(respuesta)
                        ? respuesta
                        : respuesta.ProductosAgricolas
                        ?? respuesta.productosAgricolas
                        ?? respuesta.productos
                        ?? respuesta.data;

                if (!Array.isArray(productos)) {
                    console.error("Respuesta recibida:", respuesta);
                    throw new Error(
                            "La API no devolvió una lista de productos"
                            );
                }

                tabla.innerHTML = "";

                productos.forEach(producto => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                    <td>${producto.idProducto ?? ""}</td>
                    <td>${producto.nombre ?? ""}</td>
                    <td>${producto.descripcion ?? ""}</td>
                    <td>${producto.unidadMedida ?? ""}</td>
                    <td> Q ${producto.precioUnitario ?? ""}</td>
                    <td>${producto.existencia ?? ""}</td>
                    <td>
                        <button onclick="actualizarProductosAgricolas(
                            ${Number(producto.idProducto)}
                        )">
                            Actualizar
                        </button>
                    </td>
                `;

                    tabla.appendChild(fila);
                });
            })
            .catch(error => {
                console.error(
                        "Error al cargar productos agrícolas:",
                        error
                        );
            });
}


function mostrarFormularioProductosAgricolas() {
    document
            .getElementById("formularioProducto")
            .classList.remove("ocultoProducto");
}

function ocultarFormularioProductosAgricolas() {
    document
            .getElementById("formularioProducto")
            .classList.add("ocultoProducto");
}



function guardarProductosAgricolas() {
    const productosAgricolas = {
        nombre: document.getElementById("nombreProductosAgricolas").value.trim(),
        descripcion: document.getElementById("descripcion").value.trim(),
        unidadMedida: document.getElementById("unidadMedida").value.trim(),
        precioUnitario: document.getElementById("precioUnitario").value.trim(),
        existencia: document.getElementById("existencia").value.trim()
    };

    const formularioVacio =
            productosAgricolas.nombre === "" &&
            productosAgricolas.descripcion === "" &&
            productosAgricolas.unidadMedida === "" &&
            productosAgricolas.precioUnitario === "" &&
            productosAgricolas.existencia === "";

    if (formularioVacio) {
        alert("Primero agregue un producto");
        return;
    }

    if (productosAgricolas.nombre === "" ||
            productosAgricolas.precioUnitario === "" ||
            productosAgricolas.existencia === "") {
        alert("Complete al menos nombre, precio y stock");
        return;
    }

    const editando = productosAgricolasEditandoId !== null;

    if (editando && productoAgricolaOriginal) {
        const sinCambios =
                productosAgricolas.nombre === productoAgricolaOriginal.nombre &&
                productosAgricolas.descripcion === productoAgricolaOriginal.descripcion &&
                productosAgricolas.unidadMedida === productoAgricolaOriginal.unidadMedida &&
                productosAgricolas.precioUnitario === productoAgricolaOriginal.precioUnitario;
        productosAgricolas.existencia === productoAgricolaOriginal.existencia;

        if (sinCambios) {
            alert("Primero modifique algún campo");
            return;
        }
    }

    const url = editando
            ? `/ProductosAgricolas/${productosAgricolasEditandoId}`
            : "/ProductosAgricolas";

    fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productosAgricolas)
    })
            .then(async response => {
                if (!response.ok) {
                    throw new Error(
                            `HTTP ${response.status}: ${await response.text()}`
                            );
                }

                return response.text();
            })
            .then(() => {
                alert(editando
                        ? "Producto Agricola actualizado correctamente"
                        : "Producto Agricola guardado correctamente"
                        );

                productosAgricolasEditandoId = null;
                productoAgricolaOriginal = null;

                document.getElementById("nombreProductosAgricolas").value = "";
                document.getElementById("descripcion").value = "";
                document.getElementById("unidadMedida").value = "";
                document.getElementById("precioUnitario").value = "";
                document.getElementById("existencia").value = "";

                document.querySelector("#formularioProducto h2").textContent =
                        "Agregar Producto";

                document.querySelector(
                        "#formularioProducto button[onclick='guardarProductosAgricolas()']"
                        ).textContent = "Guardar";

                ocultarFormularioProductosAgricolas();
                cargarProductosAgricolas();
            })
            .catch(error => {
                console.error("Error al guardar o actualizar:", error);
                alert("No se pudo guardar el producto agricola. Revisa la consola.");
            });
}

function actualizarProductosAgricolas(id) {
    fetch("/ProductosAgricolas")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudieron consultar los productos agricolas");
                }
                return response.json();
            })
            .then(productosAgricolas => {
                const productoAgricola = productosAgricolas.find(
                        p => Number(p.idProducto) === Number(id)
                );

                if (!productoAgricola) {
                    throw new Error("No se encontró el producto agricola seleccionado");
                }

                productosAgricolasEditandoId = id;

                productoAgricolaOriginal = {
                    nombre: String(productoAgricola.nombre ?? "").trim(),
                    descripcion: String(productoAgricola.descripcion ?? "").trim(),
                    unidadMedida: String(productoAgricola.unidadMedida ?? "").trim(),
                    precioUnitario: String(productoAgricola.precioUnitario ?? "").trim(),
                    existencia: String(productoAgricola.existencia ?? "").trim()
                };

                document.getElementById("nombreProductosAgricolas").value = productoAgricola.nombre ?? "";
                document.getElementById("descripcion").value = productoAgricola.descripcion ?? "";
                document.getElementById("unidadMedida").value = productoAgricola.unidadMedida ?? "";
                document.getElementById("precioUnitario").value = productoAgricola.precioUnitario ?? "";
                document.getElementById("existencia").value = productoAgricola.existencia ?? "";
                document.querySelector("#formularioProducto h2").textContent =
                        "Actualizar producto #" + id;
                document.querySelector(
                        "#formularioProducto button[onclick='guardarProductosAgricolas()']"
                        ).textContent = "Guardar cambios";
                mostrarFormularioProductosAgricolas();
            })
            .catch(error => {
                console.error(error);
                alert("No se pudo cargar el producto agricola para editar");
            });
}

function cancelarProductosAgricolas() {
    productosAgricolasEditandoId = null;
    document.getElementById("nombreProductosAgricolas").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("unidadMedida").value = "";
    document.getElementById("precioUnitario").value = "";
    document.getElementById("existencia").value = "";
    document.querySelector("#formularioProducto h2").textContent = "Agregar Producto Agricola";
    document.querySelector("#formularioProducto button[onclick='guardarProductosAgricolas()']").textContent = "Guardar";
    ocultarFormularioProductosAgricolas();
}
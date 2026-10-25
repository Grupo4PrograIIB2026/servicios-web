document.addEventListener("DOMContentLoaded", function () {
    cargarProveedores();
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

let proveedorEditandoId = null;

function cargarProveedores() {
    fetch("/Proveedores")
            .then(async response => {
                if (!response.ok) {
                    const detalle = await response.text();
                    throw new Error(
                            `HTTP ${response.status}: ${detalle}`
                            );
                }
                return response.json();
            })
            .then(proveedores => {
                const tabla = document.getElementById("tablaProveedores");
                if (!tabla) {
                    throw new Error(
                            "No existe un elemento HTML con id='Proveedores'"
                            );
                }
                if (!Array.isArray(proveedores)) {
                    throw new Error(
                            "La respuesta no es una lista de proveedores"
                            );
                }
                tabla.innerHTML = "";
                proveedores.forEach(proveedor => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                    <td>${proveedor.idProveedor ?? ""}</td>
                    <td>${proveedor.nombre ?? ""}</td>
                    <td>${proveedor.direccion ?? ""}</td>
                    <td>${proveedor.telefono ?? ""}</td>
                    <td>${proveedor.correo ?? ""}</td>
                    <td>
                        <button onclick="actualizarProveedor(
                            ${Number(proveedor.idProveedor)}
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
                        "Error al cargar proveedores:",
                        error
                        );
                alert("No se pudieron cargar los proveedores. Revisa la consola.");
            });
}

function mostrarFormulario() {
    document
            .getElementById("formulario")
            .classList.remove("oculto");
}

function ocultarFormulario() {

    document
            .getElementById("formulario")
            .classList.add("oculto");
}

// Primera prueba detecta si queremos editar o guardar el registro seleccionado
/*function guardarProveedor() {
 
 const proveedor = {
 nombre: document.getElementById("nombre").value,
 direccion: document.getElementById("direccion").value,
 telefono: document.getElementById("telefono").value,
 correo: document.getElementById("correo").value
 };
 
 
 fetch("/Proveedores", {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
 },
 body: JSON.stringify(proveedor)
 })
 .then(response => {
 if (!response.ok) {
 throw new Error("Error al guardar proveedor");
 }
 return response.json();
 })
 .then(data => {
 alert("Proveedor guardado correctamente");
 document.getElementById("nombre").value = "";
 document.getElementById("direccion").value = "";
 document.getElementById("telefono").value = "";
 document.getElementById("correo").value = "";
 ocultarFormulario();
 cargarProveedores();
 })
 .catch(error => {
 console.error(error);
 alert("Error al guardar el proveedor");
 });
 }*/


function guardarProveedor() {
    const proveedor = {
        nombre: document.getElementById("nombre").value.trim(),
        direccion: document.getElementById("direccion").value.trim(),
        telefono: document.getElementById("telefono").value.trim(),
        correo: document.getElementById("correo").value.trim()
    };

    const editando = proveedorEditandoId !== null;

    const url = editando
            ? `/Proveedores/${proveedorEditandoId}`
            : "/Proveedores";

    fetch(url, {
        method: editando ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(proveedor)
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
                        ? "Proveedor actualizado correctamente"
                        : "Proveedor guardado correctamente"
                        );

                proveedorEditandoId = null;

                document.getElementById("nombre").value = "";
                document.getElementById("direccion").value = "";
                document.getElementById("telefono").value = "";
                document.getElementById("correo").value = "";

                document.querySelector("#formulario h2").textContent =
                        "Agregar Proveedor";

                document.querySelector(
                        "#formulario button[onclick='guardarProveedor()']"
                        ).textContent = "Guardar";

                ocultarFormulario();
                cargarProveedores();
            })
            .catch(error => {
                console.error("Error al guardar o actualizar:", error);
                alert("No se pudo guardar el proveedor. Revisa la consola.");
            });
}


//Primera prueba de editar registros
/*function actualizarProveedor(id) {
 alert("Actualizar proveedor con ID: " + id);
 }*/


function actualizarProveedor(id) {
    fetch("/Proveedores")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudieron consultar los proveedores");
                }
                return response.json();
            })
            .then(proveedores => {
                const proveedor = proveedores.find(
                        p => Number(p.idProveedor) === Number(id)
                );

                if (!proveedor) {
                    throw new Error("No se encontró el proveedor seleccionado");
                }

                proveedorEditandoId = id;

                document.getElementById("nombre").value = proveedor.nombre ?? "";
                document.getElementById("direccion").value = proveedor.direccion ?? "";
                document.getElementById("telefono").value = proveedor.telefono ?? "";
                document.getElementById("correo").value = proveedor.correo ?? "";
                document.querySelector("#formulario h2").textContent =
                        "Actualizar proveedor #" + id;
                document.querySelector(
                        "#formulario button[onclick='guardarProveedor()']"
                        ).textContent = "Guardar cambios";

                mostrarFormulario();
            })
            .catch(error => {
                console.error(error);
                alert("No se pudo cargar el proveedor para editar");
            });
}

document.addEventListener("DOMContentLoaded", function () {
    cargarProveedores();
});


function cargarProveedores() {

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


function guardarProveedor() {

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
}


function actualizarProveedor(id) {

    alert("Actualizar proveedor con ID: " + id);
}
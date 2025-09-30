// Obtener productos según categoría
function obtenerProductosServicios(categoria = "") {
    if (categoria === null || categoria == "") {
        return lista_cursos;
    } else {
        let lista_filtrada = lista_cursos.filter(curso => curso.codigo_categoria === categoria);
        return lista_filtrada;
    }
}

// Obtener un producto/servicio por código
function obtenerProductoServicioPorCodigo(codigo) {
    return lista_cursos.find(curso => curso.codigo === codigo);
}

// ---------------------------------------------------
// Funciones relacionadas con el CLOSET
// ---------------------------------------------------

function mostrarCloset() {
    let etiqueta_closet = document.getElementById("etiqueta_closet");
    etiqueta_closet.innerHTML = "";
    let costoTotal = 0;

    closet = obtenerCloset();

    closet.forEach((elemento, posicion) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <div class="d-flex justify-content-between align-items-center p-2 border-bottom border-dark">
                <div class="row">
                    <p class="my-0">${elemento.nombre}</p>
                    <small>${elemento.precio}</small>
                </div>
                <a class="btn bg-warning text-decoration-none text-dark" 
                    onclick="eliminarProductoServicio('${posicion}')">
                    <i class="fa fa-times"></i>
                </a>
            </div>`;
        etiqueta_closet.appendChild(li);
        costoTotal = costoTotal + elemento.precio;
    });

    let etiqueta_total = document.getElementById("etiqueta_total");
    etiqueta_total.innerText = costoTotal.toFixed(2);
}

function obtenerCloset() {
    let closet = [];
    const str = localStorage.getItem("closet");
    if (str) {
        closet = JSON.parse(str);
    }
    return closet;
}

function agregarProductoServicio(producto, mostrar = true) {
    closet.push(producto);
    localStorage.setItem("closet", JSON.stringify(closet));
    if (mostrar) {
        mostrarCloset();
    }
}

function eliminarProductoServicio(posicion) {
    closet.splice(posicion, 1);
    localStorage.setItem("closet", JSON.stringify(closet));
    mostrarCloset();
}

function vaciarCloset() {
    closet = [];
    localStorage.setItem("closet", JSON.stringify(closet));
    mostrarCloset();
}

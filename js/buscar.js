const buscador = document.querySelector("#buscar");
const boton = document.querySelector("#btnBuscar");


const buscar = () => {
    catalogo.innerHTML = "";
    const texto = buscador.value.toLowerCase();
    for (let producto of productos) {
        let nombre = producto.prenda.toLowerCase();
        if (nombre.indexOf(texto) !== -1) {
            catalogo.innerHTML += `
            <div class="col-12 mb-2 col-md-4">
            <div class="card" style="width: 12rem;">
            <img src="${producto.img}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${producto.prenda}</h5>
            <h6 class="hide">${producto.id}</h6>
            <p>Precio:<span class="precio">${producto.precio}</span></p>
            <button class="btn btn-primary button">Añadir a Carrito</button>
            </div>
            </div>
            </div>`
        }

    }
    if (catalogo.innerHTML === "") {
        catalogo.innerHTML += `
        <h5 class="text-center">Poducto no encontrado...</h5>`
    }

}


boton.addEventListener("click", buscar);
buscador.addEventListener("keyup", buscar);

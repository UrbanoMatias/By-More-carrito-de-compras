//Metodo para filtrar los productos
let elijeFiltro = document.querySelectorAll('input[type="radio"]');

elijeFiltro.forEach(elemento => elemento.addEventListener("change", filtrar));

function filtrar(){
    catalogo.innerHTML="";
    const checkeado = Array.from(elijeFiltro).filter(elemento => elemento.checked);
    const valorChekeado = checkeado.map(elemento => elemento.value);
    let arrayFiltrado = [];

    if(valorChekeado == "todo"){
        arrayFiltrado = productos;
    }else if(valorChekeado == "parteDeArriba"){
        arrayFiltrado = productos.filter(producto => producto.tipo == "Arriba");
    }else if(valorChekeado == "lenceria"){
        arrayFiltrado = productos.filter(producto => producto.tipo == "Lenceria");
    }else if (valorChekeado == "parteDeAbajo"){
        arrayFiltrado = productos.filter(producto => producto.tipo == "Abajo")
    }
    filtrarProductos(arrayFiltrado)
}

function filtrarProductos(array){
    array.forEach(producto => {
        templateCard.querySelector("button").dataset.id = producto.id;
        templateCard.querySelector("h5").textContent = producto.prenda;
        templateCard.querySelector("p").textContent = producto.precio;
        templateCard.querySelector("img").setAttribute("src", producto.img);
        templateCard.querySelector("h6").textContent = producto.tipo;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone)
    })
    catalogo.appendChild(fragment);
}

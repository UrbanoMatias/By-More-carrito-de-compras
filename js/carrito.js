//Const que tienen cada elemento
const catalogo = document.getElementById("catalogo");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};

//funcion para guardar el localstorage
document.addEventListener("DOMContentLoaded", (carrito) => {
    if(localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"));
        
    }
})

//Fruncion que añade el producto al carrito con sus caracteristicas
function llenarCatalogo() {
    productos.forEach(producto => {
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
llenarCatalogo();

//funcion para añadir al carrito
const añadirCarrito = e => {
    if (e.target.classList.contains("button")) {
        agregarCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}


const agregarCarrito = objeto => {
    const products = {
        id: objeto.querySelector("button").dataset.id,
        prenda: objeto.querySelector("h5").textContent,
        precio: objeto.querySelector("p").textContent,
        cantidad: 1,
    }
    if (carrito.hasOwnProperty(products.id)) {
        products.cantidad = carrito[products.id].cantidad + 1
    }
    carrito[products.id] = {
        ...products
    }
    llenarCarrito()

}
catalogo.addEventListener("click", e => {
    añadirCarrito(e)
})

//Funcion para llenar el carrito
const llenarCarrito = () => {
    items.innerHTML = ""
    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector("th").textContent = producto.id;
        templateCarrito.querySelectorAll("td")[0].textContent = producto.prenda;
        templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
        templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
        templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
        templateCarrito.querySelector("span").textContent = producto.cantidad * producto.precio;
        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment);
    llenarFooter();
    localStorage.setItem("carrito", JSON.stringify(carrito))

} 

//Funcion para llenar el footer elimando el "th" de carrito vacio, y para darle un evento a los botones de borrar y comprar
const llenarFooter = () => {
    footer.innerHTML = "";
    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
         <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
        return
    }

    const nCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)

    templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
    templateFooter.querySelector("span").textContent = nPrecio;

    const clone = templateFooter.cloneNode(true);
    fragment.appendChild(clone);
    footer.appendChild(fragment);

    const btnVaciar = document.getElementById("vaciar-carrito")
    btnVaciar.addEventListener("click", () => {
        carrito = [];
        llenarCarrito();
    })
    const btnComprar = document.getElementById("procesar-pedido")
    btnComprar.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Gracias por su compra! Vuelva Pronto! ")
        carrito = [];
        llenarCarrito();
        
    })

}

//Botones para agregar o quitar productos
const btnAgregar = e => {
    if(e.target.classList.contains("btn-info")){
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        llenarCarrito();
    }

    if(e.target.classList.contains("btn-danger")){
        const productos = carrito[e.target.dataset.id];
        productos.cantidad--
        if(productos.cantidad === 0) {
            delete carrito[e.target.dataset.id]
        }
        llenarCarrito();
    }
    
    e.stopPropagation();
    
}
items.addEventListener("click", e => {
    btnAgregar(e)

})


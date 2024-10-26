const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");
const $productosContainer = d.querySelector("#productos");


function cargarProductos() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => mostrarProductos(json))
        .catch(err => console.error('Error al cargar productos:', err));
}

function mostrarProductos(productos) {
    productos.forEach(producto => {
        const $producto = d.createElement("div");
        $producto.classList.add("producto");
        $producto.setAttribute("data-nombre", producto.title);
        $producto.setAttribute("data-precio", producto.price);

        $producto.innerHTML = `
            <h3>${producto.title}</h3>
            <p>Precio: $${producto.price}</p>
            <button class="btn-agregar">Agregar al carrito</button>
        `;

        $productosContainer.appendChild($producto);
    });
}

cargarProductos();

d.addEventListener("click", function (e) {
    if (!e.target.matches(".btn-agregar")) {
        return false;
    }

    const $producto = e.target.closest(".producto");
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));
    let cantidad = 1;

    const $itemExistente = Array.from($listaCarrito.children).find(item => item.dataset.nombre === nombre);

    if ($itemExistente) {
        cantidad = parseInt($itemExistente.querySelector(".cantidad").innerText) + 1;
        $itemExistente.querySelector(".cantidad").innerText = cantidad;
    } else {
        const $itemCarrito = d.createElement("li");
        $itemCarrito.dataset.nombre = nombre; 
        $itemCarrito.innerHTML = `
            ${nombre} - $${precio} - <span class="cantidad">${cantidad}</span> 
            <button class="btn-disminuir">-</button>
            <button class="btn-aumentar">+</button>
        `;

    $listaCarrito.appendChild($itemCarrito);

    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual + precio).toFixed(2); 
}});

$listaCarrito.addEventListener("click", function(e){
    if(e.target.classList.contains("btn-aumentar") || e.target.classList.contains("btn-disminuir")) {
        const $item = e.target.closest("li");
        let cantidad = parseInt($item.querySelector(".cantidad").innerText);
        let precio = parseFloat($item.innerText.split("- $")[1]);

        if(e.target.classList.contains("btn-aumentar")) {
            cantidad++;
        } else if(e.target.classList.contains("btn-disminuir")) {
            cantidad--;
            if(cantidad === 0) {
                $item.remove();
            }
        }

        $item.querySelector(".cantidad").innerText = cantidad;
        actualizarTotal();
    }
});

$btnCompra.addEventListener("click", function(e){
    if($listaCarrito.children.length > 0) {
        $mensajeCompra.classList.remove("hidden");
        Loader();
        $itemCarrito  = [];
        $listaCarrito = [];
    } else {
        alert("El carrito está vacío, no se puede realizar la compra.");
    }
});

function actualizarTotal() {
    let total = 0;
    $listaCarrito.querySelectorAll("li").forEach($item => {
        let precio = parseFloat($item.innerText.split("- $")[1]);
        let cantidad = parseInt($item.querySelector(".cantidad").innerText);
        total += precio * cantidad;
    });
    $totalCarrito.innerText = total.toFixed(2);
}

function Loader() {
    
    document.getElementById('loader').style.display = 'block';
    document.getElementById('mensaje').style.display = 'none';
    setTimeout(function() {        
        document.getElementById('loader').style.display = 'none';
        document.getElementById('mensaje').style.display = 'block';
    }, 5000);
}
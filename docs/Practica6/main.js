const d = document;
const $listaCarrito = d.querySelector("#lista-carrito");
const $totalCarrito = d.querySelector("#total-carrito");
const $btnCompra = d.querySelector("#btn-compra");
const $mensajeCompra = d.querySelector("#mensaje-compra");
const $carrito = d.querySelector("#carrito");

d.addEventListener("click", function (e) {
    if (!e.target.matches(".producto")) {
        return false;
    }

    const $producto = e.target;
    let nombre = $producto.getAttribute("data-nombre");
    let precio = parseFloat($producto.getAttribute("data-precio"));
    let cantidad = 1;

    const $itemCarrito = d.createElement("li");
    $itemCarrito.innerHTML = `
        ${nombre} - $${precio} - <span class="cantidad">${cantidad}</span> 
        <button class="btn-disminuir">-</button>
        <button class="btn-aumentar">+</button>
    `;

    $listaCarrito.appendChild($itemCarrito);

    let totalActual = parseFloat($totalCarrito.innerText);
    $totalCarrito.innerText = (totalActual + precio).toFixed(2); 
});

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
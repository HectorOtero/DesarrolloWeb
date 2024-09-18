// Instruccion 1

let productos = [
    {nombre: "Camiseta", precio: "15", stock: "10"},
    {nombre: "Pantalon", precio: "25", stock: "5"},
    {nombre: "Zapatos", precio: "20", stock: "15"},
    {nombre: "Corbatas", precio: "10", stock: "20"},
    {nombre: "Sudadera", precio: "22", stock: "14"},
]

//Instruccion 2
let carrito = [


]

function agregarAlCarrito(productoNombre, cantidad) {
    for (let producto of productos) {
      if (producto.nombre === productoNombre) {
        if (producto.stock >= cantidad) {
          carrito.push({
            nombre: productoNombre,
            cantidad: cantidad,
            precio: producto.precio,
          });
  
          producto.stock -= cantidad;
          console.info(`${cantidad} ${productoNombre}(s) agregado(s) al carrito`);
        } else {
          console.error(`No hay suficiente stock de ${productoNombre}`);
        }
        return;
      }
    }
    console.error(`El producto "${productoNombre}" no existe.`);
  }

function calcularTotal() {
    let total = 0;
    for (let item of carrito) {
        total += item.precio * item.cantidad;
    }
    return total;
}

function aplicarDescuento(total) {
    if (total > 100) {
        return total * .9
    }
     return total;
}

function procesarCompra() {
    console.log("Procesando compra...");
    setTimeout(function () {
      let total = calcularTotal();
      total = aplicarDescuento(total);
      console.log(`Compra completada. Total a pagar: $${total.toFixed(2)}`);
    }, 3000);
  }
  
agregarAlCarrito("Pantalon", 3);
agregarAlCarrito("Pantalon", 2);
agregarAlCarrito("Pantalon", 3);

agregarAlCarrito("Camiseta", 5);
agregarAlCarrito("Camisetas", 2);
agregarAlCarrito("Corbatas", 6);
console.log(carrito);

/*let total = calcularTotal();
total = aplicarDescuento(total);
console.log(total); */
procesarCompra();


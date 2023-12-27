// Este ejemplo está plantead para que se calcule el total de items vendidos de cada tipo de producto.
// Asumamos que se tienen las ventas de cada sucursal en un día puntual

const ventasDia = [
    { manzanas: 3, peras: 2, carbne: 1, jugos: 5, dulces: 2 },
    { manzanas: 1, sandias: 1, huevos: 6, jugos: 1, panes: 4 },
];

const ventaTotal = [];

// Queremos saber dos cosas:
// - Qué productos se vendieron?
// - En qué cantidad se vendió cada uno de ellos

ventasDia.forEach((ventaSucursal) => {
    for (producto in ventaSucursal) {
        // Para cada producto de cada venta queremos saber si ya está en el array ventaTotal
        if (ventaTotal.includes(Object.keys(ventaSucursal))) {
            // if (ventaTotal.hasOwnProperty(producto)) { // Opción alternativa
            // Si lo está sumamos la cantidad de ventaSucursal a la cantidad de ventaTotal de ese producto específico
            // Notación de corchetes para acceso a propiedades: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Property_accessors
            ventaTotal[producto] += ventaSucursal[producto];
        } else {
            // En caso de que no esté, lo agregamos con la cantidad de ventaSucursal
            ventaTotal[producto] = ventaSucursal[producto];
        }
    }
});

console.log(ventaTotal);

// ===========================
// VARIABLES Y CONSTANTES GLOBALES
// ===========================

// Arrays de datos
let productos = [
    { id: 1, nombre: "Pollo a la Brasa Entero", precio: 45.00, categoria: "pollos", stock: 15, imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCOPzX_H-IsCStGx3DgwVbhUQnxyFiHalxA&s" },
    { id: 2, nombre: "1/2 Pollo a la Brasa", precio: 25.00, categoria: "pollos", stock: 20, imagen: "https://polleriaslagranja.com/wp-content/uploads/2022/10/La-Granja-Real-Food-Chicken-1.2-Pollo-a-la-Brasa.png" },
    { id: 3, nombre: "1/4 Pollo a la Brasa", precio: 15.00, categoria: "pollos", stock: 25, imagen: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcS9-Hs_VO9Nv2A1JtK0_5sZUf4TG6H4VMtavmVGLfpYH_M8Oo1Y" },
    { id: 4, nombre: "Papas Fritas Grande", precio: 8.00, categoria: "acompañamientos", stock: 30, imagen: "https://tofuu.getjusto.com/orioneat-local/resized2/s5FW2pjvwZcs6aaSP-500-x.webp" },
    { id: 5, nombre: "Ensalada Fresca", precio: 6.00, categoria: "acompañamientos", stock: 20, imagen: "https://www.comida-peruana.com/base/stock/Recipe/ensalada-de-polleria/ensalada-de-polleria_web.jpg.webp" },
    { id: 6, nombre: "Inca Kola 1.5L", precio: 5.00, categoria: "bebidas", stock: 40, imagen: "https://corporacionliderperu.com/40316-large_default/inca-kola-gaseosas-normal-x-1-5-lt.jpg" },
    { id: 7, nombre: "Chicha Morada 1L", precio: 7.00, categoria: "bebidas", stock: 25, imagen: "https://tofuu.getjusto.com/orioneat-local/resized2/KScvan2eQf2BeMqBS-2400-x.webp" },
    { id: 8, nombre: "Arroz Chaufa", precio: 12.00, categoria: "acompañamientos", stock: 15, imagen: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop" }
];

// Logo de la pollería
const LOGO_CAMPOS = "https://i.imgur.com/your-logo-url.png"; // Reemplaza con la URL del logo subido

let carrito = [];
let pedidos = [];

// Constantes
const IGV = 0.18;
const DELIVERY_PRECIO = 5.00;

// ===========================
// FUNCIONES DE INICIALIZACIÓN
// ===========================

// Función que se ejecuta al cargar la página (evento onload)
window.onload = function() {
    console.log("=== POLLERÍA CAMPOS CHICLAYO ===");
    console.log("Sistema iniciado correctamente");
    console.log(`Total de productos: ${productos.length}`);
    
    // Llamar función para mostrar productos
    mostrarProductos();
    
    // Cambiar título del documento
    document.title = "Pollería Campos Chiclayo";
    
    // Mensaje de bienvenida
    alert("¡Bienvenido a Pollería Campos Chiclayo! 🍗");
};

// ===========================
// FUNCIONES DE PRODUCTOS
// ===========================

// Función para mostrar productos en el grid
function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = ''; // Limpiar contenido
    
    // Obtener productos filtrados
    const productosFiltrados = obtenerProductosFiltrados();
    
    // ESTRUCTURA DE CONTROL - Bucle for...of (iteración)
    for (const producto of productosFiltrados) {
        // MANEJO DE CADENAS - Template literals con interpolación
        const productoHTML = `
            <div class="card producto-card">
                <div class="producto-imagen">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.src='https://via.placeholder.com/400x300?text=Sin+Imagen'">
                </div>
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <div class="producto-info">
                    <span class="producto-precio">S/ ${producto.precio.toFixed(2)}</span>
                </div>
                <button 
                    class="btn btn-agregar" 
                    onclick="agregarAlCarrito(${producto.id})"
                    ${producto.stock === 0 ? 'disabled' : ''}
                >
                    ${producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
                </button>
            </div>
        `;
        
        productosGrid.innerHTML += productoHTML;
    }
    
    // ESTRUCTURA CONDICIONAL
    if (productosFiltrados.length === 0) {
        productosGrid.innerHTML = '<p class="text-center">No se encontraron productos</p>';
    }
}

// Función para filtrar productos (evento onkeyup y onchange)
function filtrarProductos() {
    mostrarProductos();
}

// Función auxiliar para obtener productos filtrados
function obtenerProductosFiltrados() {
    const busqueda = document.getElementById('busqueda').value;
    const categoria = document.getElementById('categoria').value;
    
    // EXPRESIONES REGULARES - Búsqueda insensible a mayúsculas
    const regex = new RegExp(busqueda, 'i');
    
    // OPERADORES LÓGICOS Y ARROW FUNCTIONS
    return productos.filter(producto => {
        const coincideBusqueda = regex.test(producto.nombre);
        const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
        
        return coincideBusqueda && coincideCategoria;
    });
}

// ===========================
// FUNCIONES DEL CARRITO
// ===========================

// Función para agregar producto al carrito (evento onclick)
function agregarAlCarrito(idProducto) {
    // TRY-CATCH - Manejo de errores
    try {
        // MÉTODOS DE ARRAYS - find()
        const producto = productos.find(p => p.id === idProducto);
        
        // ESTRUCTURA CONDICIONAL
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        
        if (producto.stock <= 0) {
            throw new Error(`${producto.nombre} sin stock disponible`);
        }
        
        // Buscar si el producto ya existe en el carrito
        const itemExistente = carrito.find(item => item.id === idProducto);
        
        if (itemExistente) {
            // OPERADORES LÓGICOS
            if (itemExistente.cantidad >= producto.stock) {
                alert(`Stock máximo alcanzado para ${producto.nombre}`);
                return;
            }
            
            // OPERADORES CON ASIGNACIÓN
            itemExistente.cantidad += 1;
        } else {
            // SPREAD OPERATOR - Crear nuevo objeto
            carrito.push({ ...producto, cantidad: 1 });
        }
        
        // SALIDAS - console.log
        console.log(`Producto agregado: ${producto.nombre}`);
        console.log(`Total items en carrito: ${carrito.length}`);
        
        // Actualizar vista
        actualizarCarrito();
        
    } catch (error) {
        // SALIDAS - alert
        alert(error.message);
        console.error("Error:", error);
    }
}

// Función para actualizar la vista del carrito
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoCount = document.getElementById('carrito-count');
    
    // Actualizar contador
    carritoCount.textContent = carrito.length;
    
    // Actualizar título del documento
    document.title = `Campos (${carrito.length}) - Pollería`;
    
    // ESTRUCTURA CONDICIONAL
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="empty-cart">Carrito vacío</p>';
        ocultarSecciones();
        return;
    }
    
    // Mostrar secciones
    mostrarSecciones();
    
    // Limpiar contenido
    carritoItems.innerHTML = '';
    
    // ESTRUCTURA DE CONTROL - Bucle forEach
    carrito.forEach(item => {
        // OPERADORES MATEMÁTICOS
        const subtotal = item.precio * item.cantidad;
        
        // MANEJO DE CADENAS - Concatenación y template literals
        const itemHTML = `
            <div class="carrito-item">
                <div class="carrito-item-header">
                    <div class="carrito-item-nombre">${item.nombre}</div>
                    <div>
                        <span class="carrito-item-precio">S/ ${item.precio.toFixed(2)}</span>
                        <button class="btn-eliminar" onclick="eliminarDelCarrito(${item.id})">
                            🗑️
                        </button>
                    </div>
                </div>
                <div class="cantidad-controls">
                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, -1)">−</button>
                    <span class="cantidad-valor">${item.cantidad}</span>
                    <button class="btn-cantidad" onclick="cambiarCantidad(${item.id}, 1)">+</button>
                    <span class="item-subtotal">S/ ${subtotal.toFixed(2)}</span>
                </div>
            </div>
        `;
        
        carritoItems.innerHTML += itemHTML;
    });
    
    // Calcular totales
    calcularTotales();
}

// Función para cambiar cantidad (evento onclick)
function cambiarCantidad(idProducto, cambio) {
    // MÉTODOS DE ARRAYS - map()
    carrito = carrito.map(item => {
        if (item.id === idProducto) {
            // OPERADORES MATEMÁTICOS
            const nuevaCantidad = item.cantidad + cambio;
            
            // Validar rango
            if (nuevaCantidad > 0 && nuevaCantidad <= item.stock) {
                return { ...item, cantidad: nuevaCantidad };
            }
        }
        return item;
    });
    
    actualizarCarrito();
}

// Función para eliminar del carrito
function eliminarDelCarrito(idProducto) {
    // MÉTODOS DE ARRAYS - filter()
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}

// ===========================
// FUNCIONES DE CÁLCULO
// ===========================

function calcularSubtotal() {
    // MÉTODOS DE ARRAYS - reduce() con ARROW FUNCTION
    return carrito.reduce((acumulador, item) => {
        return acumulador + (item.precio * item.cantidad);
    }, 0);
}

function calcularDescuentoMonto() {
    const descuento = parseFloat(document.getElementById('descuento').value);
    const subtotal = calcularSubtotal();
    
    // OPERADORES MATEMÁTICOS
    return subtotal * descuento;
}

function calcularIGV() {
    // IGV ya está incluido en los precios
    return 0;
}

function calcularTotal() {
    const subtotal = calcularSubtotal();
    const descuento = calcularDescuentoMonto();
    let total = subtotal - descuento;
    
    // Agregar costo de delivery si aplica
    const mesa = document.getElementById('numero-mesa').value;
    if (mesa === 'delivery') {
        total += DELIVERY_PRECIO;
    }
    
    return total;
}

function calcularTotales() {
    const subtotal = calcularSubtotal();
    const descuentoMonto = calcularDescuentoMonto();
    const descuentoPorcentaje = parseFloat(document.getElementById('descuento').value);
    const mesa = document.getElementById('numero-mesa').value;
    const total = calcularTotal();
    
    // Actualizar DOM - SALIDAS document
    document.getElementById('subtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `S/ ${total.toFixed(2)}`;
    
    // Mostrar/ocultar descuento
    const descuentoItem = document.getElementById('descuento-item');
    if (descuentoPorcentaje > 0) {
        descuentoItem.style.display = 'flex';
        document.getElementById('desc-porcentaje').textContent = (descuentoPorcentaje * 100).toFixed(0);
        document.getElementById('descuento-monto').textContent = `- S/ ${descuentoMonto.toFixed(2)}`;
    } else {
        descuentoItem.style.display = 'none';
    }
    
    // Mostrar/ocultar costo de delivery
    const deliveryItem = document.getElementById('delivery-item');
    if (mesa === 'delivery') {
        deliveryItem.style.display = 'flex';
    } else {
        deliveryItem.style.display = 'none';
    }
}

// ===========================
// FUNCIONES DE UI
// ===========================

function mostrarSecciones() {
    document.getElementById('cliente-section').style.display = 'block';
    document.getElementById('pago-section').style.display = 'block';
    document.getElementById('descuento-section').style.display = 'block';
    document.getElementById('resumen-section').style.display = 'block';
    document.getElementById('botones-section').style.display = 'block';
}

function ocultarSecciones() {
    document.getElementById('cliente-section').style.display = 'none';
    document.getElementById('pago-section').style.display = 'none';
    document.getElementById('descuento-section').style.display = 'none';
    document.getElementById('resumen-section').style.display = 'none';
    document.getElementById('botones-section').style.display = 'none';
}

function validarCliente() {
    const nombre = document.getElementById('cliente-nombre').value;
    const telefono = document.getElementById('cliente-telefono').value;
    const mesa = document.getElementById('numero-mesa').value;
    
    return nombre.trim() !== '' && telefono.trim() !== '' && mesa !== '';
}

// ===========================
// GENERACIÓN DE NÚMERO DE ORDEN
// ===========================

function generarNumeroOrden() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    
    // OPERADORES DE DESPLAZAMIENTO DE BITS - Generar número aleatorio
    const numeroAleatorio = (Math.random() * 10000) | 0;
    
    // MANEJO DE CADENAS - Concatenación y métodos
    return `ORD-${año}${mes}${dia}-${numeroAleatorio}`;
}

// ===========================
// PROCESAMIENTO DE PEDIDO
// ===========================

function procesarPedido() {
    // TRY-CATCH
    try {
        // Validaciones
        if (carrito.length === 0) {
            throw new Error("El carrito está vacío");
        }
        
        if (!validarCliente()) {
            throw new Error("Por favor complete todos los datos requeridos: mesa, nombre y teléfono");
        }
        
        // Obtener datos del formulario
        const mesa = document.getElementById('numero-mesa').value;
        const cliente = {
            mesa: mesa,
            nombre: document.getElementById('cliente-nombre').value,
            telefono: document.getElementById('cliente-telefono').value,
            direccion: document.getElementById('cliente-direccion').value
        };
        
        const metodoPago = document.getElementById('metodo-pago').value;
        
        // OBJETOS EN JS - Crear objeto pedido
        const nuevoPedido = {
            numero: generarNumeroOrden(),
            fecha: new Date().toLocaleString('es-PE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            }),
            mesa: mesa === 'delivery' ? 'Delivery' : `Mesa ${mesa}`,
            cliente: { ...cliente },
            items: [...carrito],
            subtotal: calcularSubtotal(),
            descuento: calcularDescuentoMonto(),
            igv: calcularIGV(),
            total: calcularTotal(),
            metodoPago: metodoPago,
            estado: "pendiente"
        };
        
        // Agregar a array de pedidos
        pedidos.push(nuevoPedido);
        
        // NOTACIÓN JSON - Convertir a JSON para mostrar
        const pedidoJSON = JSON.stringify(nuevoPedido, null, 2);
        console.log("=== PEDIDO PROCESADO ===");
        console.log(pedidoJSON);
        
        // Actualizar stock de productos
        actualizarStock();
        
        // Mostrar resumen
        const mesaTexto = mesa === 'delivery' ? 'Delivery (+S/ 5.00)' : `Mesa ${mesa}`;
        const mensaje = `¡Pedido ${nuevoPedido.numero} registrado exitosamente!

${mesaTexto}
Cliente: ${cliente.nombre}
Total: S/ ${nuevoPedido.total.toFixed(2)}
Método de pago: ${metodoPago}

¡Gracias por su compra!`;
        
        alert(mensaje);
        
        // Limpiar carrito y formulario
        limpiarCarrito();
        
        // Mostrar historial
        mostrarHistorial();
        
    } catch (error) {
        alert(error.message);
        console.error("Error al procesar pedido:", error);
    }
}

function actualizarStock() {
    // MÉTODOS DE ARRAYS - map() y find()
    productos = productos.map(producto => {
        const itemCarrito = carrito.find(item => item.id === producto.id);
        
        if (itemCarrito) {
            // SPREAD OPERATOR
            return {
                ...producto,
                stock: producto.stock - itemCarrito.cantidad
            };
        }
        
        return producto;
    });
    
    // Actualizar vista de productos
    mostrarProductos();
}

function limpiarCarrito() {
    carrito = [];
    
    // Limpiar formulario
    document.getElementById('numero-mesa').value = '';
    document.getElementById('cliente-nombre').value = '';
    document.getElementById('cliente-telefono').value = '';
    document.getElementById('cliente-direccion').value = '';
    document.getElementById('descuento').value = '0';
    
    actualizarCarrito();
}

// ===========================
// HISTORIAL DE PEDIDOS
// ===========================

function mostrarHistorial() {
    if (pedidos.length === 0) {
        document.getElementById('historial-section').style.display = 'none';
        return;
    }
    
    document.getElementById('historial-section').style.display = 'block';
    
    const tbody = document.getElementById('pedidos-tbody');
    tbody.innerHTML = '';
    
    // ESTRUCTURA DE CONTROL - Bucle for tradicional
    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        
        const fila = `
            <tr>
                <td class="numero-orden">${pedido.numero}</td>
                <td><strong>${pedido.mesa}</strong></td>
                <td>${pedido.cliente.nombre}</td>
                <td>${pedido.fecha}</td>
                <td>${pedido.items.length}</td>
                <td class="total-pedido">S/ ${pedido.total.toFixed(2)}</td>
                <td style="text-transform: capitalize">${pedido.metodoPago}</td>
            </tr>
        `;
        
        tbody.innerHTML += fila;
    }
}

// ===========================
// ESTADÍSTICAS
// ===========================

function mostrarEstadisticas() {
    console.clear();
    console.log("=== ESTADÍSTICAS DE LA POLLERÍA ===");
    console.log("");
    
    // ARREGLOS BIDIMENSIONALES
    const estadisticas = [
        ["Métrica", "Valor"],
        ["Total Productos", productos.length],
        ["Total Pedidos", pedidos.length],
        ["Items en Carrito", carrito.length],
        ["Stock Total", calcularStockTotal()],
        ["Ventas Totales", `S/ ${calcularVentasTotales().toFixed(2)}`]
    ];
    
    // SALIDA - console.table
    console.table(estadisticas);
    
    console.log("");
    console.log("=== PRODUCTOS POR CATEGORÍA ===");
    
    // COLECCIONES - Agrupar por categoría
    const productosPorCategoria = agruparPorCategoria();
    console.log(productosPorCategoria);
    
    console.log("");
    console.log("=== TOP 3 PRODUCTOS MÁS VENDIDOS ===");
    const topProductos = obtenerTopProductos();
    console.table(topProductos);
    
    alert("Estadísticas mostradas en la consola (F12)");
}

function calcularStockTotal() {
    // MÉTODOS DE ARRAYS - reduce()
    return productos.reduce((total, producto) => total + producto.stock, 0);
}

function calcularVentasTotales() {
    return pedidos.reduce((total, pedido) => total + pedido.total, 0);
}

function agruparPorCategoria() {
    const grupos = {};
    
    // ESTRUCTURA DE CONTROL - for...of
    for (const producto of productos) {
        if (!grupos[producto.categoria]) {
            grupos[producto.categoria] = [];
        }
        
        grupos[producto.categoria].push(producto.nombre);
    }
    
    return grupos;
}

function obtenerTopProductos() {
    // Contar ventas por producto
    const ventasPorProducto = {};
    
    pedidos.forEach(pedido => {
        pedido.items.forEach(item => {
            if (!ventasPorProducto[item.nombre]) {
                ventasPorProducto[item.nombre] = 0;
            }
            ventasPorProducto[item.nombre] += item.cantidad;
        });
    });
    
    // Convertir a array y ordenar
    const productosArray = Object.entries(ventasPorProducto)
        .map(([nombre, cantidad]) => ({ nombre, cantidad }))
        .sort((a, b) => b.cantidad - a.cantidad)
        .slice(0, 3);
    
    return productosArray;
}

// ===========================
// FUNCIONES MATEMÁTICAS ADICIONALES
// ===========================

// BigInt - Ejemplo de uso (números muy grandes)
function ejemploBigInt() {
    const numeroGrande = BigInt("999999999999999999");
    const resultado = numeroGrande * 2n;
    
    console.log("Ejemplo BigInt:", resultado);
}

// PROPIEDADES Y MÉTODOS MATEMÁTICOS
function ejemplosMatematicos() {
    console.log("=== EJEMPLOS MATEMÁTICOS ===");
    console.log("Math.PI:", Math.PI);
    console.log("Math.E:", Math.E);
    console.log("Math.round(4.7):", Math.round(4.7));
    console.log("Math.ceil(4.2):", Math.ceil(4.2));
    console.log("Math.floor(4.9):", Math.floor(4.9));
    console.log("Math.random():", Math.random());
    console.log("Math.max(5, 10, 15):", Math.max(5, 10, 15));
    console.log("Math.min(5, 10, 15):", Math.min(5, 10, 15));
    console.log("Math.pow(2, 3):", Math.pow(2, 3));
    console.log("Math.sqrt(16):", Math.sqrt(16));
}
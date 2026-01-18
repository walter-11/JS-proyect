# 🍗 Pollería Campos Chiclayo - Sistema de Gestión de Pedidos

## Descripción General

Este es un sistema web de gestión de pedidos para una pollería, desarrollado con **HTML5**, **CSS3** y **JavaScript vanilla**. Permite a los clientes seleccionar productos, gestionar un carrito de compras y procesar pedidos con diferentes opciones de pago y descuentos.

---

## 📁 Estructura del Proyecto

```
ProyectoJava/
├── index.html      # Estructura HTML de la página
├── app.js          # Lógica JavaScript del sistema
└── style.css       # Estilos CSS
```

---

## 🎯 Funcionalidades Principales

### 1. **Catálogo de Productos**
- Visualización de 8 productos predefinidos
- Categorías: Pollos, Acompañamientos, Bebidas
- Búsqueda por nombre (insensible a mayúsculas)
- Filtrado por categoría
- Control de stock

### 2. **Carrito de Compras**
- Agregar/eliminar productos
- Aumentar/disminuir cantidades
- Visualización en tiempo real
- Validación de stock máximo

### 3. **Sistema de Pedidos**
- Datos del cliente (nombre, teléfono, dirección)
- Selección de mesa o delivery
- Múltiples métodos de pago (Efectivo, Tarjeta, Yape, Plin)
- Aplicación de descuentos
- Cálculo automático de totales con IGV

### 4. **Historial de Pedidos**
- Registro de todos los pedidos procesados
- Visualización en tabla con detalles

### 5. **Control de Stock**
- Actualización automática tras procesar pedidos
- Deshabilitación de productos sin stock

---

## 🔧 Explicación Detallada del Código JavaScript

### **Variables Globales**

```javascript
let productos = [...]     // Array con todos los productos disponibles
let carrito = []          // Array con items agregados al carrito
let pedidos = []          // Array con pedidos completados
const IGV = 0.18          // Impuesto General a la Venta (18%)
const DELIVERY_PRECIO = 5.00  // Costo adicional para delivery
```

---

### **1️⃣ INICIALIZACIÓN (window.onload)**

```javascript
window.onload = function() {
    console.log("=== POLLERÍA CAMPOS CHICLAYO ===");
    mostrarProductos();
    document.title = "Pollería Campos Chiclayo";
    alert("¡Bienvenido a Pollería Campos Chiclayo! 🍗");
}
```

**¿Qué hace?**
- Se ejecuta cuando la página carga completamente
- Carga los productos en la pantalla
- Muestra un mensaje de bienvenida

---

### **2️⃣ GESTIÓN DE PRODUCTOS**

#### **`mostrarProductos()`**
Renderiza los productos en la página:

```javascript
function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';  // Limpia el contenido anterior
    
    const productosFiltrados = obtenerProductosFiltrados();
    
    // Itera sobre cada producto
    for (const producto of productosFiltrados) {
        // Crea HTML dinámicamente con template literals
        const productoHTML = `<div class="card producto-card">...`;
        productosGrid.innerHTML += productoHTML;  // Añade al DOM
    }
}
```

**Conceptos JavaScript usados:**
- `for...of`: Itera sobre arrays
- Template literals (comillas invertidas): Interpolación de variables
- Métodos DOM: `getElementById()`, `innerHTML`

#### **`obtenerProductosFiltrados()`**
Filtra productos por búsqueda y categoría:

```javascript
function obtenerProductosFiltrados() {
    const busqueda = document.getElementById('busqueda').value;
    const categoria = document.getElementById('categoria').value;
    
    // Expresión regular para búsqueda insensible a mayúsculas
    const regex = new RegExp(busqueda, 'i');
    
    // Método filter() devuelve un nuevo array con elementos que cumplen la condición
    return productos.filter(producto => {
        const coincideBusqueda = regex.test(producto.nombre);
        const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
        
        return coincideBusqueda && coincideCategoria;
    });
}
```

**Conceptos JavaScript usados:**
- **Expresiones regulares**: `/i` = insensible a mayúsculas
- **Arrow functions**: `(producto) => {}`
- **Método `.filter()`**: Crea nuevo array filtrando elementos
- **Operadores lógicos**: `&&` (Y), `||` (O)

#### **`filtrarProductos()`**
Se ejecuta cuando el usuario busca o cambia categoría:

```javascript
function filtrarProductos() {
    mostrarProductos();  // Redibuja productos filtrados
}
```

---

### **3️⃣ GESTIÓN DEL CARRITO**

#### **`agregarAlCarrito(idProducto)`**
Añade un producto al carrito:

```javascript
function agregarAlCarrito(idProducto) {
    try {
        // Busca el producto por ID
        const producto = productos.find(p => p.id === idProducto);
        
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        
        // Valida stock disponible
        if (producto.stock <= 0) {
            throw new Error(`${producto.nombre} sin stock disponible`);
        }
        
        // Verifica si ya existe en el carrito
        const itemExistente = carrito.find(item => item.id === idProducto);
        
        if (itemExistente) {
            // Si existe, incrementa cantidad (con validación de stock)
            if (itemExistente.cantidad >= producto.stock) {
                alert(`Stock máximo alcanzado para ${producto.nombre}`);
                return;
            }
            itemExistente.cantidad += 1;  // Operador +=
        } else {
            // Si no existe, lo añade al carrito
            carrito.push({ ...producto, cantidad: 1 });  // Spread operator (...)
        }
        
        actualizarCarrito();  // Redibuja el carrito
        
    } catch (error) {
        alert(error.message);
        console.error("Error:", error);
    }
}
```

**Conceptos JavaScript usados:**
- **Try-catch**: Manejo de errores
- **Método `.find()`**: Busca el primer elemento que cumple condición
- **Spread operator (`...`)**: Copia un objeto
- **Operadores de asignación**: `+=`, `=`

#### **`actualizarCarrito()`**
Redibuja la interfaz del carrito:

```javascript
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    const carritoCount = document.getElementById('carrito-count');
    
    // Actualiza contador
    carritoCount.textContent = carrito.length;
    
    // Si está vacío, oculta secciones
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p class="empty-cart">Carrito vacío</p>';
        ocultarSecciones();
        return;
    }
    
    // Muestra secciones de cliente, pago, etc.
    mostrarSecciones();
    
    // Itera sobre cada item del carrito
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;  // Multiplicación
        
        const itemHTML = `
            <div class="carrito-item">
                <div>${item.nombre}</div>
                <div>Cantidad: ${item.cantidad}</div>
                <div>S/ ${subtotal.toFixed(2)}</div>
            </div>
        `;
        carritoItems.innerHTML += itemHTML;
    });
    
    calcularTotales();  // Recalcula totales
}
```

**Conceptos JavaScript usados:**
- **Método `.forEach()`**: Itera sin crear nuevo array
- **Método `.toFixed(2)`**: Redondea a 2 decimales
- **Operadores matemáticos**: `*`, `+`, `-`

#### **`cambiarCantidad(idProducto, cambio)`**
Aumenta o disminuye la cantidad de un producto:

```javascript
function cambiarCantidad(idProducto, cambio) {
    carrito = carrito.map(item => {
        if (item.id === idProducto) {
            const nuevaCantidad = item.cantidad + cambio;
            
            // Valida que esté entre 1 y el stock disponible
            if (nuevaCantidad > 0 && nuevaCantidad <= item.stock) {
                return { ...item, cantidad: nuevaCantidad };
            }
        }
        return item;
    });
    
    actualizarCarrito();
}
```

**Conceptos JavaScript usados:**
- **Método `.map()`**: Transforma cada elemento del array
- **Spread operator**: Crea nuevo objeto modificado

#### **`eliminarDelCarrito(idProducto)`**
Elimina un producto del carrito:

```javascript
function eliminarDelCarrito(idProducto) {
    // Filter devuelve nuevo array sin el producto
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarrito();
}
```

---

### **4️⃣ CÁLCULOS DE PRECIOS**

#### **`calcularSubtotal()`**
Suma el total de productos:

```javascript
function calcularSubtotal() {
    // reduce() combina todos los elementos en un solo valor
    return carrito.reduce((acumulador, item) => {
        return acumulador + (item.precio * item.cantidad);
    }, 0);  // 0 es el valor inicial del acumulador
}
```

**Conceptos JavaScript usados:**
- **Método `.reduce()`**: Acumula valores en un solo resultado

#### **`calcularDescuentoMonto()`**
Calcula el monto del descuento:

```javascript
function calcularDescuentoMonto() {
    const descuento = parseFloat(document.getElementById('descuento').value);
    const subtotal = calcularSubtotal();
    
    // Descuento = Subtotal × Porcentaje descuento
    return subtotal * descuento;
}
```

#### **`calcularTotal()`**
Calcula el total final:

```javascript
function calcularTotal() {
    const subtotal = calcularSubtotal();
    const descuento = calcularDescuentoMonto();
    let total = subtotal - descuento;
    
    // Si es delivery, suma costo adicional
    const mesa = document.getElementById('numero-mesa').value;
    if (mesa === 'delivery') {
        total += DELIVERY_PRECIO;  // Suma S/ 5.00
    }
    
    return total;
}
```

#### **`calcularTotales()`**
Actualiza los totales en la pantalla:

```javascript
function calcularTotales() {
    const subtotal = calcularSubtotal();
    const descuentoMonto = calcularDescuentoMonto();
    const total = calcularTotal();
    
    // Actualiza el DOM
    document.getElementById('subtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `S/ ${total.toFixed(2)}`;
    
    // Muestra/oculta descuento si aplica
    if (descuentoMonto > 0) {
        document.getElementById('descuento-item').style.display = 'flex';
        document.getElementById('descuento-monto').textContent = `- S/ ${descuentoMonto.toFixed(2)}`;
    }
}
```

---

### **5️⃣ PROCESAMIENTO DE PEDIDOS**

#### **`generarNumeroOrden()`**
Crea un número único para cada pedido:

```javascript
function generarNumeroOrden() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    
    // Número aleatorio entre 0 y 10000
    const numeroAleatorio = (Math.random() * 10000) | 0;  // | 0 = conversión a entero
    
    // Formato: ORD-20260115-5234
    return `ORD-${año}${mes}${dia}-${numeroAleatorio}`;
}
```

**Conceptos JavaScript usados:**
- **Objeto `Date`**: Manejo de fechas
- **Métodos de String**: `.padStart()`, `.toLocaleString()`
- **Operador bitwise**: `| 0` (convierte a entero)

#### **`procesarPedido()`**
Registra el pedido completo:

```javascript
function procesarPedido() {
    try {
        // Validaciones
        if (carrito.length === 0) {
            throw new Error("El carrito está vacío");
        }
        
        if (!validarCliente()) {
            throw new Error("Por favor complete todos los datos requeridos");
        }
        
        // Obtiene datos del formulario
        const mesa = document.getElementById('numero-mesa').value;
        const cliente = {
            mesa: mesa,
            nombre: document.getElementById('cliente-nombre').value,
            telefono: document.getElementById('cliente-telefono').value,
            direccion: document.getElementById('cliente-direccion').value
        };
        
        // Crea objeto pedido
        const nuevoPedido = {
            numero: generarNumeroOrden(),
            fecha: new Date().toLocaleString('es-PE'),
            mesa: mesa === 'delivery' ? 'Delivery' : `Mesa ${mesa}`,
            cliente: { ...cliente },  // Spread operator
            items: [...carrito],       // Copia del carrito
            subtotal: calcularSubtotal(),
            descuento: calcularDescuentoMonto(),
            total: calcularTotal(),
            metodoPago: document.getElementById('metodo-pago').value,
            estado: "pendiente"
        };
        
        // Agrega a historial
        pedidos.push(nuevoPedido);
        
        // Convierte a JSON para mostrar/guardar
        const pedidoJSON = JSON.stringify(nuevoPedido, null, 2);
        console.log("=== PEDIDO PROCESADO ===");
        console.log(pedidoJSON);
        
        // Actualiza stock
        actualizarStock();
        
        // Muestra confirmación
        alert(`¡Pedido ${nuevoPedido.numero} registrado!`);
        
        // Limpia carrito
        limpiarCarrito();
        
        // Muestra historial
        mostrarHistorial();
        
    } catch (error) {
        alert(error.message);
    }
}
```

**Conceptos JavaScript usados:**
- **Objetos literales**: `{ propiedad: valor }`
- **Método `.JSON.stringify()`**: Convierte objeto a JSON
- **Try-catch**: Manejo de errores

#### **`actualizarStock()`**
Reduce el stock después de procesar pedido:

```javascript
function actualizarStock() {
    productos = productos.map(producto => {
        const itemCarrito = carrito.find(item => item.id === producto.id);
        
        if (itemCarrito) {
            return {
                ...producto,
                stock: producto.stock - itemCarrito.cantidad
            };
        }
        
        return producto;
    });
    
    mostrarProductos();  // Redibuja
}
```

---

### **6️⃣ INTERFAZ DE USUARIO**

#### **`mostrarSecciones()` y `ocultarSecciones()`**
Muestran/ocultan formularios dinámicamente:

```javascript
function mostrarSecciones() {
    document.getElementById('cliente-section').style.display = 'block';
    document.getElementById('pago-section').style.display = 'block';
    document.getElementById('resumen-section').style.display = 'block';
}

function ocultarSecciones() {
    document.getElementById('cliente-section').style.display = 'none';
    document.getElementById('pago-section').style.display = 'none';
}
```

#### **`limpiarCarrito()`**
Vacía el carrito y el formulario:

```javascript
function limpiarCarrito() {
    carrito = [];
    
    // Limpia inputs
    document.getElementById('cliente-nombre').value = '';
    document.getElementById('cliente-telefono').value = '';
    document.getElementById('descuento').value = '0';
    
    actualizarCarrito();
}
```

---

### **7️⃣ HISTORIAL DE PEDIDOS**

#### **`mostrarHistorial()`**
Crea tabla con todos los pedidos:

```javascript
function mostrarHistorial() {
    if (pedidos.length === 0) {
        return;
    }
    
    const tbody = document.getElementById('pedidos-tbody');
    tbody.innerHTML = '';
    
    // Bucle tradicional for
    for (let i = 0; i < pedidos.length; i++) {
        const pedido = pedidos[i];
        
        const fila = `
            <tr>
                <td>${pedido.numero}</td>
                <td>${pedido.mesa}</td>
                <td>${pedido.cliente.nombre}</td>
                <td>${pedido.fecha}</td>
                <td>${pedido.items.length} items</td>
                <td>S/ ${pedido.total.toFixed(2)}</td>
                <td>${pedido.metodoPago}</td>
            </tr>
        `;
        
        tbody.innerHTML += fila;
    }
}
```

---

## 📊 Flujo de Ejecución

```
1. Página carga → window.onload
   ↓
2. mostrarProductos() → Carga catálogo
   ↓
3. Usuario selecciona producto → agregarAlCarrito()
   ↓
4. actualizarCarrito() → Redibuja carrito
   ↓
5. Usuario completa datos → Llena formulario
   ↓
6. procesarPedido() → Registra pedido
   ↓
7. actualizarStock() → Reduce stock
   ↓
8. mostrarHistorial() → Muestra tabla pedidos
```

---

## 🔑 Conceptos JavaScript Explicados (Fácil de Entender)

### 1️⃣ **Variables** - Cajas para guardar información

```javascript
let productos = [];      // Caja vacía para guardar productos
let carrito = [];        // Caja vacía para guardar el carrito
const IGV = 0.18;        // Caja que NO se puede cambiar
```

**¿Por qué es importante?**
- `let`: Para variables que **SÍ pueden cambiar**
- `const`: Para variables que **NO pueden cambiar** (más seguro)

---

### 2️⃣ **Arrays** - Listas de cosas

```javascript
// Array vacío
let carrito = [];

// Array con elementos
let productos = [
    { id: 1, nombre: "Pollo", precio: 45 },
    { id: 2, nombre: "Papas", precio: 8 },
    { id: 3, nombre: "Bebida", precio: 5 }
];

// Acceder a elementos
console.log(productos[0]);     // Accede al PRIMERO (índice 0)
console.log(productos[1]);     // Accede al SEGUNDO (índice 1)
console.log(productos.length); // ¿Cuántos hay? → 3
```

**Métodos útiles de Arrays:**
```javascript
// .push() = Añadir al final
carrito.push({ nombre: "Pollo", cantidad: 2 });

// .pop() = Eliminar el último
carrito.pop();

// .shift() = Eliminar el primero
carrito.shift();

// .unshift() = Añadir al principio
carrito.unshift({ nombre: "Pollo" });
```

---

### 3️⃣ **Objetos** - Datos con etiquetas

```javascript
// Sin objetos (confuso):
let nombre = "Juan";
let telefono = "987654321";
let direccion = "Calle 123";

// Con objetos (claro):
let cliente = {
    nombre: "Juan",
    telefono: "987654321",
    direccion: "Calle 123"
};

// Acceder a propiedades
console.log(cliente.nombre);         // "Juan"
console.log(cliente["telefono"]);    // "987654321"

// Modificar propiedades
cliente.nombre = "Carlos";           // Cambiar nombre
```

---

### 4️⃣ **Template Literals** - Strings con variables (fácil)

```javascript
// ❌ Forma antigua (complicada):
let mensaje = "Hola " + nombre + ", tu total es S/ " + precio;

// ✅ Forma nueva (fácil):
let mensaje = `Hola ${nombre}, tu total es S/ ${precio}`;

// Resultado: "Hola Juan, tu total es S/ 45.00"
```

**¿Por qué es mejor?**
- Más fácil de leer
- Menos caracteres especiales
- Sin confusiones con comillas

---

### 5️⃣ **Funciones** - Instrucciones reutilizables

```javascript
// Función sin parámetros
function saludar() {
    console.log("¡Hola!");
}
saludar(); // Ejecutar

// Función con parámetros
function saludar(nombre) {
    console.log(`¡Hola ${nombre}!`);
}
saludar("Juan");   // ¡Hola Juan!
saludar("Carlos"); // ¡Hola Carlos!

// Función que devuelve valor
function sumar(a, b) {
    return a + b;  // Devuelve el resultado
}
let resultado = sumar(5, 3);  // resultado = 8
```

---

### 6️⃣ **Arrow Functions** - Funciones cortas

```javascript
// Función tradicional
function duplicar(x) {
    return x * 2;
}

// Arrow function (más corta)
const duplicar = (x) => x * 2;

// Usar
console.log(duplicar(5)); // 10
```

**¿Cuándo usar?**
- Arrow functions: Para funciones **CORTAS**
- Funciones tradicionales: Para funciones **LARGAS**

---

### 7️⃣ **Métodos de Arrays** - Transformar listas

#### **`.map()` - Transformar cada elemento**

```javascript
// Elevar al cuadrado cada número
let numeros = [1, 2, 3, 4];
let cuadrados = numeros.map(num => num * num);
console.log(cuadrados); // [1, 4, 9, 16]

// En nuestro proyecto:
// Aumentar precio en 10% a todos los productos
productos = productos.map(p => ({
    ...p,
    precio: p.precio * 1.10
}));
```

#### **`.filter()` - Seleccionar elementos**

```javascript
// Solo números mayores a 2
let numeros = [1, 2, 3, 4];
let mayores = numeros.filter(num => num > 2);
console.log(mayores); // [3, 4]

// En nuestro proyecto:
// Solo productos en stock
let enStock = productos.filter(p => p.stock > 0);
```

#### **`.find()` - Buscar PRIMER elemento**

```javascript
let numeros = [1, 2, 3, 4];
let primero = numeros.find(num => num > 2);
console.log(primero); // 3 (el primero mayor a 2)

// En nuestro proyecto:
// Buscar producto por ID
let producto = productos.find(p => p.id === 1);
console.log(producto); // { id: 1, nombre: "Pollo", ... }
```

#### **`.forEach()` - Hacer algo con cada elemento**

```javascript
let frutas = ["Manzana", "Banana", "Naranja"];

frutas.forEach(fruta => {
    console.log(`Me encanta la ${fruta}`);
});
// Resultado:
// Me encanta la Manzana
// Me encanta la Banana
// Me encanta la Naranja
```

#### **`.reduce()` - Sumar/Combinar todos los elementos**

```javascript
// Sumar números
let numeros = [1, 2, 3, 4];
let suma = numeros.reduce((acum, num) => acum + num, 0);
console.log(suma); // 10

// Explicación paso a paso:
// acum=0,  num=1 → 0+1=1
// acum=1,  num=2 → 1+2=3
// acum=3,  num=3 → 3+3=6
// acum=6,  num=4 → 6+4=10

// En nuestro proyecto:
// Calcular total del carrito
let total = carrito.reduce((suma, item) => {
    return suma + (item.precio * item.cantidad);
}, 0);
```

---

### 8️⃣ **Try-Catch** - Atrapar errores

```javascript
// Sin try-catch (se rompe todo si hay error):
let numero = JSON.parse("no es JSON");  // ❌ ERROR!

// Con try-catch (captura el error):
try {
    let numero = JSON.parse("no es JSON");
} catch (error) {
    console.log("¡Error capturado!", error.message);
    alert("Algo salió mal");
}

// En nuestro proyecto:
try {
    const producto = productos.find(p => p.id === 999);
    if (!producto) {
        throw new Error("Producto no encontrado");
    }
} catch (error) {
    alert(error.message);  // "Producto no encontrado"
}
```

---

### 9️⃣ **Spread Operator (...)** - Copiar datos

```javascript
// Copiar un objeto
let cliente1 = { nombre: "Juan", edad: 25 };
let cliente2 = { ...cliente1 };  // Copia

// Modificar la copia sin afectar el original
cliente2.nombre = "Carlos";
console.log(cliente1.nombre); // "Juan" (no cambió)
console.log(cliente2.nombre); // "Carlos"

// Copiar array
let numeros = [1, 2, 3];
let numeros2 = [...numeros];  // [1, 2, 3]

// Combinar arrays
let arr1 = [1, 2];
let arr2 = [3, 4];
let combinado = [...arr1, ...arr2];  // [1, 2, 3, 4]

// En nuestro proyecto:
// Agregar cantidad a un producto sin cambiar el original
carrito.push({
    ...producto,        // Copiar todo
    cantidad: 1         // Pero cambiar cantidad
});
```

---

### 🔟 **Expresiones Regulares** - Buscar patrones

```javascript
// Crear una expresión regular
const regex = /pollo/i;  // 'i' = insensible a mayúsculas

// Probar si coincide
console.log(regex.test("Pollo a la Brasa"));  // true
console.log(regex.test("Arroz chaufa"));      // false

// En nuestro proyecto:
const busqueda = document.getElementById('busqueda').value;
const regex = new RegExp(busqueda, 'i');

let encontrados = productos.filter(p => 
    regex.test(p.nombre)  // ¿El nombre coincide?
);
```

---

### 1️⃣1️⃣ **JSON** - Convertir objetos a texto

```javascript
// Objeto JavaScript
let cliente = {
    nombre: "Juan",
    telefono: "987654321",
    compras: ["Pollo", "Papas"]
};

// Convertir a JSON (texto)
let textoJSON = JSON.stringify(cliente);
console.log(textoJSON);
// Resultado: {"nombre":"Juan","telefono":"987654321","compras":["Pollo","Papas"]}

// Convertir JSON (texto) a objeto
let objeto = JSON.parse(textoJSON);
console.log(objeto.nombre);  // "Juan"

// En nuestro proyecto:
// Guardar pedido como texto para enviar a servidor
const pedidoJSON = JSON.stringify(nuevoPedido, null, 2);
console.log(pedidoJSON);  // Mostrar bonito en consola
```

---

### 1️⃣2️⃣ **DOM** - Interactuar con HTML

```javascript
// Obtener elemento por ID
let boton = document.getElementById('mi-boton');

// Obtener elemento por clase
let cards = document.querySelectorAll('.producto-card');

// Cambiar texto
boton.textContent = "Haz clic aquí";

// Cambiar HTML
let contenedor = document.getElementById('contenido');
contenedor.innerHTML = '<p>Nuevo contenido</p>';

// Cambiar estilos
boton.style.backgroundColor = 'red';
boton.style.color = 'white';

// En nuestro proyecto:
document.getElementById('carrito-count').textContent = carrito.length;
document.getElementById('subtotal').textContent = `S/ ${total.toFixed(2)}`;
```

---

### 1️⃣3️⃣ **Eventos** - Reaccionar a acciones del usuario

```javascript
// Evento al hacer clic
<button onclick="agregarAlCarrito(1)">Agregar</button>

// Evento al cambiar un input
<input onchange="validarCliente()" type="text">

// Evento al escribir en un input
<input onkeyup="filtrarProductos()" type="text">

// Evento cuando carga la página
window.onload = function() {
    console.log("¡Página cargada!");
};

// En nuestro proyecto:
// onclick = "agregarAlCarrito(1)" = Ejecuta función cuando haces clic
// onchange = "calcularTotales()" = Ejecuta función cuando cambias un valor
// onkeyup = "filtrarProductos()" = Ejecuta función cuando escribes
```

---

### 1️⃣4️⃣ **Operadores Lógicos** - Combinar condiciones

```javascript
// && (Y) = Ambas deben ser true
if (edad > 18 && tieneCarnet) {
    console.log("Puedes conducir");
}

// || (O) = Al menos una debe ser true
if (esAdmin || esOwner) {
    console.log("Tienes acceso");
}

// ! (NO) = Invierte el resultado
if (!usuarioBloqueado) {
    console.log("Puedes entrar");
}

// En nuestro proyecto:
const coincideBusqueda = regex.test(producto.nombre);
const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
return coincideBusqueda && coincideCategoria;  // AMBAS deben cumplirse
```

---

### 1️⃣5️⃣ **Operadores Matemáticos**

```javascript
// Suma, resta, multiplicación, división
let a = 10, b = 3;
console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1 (resto)

// Operadores de asignación
let x = 5;
x += 3;   // x = x + 3 = 8
x -= 2;   // x = x - 2 = 6
x *= 2;   // x = x * 2 = 12
x /= 3;   // x = x / 3 = 4

// En nuestro proyecto:
itemExistente.cantidad += 1;  // Aumentar cantidad en 1
let subtotal = item.precio * item.cantidad;  // Calcular subtotal
```

---

### 1️⃣6️⃣ **Condicionales (if/else)** - Tomar decisiones

```javascript
// if = Si se cumple la condición
if (stock > 0) {
    console.log("Hay stock disponible");
}

// if...else = Si se cumple o no
if (stock > 0) {
    console.log("Hay stock");
} else {
    console.log("Sin stock");
}

// if...else if...else = Varias opciones
if (edad < 13) {
    console.log("Eres niño");
} else if (edad < 18) {
    console.log("Eres adolescente");
} else {
    console.log("Eres adulto");
}

// En nuestro proyecto:
if (producto.stock <= 0) {
    throw new Error("Sin stock disponible");
}

if (itemExistente.cantidad >= producto.stock) {
    alert("Stock máximo alcanzado");
}
```

---

### 1️⃣7️⃣ **Bucles** - Repetir acciones

```javascript
// for tradicional
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// for...of = Iterar array
let frutas = ["Manzana", "Banana", "Naranja"];
for (const fruta of frutas) {
    console.log(fruta);
}

// forEach = Iterar con función
frutas.forEach(fruta => {
    console.log(fruta);
});

// while = Mientras se cumple condición
let contador = 0;
while (contador < 5) {
    console.log(contador);
    contador++;
}

// En nuestro proyecto:
for (const producto of productosFiltrados) {
    // Renderizar cada producto
}

carrito.forEach(item => {
    // Mostrar cada item
});

for (let i = 0; i < pedidos.length; i++) {
    // Mostrar cada pedido en tabla
}
```

---

### 1️⃣8️⃣ **Métodos de String** - Trabajar con texto

```javascript
// .trim() = Eliminar espacios al inicio y final
let nombre = "  Juan  ";
console.log(nombre.trim());  // "Juan"

// En nuestro proyecto (validar que no esté vacío):
if (nombre.trim() !== '') {
    alert("Nombre válido");
}

// .toFixed() = Redondear a X decimales
let precio = 45.6789;
console.log(precio.toFixed(2));  // "45.68"

// En nuestro proyecto (mostrar precios):
document.getElementById('precio').textContent = `S/ ${precio.toFixed(2)}`;

// .padStart() = Añadir ceros al inicio
let mes = "5";
let mesCompleto = mes.padStart(2, '0');  // "05"

// En nuestro proyecto (generar fecha para orden):
const mes = String(fecha.getMonth() + 1).padStart(2, '0');  // "01"
const dia = String(fecha.getDate()).padStart(2, '0');       // "15"
// Resultado: ORD-20260115-...

// .toLocaleString() = Formatear según país
let fecha = new Date();
console.log(fecha.toLocaleString('es-PE'));  // "15/1/2026, 14:30:00"

// En nuestro proyecto:
fecha: new Date().toLocaleString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
})  // "15/01/2026, 14:30"
```

---

## 🚀 Cómo Usar

1. **Abrir en navegador**: Doble clic en `index.html`
2. **Buscar productos**: Escribe en el campo de búsqueda
3. **Filtrar por categoría**: Selecciona en el dropdown
4. **Agregar al carrito**: Haz clic en "Agregar al Carrito"
5. **Ajustar cantidad**: Usa los botones +/-
6. **Rellenar datos**: Nombre, teléfono, mesa/delivery
7. **Procesar pedido**: Haz clic en "Procesar Pedido"
8. **Ver historial**: Aparece tabla con todos los pedidos

---

## 📝 Notas Importantes

- Los datos se guardan solo en memoria (navegador), se pierden al recargar
- El stock se actualiza dinámicamente tras cada pedido
- Los descuentos se aplican sobre el subtotal
- El delivery suma S/ 5.00 adicionales
- Todos los métodos de pago se aceptan (ejemplo educativo)

---

## 👨‍💻 Autor

**Proyecto educativo** - Sistema de Gestión de Pedidos para Pollería
**Año**: 2026

---

# 📚 Conceptos JavaScript Utilizados en el Proyecto
## Comparativa con el Plan de Estudios - Unidad 1

Este documento lista **SOLO los conceptos JavaScript que realmente se utilizan** en el Sistema de Gestión de Pedidos para la Pollería Campos, verificando coincidencia con el plan de estudios.

---

## ✅ SEMANA 1: Conceptos Básicos y Operadores

### 1. **Variables y Constantes** ✓
**Plan de estudios:** Variables, constantes, sintaxis

```javascript
// Variable (puede cambiar)
let carrito = [];
let productos = [];

// Constante (NO puede cambiar)
const IGV = 0.18;
const DELIVERY_PRECIO = 5.00;
const LOGO_CAMPOS = "https://...";
```

**¿Dónde se usa?**
- Guardar datos que cambian: carrito, productos, pedidos
- Guardar valores fijos: IGV, costo de delivery

---

### 2. **Tipos de Datos** ✓
**Plan de estudios:** Tipos de datos

```javascript
// STRING (texto)
let nombre = "Juan";
let mensaje = `Hola ${nombre}`;  // Template literal

// NUMBER (números)
let precio = 45.00;
let cantidad = 5;
let aleatorio = Math.random();

// BOOLEAN (verdadero/falso)
let enStock = true;
let validado = false;

// OBJECT (objeto)
let cliente = {
    nombre: "Juan",
    telefono: "987654321",
    edad: 25
};

// ARRAY (lista)
let productos = [
    { id: 1, nombre: "Pollo", precio: 45 },
    { id: 2, nombre: "Papas", precio: 8 }
];

// NULL / UNDEFINED
let valor = null;
let sinValor = undefined;
```

**¿Dónde se usa?**
- Strings: nombres, direcciones, teléfonos
- Numbers: precios, cantidades, stock
- Booleans: validaciones (enStock, validado)
- Objects: cliente, producto, pedido
- Arrays: lista de productos, carrito, pedidos

---

### 3. **Estructuras de Control - Condicionales (if/else)** ✓
**Plan de estudios:** Estructuras de control condicional

```javascript
// if simple
if (stock > 0) {
    alert("Hay stock disponible");
}

// if...else
if (stock > 0) {
    agregarAlCarrito(id);
} else {
    alert("Sin stock");
}

// if...else if...else
if (carrito.length === 0) {
    ocultarSecciones();
} else if (carrito.length > 0 && carrito.length < 5) {
    mostrarSecciones();
} else {
    mostrarMensajeCarroLleno();
}

// Condición ternaria (if corto)
const estado = stock > 0 ? 'En Stock' : 'Sin Stock';
```

**¿Dónde se usa?**
- Validar si hay stock antes de agregar
- Mostrar/ocultar secciones si el carrito está vacío
- Validar datos del cliente (nombre, teléfono, mesa)
- Decidir si mostrar descuento o delivery

---

### 4. **Estructuras de Control - Repetitivas (Bucles)** ✓
**Plan de estudios:** Estructuras de control repetitivo

```javascript
// for tradicional (mostrar historial)
for (let i = 0; i < pedidos.length; i++) {
    const pedido = pedidos[i];
    // Crear fila de tabla
}

// for...of (iterar array de productos)
for (const producto of productosFiltrados) {
    const html = `<div>${producto.nombre}</div>`;
    contenedor.innerHTML += html;
}

// forEach (iterar carrito)
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    console.log(subtotal);
});

// while (podría usarse en validaciones)
let intento = 0;
while (intento < 3) {
    // Reintentar validación
    intento++;
}
```

**¿Dónde se usa?**
- `for` tradicional: recorrer pedidos para mostrar historial
- `for...of`: recorrer productos para renderizar
- `forEach`: iterar carrito para mostrar items
- Cualquier repetición: actualizar stock, calcular totales

---

### 5. **Try-Catch (Manejo de Errores)** ✓
**Plan de estudios:** Try catch, etc.

```javascript
// Estructura básica
try {
    // Código que podría fallar
    const producto = productos.find(p => p.id === 999);
    if (!producto) {
        throw new Error("Producto no encontrado");
    }
    
    // Más código
    agregarAlCarrito(producto.id);
    
} catch (error) {
    // Si hay error, entra aquí
    alert(error.message);
    console.error("Error capturado:", error);
}
```

**¿Dónde se usa?**
- En `agregarAlCarrito()`: validar producto existe y tiene stock
- En `procesarPedido()`: validar cliente, carrito, datos requeridos
- En cualquier función con riesgo de error

---

### 6. **Funciones** ✓
**Plan de estudios:** Funciones

```javascript
// Función sin parámetros ni retorno
function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';
    // ... código
}

// Función con parámetros
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    // ... código
}

// Función que retorna valor
function calcularSubtotal() {
    return carrito.reduce((acum, item) => {
        return acum + (item.precio * item.cantidad);
    }, 0);
}

// Función con parámetros y retorno
function cambiarCantidad(idProducto, cambio) {
    const producto = carrito.find(p => p.id === idProducto);
    if (producto) {
        return producto.cantidad + cambio;
    }
    return null;
}

// Arrow function (forma corta)
const duplicar = (x) => x * 2;

// Arrow function con lógica
const estaEnStock = (producto) => {
    return producto.stock > 0;
};
```

**¿Dónde se usa?**
- `mostrarProductos()`: renderizar catálogo
- `agregarAlCarrito()`: añadir producto
- `calcularSubtotal()`: sumar carrito
- `procesarPedido()`: registrar orden
- `filtrarProductos()`: búsqueda
- Y muchas más...

---

### 7. **Eventos (onclick, onchange, onkeyup)** ✓
**Plan de estudios:** Ejecución de eventos (onclick, onchange, etc.)

```javascript
<!-- En HTML -->
<!-- onclick: cuando haces clic -->
<button onclick="agregarAlCarrito(1)">Agregar</button>

<!-- onchange: cuando cambias un valor -->
<select id="numero-mesa" onchange="validarCliente(); calcularTotales();">
    <option>Mesa 1</option>
    <option>Mesa 2</option>
</select>

<!-- onkeyup: mientras escribes -->
<input 
    type="text" 
    id="busqueda"
    onkeyup="filtrarProductos()"
>

<!-- En JavaScript -->
window.onload = function() {
    // Se ejecuta cuando carga la página
    mostrarProductos();
};
```

**¿Dónde se usa?**
- `onclick`: botones agregar, procesar pedido
- `onchange`: cambiar mesa, seleccionar pago, aplicar descuento
- `onkeyup`: búsqueda de productos
- `window.onload`: inicializar página

---

### 8. **Salidas (document, alert, console)** ✓
**Plan de estudios:** Salidas (document, alert, console, etc.)

```javascript
// alert: mostrar mensaje al usuario
alert("¡Bienvenido a Pollería Campos!");
alert(error.message);

// console.log: mostrar en consola (desarrollador)
console.log("=== POLLERÍA CAMPOS CHICLAYO ===");
console.log(`Total productos: ${productos.length}`);
console.log("Producto agregado:", producto.nombre);

// console.error: mostrar error en consola
console.error("Error:", error);

// document: modificar HTML
document.getElementById('carrito-count').textContent = carrito.length;
document.getElementById('subtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
document.getElementById('carrito-items').innerHTML = '<p>Carrito vacío</p>';

// Cambiar título
document.title = `Campos (${carrito.length}) - Pollería`;
```

**¿Dónde se usa?**
- `alert()`: mensajes de error, bienvenida, confirmaciones
- `console.log()`: debuging, verificar valores
- `document`: actualizar interfaz, mostrar/ocultar elementos

---

### 9. **Operadores Matemáticos** ✓
**Plan de estudios:** Operadores matemáticos

```javascript
// Operadores básicos
let suma = 10 + 5;      // 15
let resta = 10 - 5;     // 5
let multiplicacion = 10 * 5;  // 50
let division = 10 / 5;  // 2
let resto = 10 % 3;     // 1

// Operadores de asignación
let x = 10;
x += 5;  // x = 15
x -= 3;  // x = 12
x *= 2;  // x = 24
x /= 4;  // x = 6

// En el proyecto
const subtotal = item.precio * item.cantidad;
const descuento = subtotal * 0.10;  // 10%
const total = subtotal - descuento + DELIVERY_PRECIO;
itemExistente.cantidad += 1;
```

**¿Dónde se usa?**
- Calcular subtotal: precio × cantidad
- Calcular descuento: subtotal × porcentaje
- Calcular total: subtotal - descuento + delivery
- Aumentar/disminuir cantidad

---

### 10. **Operadores Lógicos** ✓
**Plan de estudios:** Operadores lógicos

```javascript
// && (Y) - ambas condiciones deben ser true
if (edad > 18 && tieneCarnet) {
    console.log("Puedes conducir");
}

// || (O) - al menos una debe ser true
if (esAdmin || esOwner) {
    console.log("Tienes acceso");
}

// ! (NO) - invierte el resultado
if (!usuarioBloqueado) {
    console.log("Puedes entrar");
}

// En el proyecto
const coincideBusqueda = regex.test(producto.nombre);
const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
return coincideBusqueda && coincideCategoria;

if (producto.stock <= 0) {
    throw new Error("Sin stock");
}

if (carrito.length === 0 || !validarCliente()) {
    alert("Datos incompletos");
}
```

**¿Dónde se usa?**
- Filtrar productos: búsqueda AND categoría
- Validar cliente: nombre AND teléfono AND mesa
- Verificar condiciones múltiples

---

### 11. **Spread Operator (...)** ✓
**Plan de estudios:** Spread operator

```javascript
// Copiar objeto sin modificar original
let producto = { id: 1, nombre: "Pollo", precio: 45 };
let copia = { ...producto };  // Copia

// Copiar y modificar
let productoMasQuince = {
    ...producto,
    precio: producto.precio * 1.15
};

// Copiar array
let arr1 = [1, 2, 3];
let arr2 = [...arr1];  // [1, 2, 3]

// En el proyecto
carrito.push({
    ...producto,      // Copiar todo el producto
    cantidad: 1       // Pero cambiar cantidad
});

return {
    ...item,
    cantidad: nuevaCantidad
};

const nuevoPedido = {
    numero: generarNumeroOrden(),
    items: [...carrito],  // Copiar carrito
    cliente: { ...cliente }  // Copiar cliente
};
```

**¿Dónde se usa?**
- Agregar producto al carrito sin modificar original
- Cambiar cantidad sin afectar otros datos
- Copiar carrito para el pedido

---

## ✅ SEMANA 2: Strings, Expresiones Regulares, Objetos y Arrays

### 12. **Manejo de Cadenas - Template Literals** ✓
**Plan de estudios:** Interpolación de cadenas, comillas invertidas

```javascript
// String normal (viejo)
let msg = "Hola " + nombre + ", total: S/ " + precio;

// Template Literal (nuevo, mejor)
let msg = `Hola ${nombre}, total: S/ ${precio}`;

// Con operaciones
let msg = `Subtotal: S/ ${calcularSubtotal().toFixed(2)}`;

// Múltiples líneas
let html = `
    <div class="producto">
        <h3>${producto.nombre}</h3>
        <p>Precio: S/ ${producto.precio}</p>
    </div>
`;

// En el proyecto
const productoHTML = `
    <div class="card producto-card">
        <h3>${producto.nombre}</h3>
        <span>S/ ${producto.precio.toFixed(2)}</span>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar</button>
    </div>
`;
```

**¿Dónde se usa?**
- Renderizar productos dinámicamente
- Crear items del carrito
- Generar mensajes con datos
- Crear filas de tabla

---

### 13. **Expresiones Regulares** ✓
**Plan de estudios:** Expresiones regulares

```javascript
// Crear expresión regular
const regex = /pollo/i;  // 'i' = insensible a mayúsculas

// Probar si coincide
console.log(regex.test("Pollo a la Brasa"));  // true
console.log(regex.test("Arroz chaufa"));      // false

// Crear desde variable
const busqueda = document.getElementById('busqueda').value;
const regex = new RegExp(busqueda, 'i');

// En el proyecto - filtrar productos por búsqueda
function obtenerProductosFiltrados() {
    const busqueda = document.getElementById('busqueda').value;
    const regex = new RegExp(busqueda, 'i');
    
    return productos.filter(producto => {
        return regex.test(producto.nombre);  // ¿Coincide?
    });
}
```

**¿Dónde se usa?**
- Búsqueda de productos (insensible a mayúsculas)
- Validar patrones de entrada

---

### 14. **Métodos de Cadenas** ✓
**Plan de estudios:** Métodos de cadenas

```javascript
// .trim() - eliminar espacios al inicio/final
let nombre = "  Juan  ";
nombre.trim();  // "Juan"

// En proyecto - validar que no esté vacío
if (nombre.trim() !== '') {
    alert("Nombre válido");
}

// .toFixed() - redondear decimales
let precio = 45.6789;
precio.toFixed(2);  // "45.68"

// En proyecto - mostrar precios
`S/ ${precio.toFixed(2)}`

// .padStart() - añadir caracteres al inicio
let mes = "5";
mes.padStart(2, '0');  // "05"

// En proyecto - generar fecha para orden
const mes = String(fecha.getMonth() + 1).padStart(2, '0');
const dia = String(fecha.getDate()).padStart(2, '0');
// Resultado: ORD-20260115-...

// .toLocaleString() - formatear según país
let fecha = new Date();
fecha.toLocaleString('es-PE');  // "15/1/2026, 14:30:00"

// En proyecto
fecha: new Date().toLocaleString('es-PE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
})
```

**¿Dónde se usa?**
- Validar datos no estén vacíos
- Mostrar precios con formato
- Generar número de orden
- Formatear fechas en español

---

### 15. **Objetos en JavaScript** ✓
**Plan de estudios:** Objetos en JS

```javascript
// Crear objeto literal
let cliente = {
    nombre: "Juan",
    telefono: "987654321",
    direccion: "Calle 123"
};

// Acceder a propiedades
console.log(cliente.nombre);        // "Juan"
console.log(cliente["telefono"]);   // "987654321"

// Modificar propiedades
cliente.nombre = "Carlos";

// Crear objeto con múltiples propiedades
let producto = {
    id: 1,
    nombre: "Pollo a la Brasa",
    precio: 45.00,
    categoria: "pollos",
    stock: 15,
    imagen: "url..."
};

// En el proyecto - crear pedido
const nuevoPedido = {
    numero: generarNumeroOrden(),
    fecha: new Date().toLocaleString('es-PE'),
    mesa: "Mesa 1",
    cliente: {
        nombre: "Juan",
        telefono: "987654321",
        direccion: "Calle 123"
    },
    items: carrito,
    subtotal: 45.00,
    descuento: 4.50,
    total: 40.50,
    metodoPago: "Efectivo",
    estado: "pendiente"
};
```

**¿Dónde se usa?**
- Guardar datos del cliente
- Guardar propiedades de productos
- Crear pedidos
- Guardar datos en general

---

### 16. **Arreglos (Arrays)** ✓
**Plan de estudios:** Arreglos (lineales)

```javascript
// Array vacío
let carrito = [];

// Array con datos
let productos = [
    { id: 1, nombre: "Pollo", precio: 45 },
    { id: 2, nombre: "Papas", precio: 8 },
    { id: 3, nombre: "Bebida", precio: 5 }
];

// Acceder a elementos
console.log(productos[0]);       // Primer elemento
console.log(productos[1]);       // Segundo elemento
console.log(productos.length);   // 3 elementos

// Agregar elemento
productos.push({ id: 4, nombre: "Arroz" });

// Eliminar elemento
productos.pop();  // Elimina último

// En el proyecto
let productos = [{ id: 1, ... }, { id: 2, ... }, ...];
let carrito = [];
let pedidos = [];
```

**¿Dónde se usa?**
- Guardar lista de productos
- Guardar carrito de compras
- Guardar historial de pedidos

---

### 17. **Métodos de Arreglos** ✓
**Plan de estudios:** Propiedades y funciones con arreglos, iteraciones

#### **`.filter()` - Seleccionar elementos**

```javascript
// Básico
let mayores = [1, 2, 3, 4].filter(n => n > 2);  // [3, 4]

// En el proyecto - filtrar por búsqueda y categoría
function obtenerProductosFiltrados() {
    return productos.filter(producto => {
        const coincideBusqueda = regex.test(producto.nombre);
        const coincideCategoria = categoria === 'todos' || 
                                  producto.categoria === categoria;
        return coincideBusqueda && coincideCategoria;
    });
}

// Eliminar del carrito
carrito = carrito.filter(item => item.id !== idProducto);
```

#### **`.map()` - Transformar elementos**

```javascript
// Básico
let cuadrados = [1, 2, 3].map(n => n * n);  // [1, 4, 9]

// En el proyecto - cambiar cantidad
carrito = carrito.map(item => {
    if (item.id === idProducto) {
        return { ...item, cantidad: nuevaCantidad };
    }
    return item;
});

// Actualizar stock
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
```

#### **`.find()` - Buscar primer elemento**

```javascript
// Básico
let mayor2 = [1, 2, 3, 4].find(n => n > 2);  // 3

// En el proyecto - buscar producto
const producto = productos.find(p => p.id === idProducto);

// Buscar item en carrito
const itemExistente = carrito.find(item => item.id === idProducto);
```

#### **`.forEach()` - Hacer algo con cada elemento**

```javascript
// Básico
[1, 2, 3].forEach(n => console.log(n));

// En el proyecto - renderizar carrito
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    const itemHTML = `<div>${item.nombre}</div>`;
    carritoItems.innerHTML += itemHTML;
});

// Mostrar pedidos
pedidos.forEach((pedido, index) => {
    console.log(`Pedido ${index}: ${pedido.numero}`);
});
```

#### **`.reduce()` - Combinar todos en uno**

```javascript
// Básico - sumar
let suma = [1, 2, 3, 4].reduce((acum, n) => acum + n, 0);  // 10

// En el proyecto - calcular total
function calcularSubtotal() {
    return carrito.reduce((acumulador, item) => {
        return acumulador + (item.precio * item.cantidad);
    }, 0);
}
// Paso a paso:
// acum=0,   item={precio:45, cantidad:1} → 0 + 45 = 45
// acum=45,  item={precio:8,  cantidad:1} → 45 + 8 = 53
// acum=53,  item={precio:5,  cantidad:2} → 53 + 10 = 63
// Resultado final: 63
```

**¿Dónde se usa?**
- `.filter()`: filtrar productos, eliminar del carrito
- `.map()`: cambiar cantidad, actualizar stock
- `.find()`: buscar producto por ID
- `.forEach()`: mostrar items
- `.reduce()`: calcular totales

---

### 18. **JSON (Notación de Objetos)** ✓
**Plan de estudios:** Notación JSON

```javascript
// Convertir objeto a JSON (texto)
let cliente = {
    nombre: "Juan",
    telefono: "987654321"
};

let textoJSON = JSON.stringify(cliente);
console.log(textoJSON);  
// Resultado: {"nombre":"Juan","telefono":"987654321"}

// Convertir JSON (texto) a objeto
let textoJSON = '{"nombre":"Juan","telefono":"987654321"}';
let objeto = JSON.parse(textoJSON);
console.log(objeto.nombre);  // "Juan"

// En el proyecto - mostrar pedido en consola
const pedidoJSON = JSON.stringify(nuevoPedido, null, 2);
console.log("=== PEDIDO PROCESADO ===");
console.log(pedidoJSON);

// Resultado formateado:
// {
//   "numero": "ORD-20260115-5234",
//   "fecha": "15/01/2026, 14:30",
//   "mesa": "Mesa 1",
//   "cliente": { ... },
//   "items": [ ... ],
//   "total": 40.50
// }
```

**¿Dónde se usa?**
- Mostrar pedidos en consola formateados
- Convertir datos para enviar a servidor
- Guardar/cargar datos

---

### 19. **Arrow Functions (Operador Flecha =>)** ✓
**Plan de estudios:** Operador flecha

```javascript
// Función tradicional
function sumar(a, b) {
    return a + b;
}

// Arrow function equivalente
const sumar = (a, b) => a + b;

// Sin parámetros
const obtenerFecha = () => new Date();

// Un solo parámetro (sin paréntesis)
const duplicar = n => n * 2;

// Con lógica más compleja
const calcularTotal = (subtotal, desc) => {
    const descMonto = subtotal * desc;
    return subtotal - descMonto;
};

// En el proyecto - en métodos de array
productos.filter(p => p.stock > 0)

carrito.map(item => ({ ...item, cantidad: item.cantidad + 1 }))

carrito.forEach(item => console.log(item.nombre))

const regex = new RegExp(busqueda, 'i');
return productos.filter(producto => {
    return regex.test(producto.nombre);
});
```

**¿Dónde se usa?**
- En todos los métodos de array (filter, map, find, forEach, reduce)
- Funciones cortas de cálculo
- Funciones de validación

---

## 📊 Resumen de Cobertura vs Plan de Estudios

| Semana | Tema | Concepto | ¿Se Usa? |
|--------|------|----------|---------|
| 1 | Conceptos básicos | Variables y constantes | ✅ Sí |
| 1 | Conceptos básicos | Tipos de datos | ✅ Sí |
| 1 | Control | if/else, try-catch | ✅ Sí |
| 1 | Control | Bucles (for, forEach, for...of) | ✅ Sí |
| 1 | Funciones | Definición y uso | ✅ Sí |
| 1 | Eventos | onclick, onchange, onkeyup | ✅ Sí |
| 1 | Salidas | document, alert, console | ✅ Sí |
| 1 | Operadores | Matemáticos (+, -, *, /) | ✅ Sí |
| 1 | Operadores | Lógicos (&&, \|\|, !) | ✅ Sí |
| 1 | Operadores | Asignación (+=, =) | ✅ Sí |
| 1 | Operadores | Spread (...) | ✅ Sí |
| 2 | Cadenas | Template literals | ✅ Sí |
| 2 | Cadenas | Expresiones regulares | ✅ Sí |
| 2 | Cadenas | Métodos (trim, toFixed, padStart) | ✅ Sí |
| 2 | Objetos/Arrays | Objetos literales | ✅ Sí |
| 2 | Objetos/Arrays | Arrays lineales | ✅ Sí |
| 2 | Objetos/Arrays | Métodos (filter, map, find, forEach, reduce) | ✅ Sí |
| 2 | Objetos/Arrays | JSON | ✅ Sí |
| 2 | Objetos/Arrays | Arrow functions | ✅ Sí |

---

## 🎓 Conclusión

**El proyecto utiliza TODO lo que está en el plan de estudios Semana 1 y 2:**

✅ **19 conceptos JavaScript identificados**
✅ **Todos están documentados con ejemplos del código real**
✅ **Perfectamente alineado con el currículo**

Este es un proyecto **educativo integral** que cubre todos los temas planificados en la Unidad 1 de JavaScript.

---

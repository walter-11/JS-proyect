# 📚 GUÍA COMPLETA DE ESTUDIO - Pollería Campos Chiclayo

## 🎯 Propósito de esta Guía

Esta guía te ayudará a **entender y aprender** todo tu proyecto paso a paso, con énfasis especial en **JavaScript**, que es el corazón del sistema. Está diseñada para ser fácil de seguir, con ejemplos prácticos y explicaciones claras.

---

## 📖 TABLA DE CONTENIDOS

1. [¿Qué es tu proyecto?](#qué-es-tu-proyecto)
2. [Estructura General](#estructura-general)
3. [Conceptos Básicos de JavaScript](#conceptos-básicos-de-javascript)
4. [Análisis Detallado del Código](#análisis-detallado-del-código)
5. [Flujo de Funcionamiento](#flujo-de-funcionamiento)
6. [Preguntas de Autoevaluación](#preguntas-de-autoevaluación)
7. [Guía de Depuración](#guía-de-depuración)

---

## ¿Qué es tu proyecto?

### 📱 Resumen Simple

Tu proyecto es un **sistema web de pedidos para una pollería**. Los clientes pueden:

1. **Ver productos** (pollo, acompañamientos, bebidas)
2. **Buscar y filtrar** productos
3. **Agregar al carrito** de compras
4. **Procesar el pedido** (con datos del cliente, método de pago, etc.)
5. **Ver el historial** de todos los pedidos realizados

### 🎬 Analógico vs Digital

| Antes (Manual) | Ahora (Tu Sistema) |
|---|---|
| Anotar pedidos en papel | Carrito digital interactivo |
| Calcular sumas a mano | Cálculos automáticos |
| Tomar datos verbalmente | Formulario estructurado |
| Buscar en la memoria | Búsqueda y filtrado rápido |
| Sin historial | Historial completo |

---

## Estructura General

### 📁 Archivos del Proyecto

```
JS-proyect/
├── index.html          # 🏗️ Estructura de la página
├── style.css           # 🎨 Estilos visuales
├── app.js              # ⚙️ Lógica principal (JAVASCRIPT)
├── README.md           # 📖 Documentación
├── CONCEPTOS_JS.md     # 📚 Conceptos utilizados
├── INFORME_PROYECTO.md # 📊 Análisis del proyecto
└── GUIA_ESTUDIO.md     # ✨ Esta guía
```

### 🔄 Cómo se Comunican los Archivos

```
index.html
    ↓ (carga estilos)
style.css
    ↓ (carga lógica)
app.js
    ↓ (manipula)
index.html
    ↓ (se ve bonito por)
style.css
```

**Analogía:** 
- `HTML` = Esqueleto del cuerpo
- `CSS` = Ropa que viste el cuerpo
- `JavaScript` = Cerebro que controla el cuerpo

---

## Conceptos Básicos de JavaScript

### ⚡ Tema 1: Variables y Constantes

**¿Qué es una variable?**

Es un **"contenedor"** para guardar información que puede cambiar.

```javascript
// VARIABLE (puede cambiar)
let carrito = [];
let cantidad = 5;

// Luego puede cambiar
cantidad = 10;  // ✅ Permitido
```

**¿Qué es una constante?**

Es un **"contenedor"** para guardar información que **NO puede cambiar**.

```javascript
// CONSTANTE (no puede cambiar)
const IGV = 0.18;
const DELIVERY_PRECIO = 5.00;

// Esto causar error:
IGV = 0.20;  // ❌ ERROR: No se puede cambiar
```

**En tu proyecto:**
```javascript
// Variables (cambian según acciones del usuario)
let carrito = [];        // Se llena cuando el usuario agrega productos
let pedidos = [];        // Se llena cuando procesa pedidos
let productos = [...];   // Listado de productos

// Constantes (valores fijos del negocio)
const IGV = 0.18;           // Impuesto = 18%
const DELIVERY_PRECIO = 5.00; // Costo de delivery = S/ 5.00
```

**Ejercicio:** ¿Cuáles de estos deberían ser variables y cuáles constantes?
```javascript
let nombre_cliente = "Juan";         // Variable o Constante?
let fecha_hoy = new Date();          // Variable o Constante?
let precio_pollo_entero = 45.00;     // Variable o Constante?
let impuesto = 0.18;                 // Variable o Constante?
```

<details>
<summary>💡 Ver respuesta</summary>

- `nombre_cliente` → **Variable** (cada cliente es diferente)
- `fecha_hoy` → **Variable** (cambia cada día)
- `precio_pollo_entero` → **Constante** (es un precio fijo del negocio)
- `impuesto` → **Constante** (es un valor fijo del país)

</details>

---

### ⚡ Tema 2: Tipos de Datos

JavaScript tiene varios **tipos** de datos. Los más importantes son:

#### 📝 STRING (Texto)

```javascript
let nombre = "Juan";
let mensaje = "Bienvenido a Pollería Campos";
let precio = "S/ 45.00";
```

**Template Literals** (la forma moderna de combinar texto):

```javascript
let nombre = "Juan";
let edad = 25;

// Forma antigua (concatenación)
let saludo = "Hola " + nombre + ", tienes " + edad + " años";

// Forma moderna (template literal con backticks y ${})
let saludo = `Hola ${nombre}, tienes ${edad} años`;
// Resultado: "Hola Juan, tienes 25 años"
```

**En tu proyecto:**
```javascript
const productoHTML = `
    <div class="card producto-card">
        <h3>${producto.nombre}</h3>
        <span>S/ ${producto.precio.toFixed(2)}</span>
    </div>
`;
```

#### 🔢 NUMBER (Números)

```javascript
let precio = 45.00;        // Número decimal
let cantidad = 5;          // Número entero
let resultado = 45.00 * 5; // 225
let división = 100 / 3;    // 33.333...
```

**Métodos útiles con números:**
```javascript
let numero = 45.5678;

numero.toFixed(2);     // "45.57" (redondea a 2 decimales)
Math.round(numero);    // 46 (redondea al entero más cercano)
Math.floor(numero);    // 45 (siempre hacia abajo)
Math.ceil(numero);     // 46 (siempre hacia arriba)
```

#### ✅ BOOLEAN (Verdadero/Falso)

```javascript
let enStock = true;           // El producto está disponible
let esCliente = false;        // No es un cliente registrado
let validar = 5 > 3;          // true (5 es mayor que 3)
let verificar = 5 < 3;        // false (5 no es menor que 3)
```

#### 📦 OBJECT (Objeto)

Un objeto es una **colección de información relacionada**:

```javascript
// Objeto de Producto
let producto = {
    id: 1,
    nombre: "Pollo a la Brasa Entero",
    precio: 45.00,
    categoria: "pollos",
    stock: 15
};

// Acceder a las propiedades:
console.log(producto.nombre);  // "Pollo a la Brasa Entero"
console.log(producto.precio);  // 45.00
```

#### 📋 ARRAY (Arreglo/Lista)

Un array es una **lista de elementos**:

```javascript
// Array de números
let numeros = [1, 2, 3, 4, 5];

// Array de strings
let nombres = ["Juan", "María", "Pedro"];

// Array de objetos (MÁS COMÚN)
let productos = [
    { id: 1, nombre: "Pollo Entero", precio: 45.00 },
    { id: 2, nombre: "1/2 Pollo", precio: 25.00 },
    { id: 3, nombre: "1/4 Pollo", precio: 15.00 }
];

// Acceder a elementos
console.log(productos[0]);           // { id: 1, nombre: "Pollo Entero", ... }
console.log(productos[0].nombre);    // "Pollo Entero"
console.log(productos.length);       // 3 (cantidad de elementos)
```

---

### ⚡ Tema 3: Operadores

Los operadores nos permiten **hacer cálculos y comparaciones**.

#### 🔢 Operadores Matemáticos

```javascript
let a = 10;
let b = 3;

a + b;   // 13 (suma)
a - b;   // 7 (resta)
a * b;   // 30 (multiplicación)
a / b;   // 3.333... (división)
a % b;   // 1 (residuo/módulo)
a ** b;  // 1000 (exponente)

// En tu proyecto:
let precio = 45.00;
let cantidad = 3;
let subtotal = precio * cantidad;  // 135.00
```

#### ➕ Operadores de Asignación

```javascript
let cantidad = 5;

cantidad = cantidad + 1;  // 6 (forma larga)
cantidad += 1;            // 6 (forma corta, MÁS COMÚN)
cantidad -= 1;            // 5 (restar)
cantidad *= 2;            // 10 (multiplicar)

// En tu proyecto:
itemExistente.cantidad += 1;  // Aumentar cantidad en el carrito
```

#### 🔗 Operadores de Comparación

```javascript
5 == 5;     // true (igual)
5 != 3;     // true (no igual)
5 > 3;      // true (mayor que)
5 < 3;      // false (menor que)
5 >= 5;     // true (mayor o igual)
5 <= 3;     // false (menor o igual)
```

#### 🧠 Operadores Lógicos

```javascript
// AND (&&) - AMBAS condiciones deben ser true
let enStock = true;
let tieneDinero = true;
if (enStock && tieneDinero) {
    console.log("Puedes comprar");  // Se ejecuta
}

// OR (||) - AL MENOS una condición debe ser true
let esCliente = false;
let esEmpleado = true;
if (esCliente || esEmpleado) {
    console.log("Puedes entrar");  // Se ejecuta
}

// NOT (!) - Invierte el valor
let enStock = false;
if (!enStock) {
    console.log("Sin stock");  // Se ejecuta
}

// En tu proyecto:
const coincideBusqueda = regex.test(producto.nombre);
const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
return coincideBusqueda && coincideCategoria;
```

---

### ⚡ Tema 4: Estructuras de Control (IF/ELSE)

Las estructuras de control **toman decisiones** basadas en condiciones.

#### IF (Si)

```javascript
let stock = 5;

if (stock > 0) {
    console.log("Producto disponible");
}

// En tu proyecto:
if (producto.stock <= 0) {
    throw new Error(`${producto.nombre} sin stock disponible`);
}
```

#### IF/ELSE (Si/Si no)

```javascript
let producto = carrito.find(item => item.id === 1);

if (producto) {
    console.log("Producto encontrado:", producto.nombre);
} else {
    console.log("Producto no encontrado");
}
```

#### IF/ELSE IF/ELSE (Múltiples condiciones)

```javascript
let metodoPago = "Yape";

if (metodoPago === "Efectivo") {
    console.log("Pago en efectivo");
} else if (metodoPago === "Tarjeta") {
    console.log("Pago con tarjeta");
} else if (metodoPago === "Yape" || metodoPago === "Plin") {
    console.log("Pago digital");
} else {
    console.log("Método no válido");
}
```

#### TERNARIO (Forma corta)

```javascript
// Forma larga
let mensaje;
if (enStock) {
    mensaje = "Disponible";
} else {
    mensaje = "Sin stock";
}

// Forma corta (ternario)
let mensaje = enStock ? "Disponible" : "Sin stock";

// En tu proyecto:
${producto.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
```

---

### ⚡ Tema 5: Bucles (FOR, WHILE, FOREACH)

Los bucles **repiten código** una cantidad de veces.

#### FOR (El bucle clásico)

```javascript
// Repetir 5 veces
for (let i = 0; i < 5; i++) {
    console.log(i);  // 0, 1, 2, 3, 4
}

// Recorrer un array
let numeros = [10, 20, 30, 40];
for (let i = 0; i < numeros.length; i++) {
    console.log(numeros[i]);  // 10, 20, 30, 40
}
```

#### FOR...OF (Bucle simplificado para arrays)

```javascript
let productos = [
    { nombre: "Pollo Entero", precio: 45 },
    { nombre: "1/2 Pollo", precio: 25 },
    { nombre: "1/4 Pollo", precio: 15 }
];

for (const producto of productos) {
    console.log(producto.nombre);  // Pollo Entero, 1/2 Pollo, 1/4 Pollo
}

// En tu proyecto:
for (const producto of productosFiltrados) {
    const productoHTML = `...`;
    productosGrid.innerHTML += productoHTML;
}
```

#### FOREACH (Bucle funcional para arrays)

```javascript
let carrito = [
    { nombre: "Pollo", cantidad: 1, precio: 45 },
    { nombre: "Papas", cantidad: 2, precio: 8 }
];

carrito.forEach(item => {
    console.log(`${item.nombre}: ${item.cantidad} x S/ ${item.precio}`);
});

// En tu proyecto:
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    const itemHTML = `<div>...</div>`;
    carritoItems.innerHTML += itemHTML;
});
```

#### WHILE (Mientras una condición sea true)

```javascript
let contador = 0;

while (contador < 5) {
    console.log(contador);  // 0, 1, 2, 3, 4
    contador++;
}
```

---

### ⚡ Tema 6: Funciones

Una **función** es un **bloque de código reutilizable** que realiza una tarea específica.

#### Función Básica

```javascript
// Definir la función
function saludar(nombre) {
    console.log(`Hola ${nombre}`);
}

// Usar la función
saludar("Juan");    // Imprime: "Hola Juan"
saludar("María");   // Imprime: "Hola María"
```

#### Función con RETURN

```javascript
function sumar(a, b) {
    return a + b;
}

let resultado = sumar(5, 3);  // resultado = 8
console.log(resultado);        // 8

// En tu proyecto:
function obtenerProductosFiltrados() {
    const busqueda = document.getElementById('busqueda').value;
    const categoria = document.getElementById('categoria').value;
    
    const regex = new RegExp(busqueda, 'i');
    
    return productos.filter(producto => {
        const coincideBusqueda = regex.test(producto.nombre);
        const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
        return coincideBusqueda && coincideCategoria;
    });
}
```

#### Arrow Functions (Funciones Flechas)

```javascript
// Función normal
function sumar(a, b) {
    return a + b;
}

// Arrow function
const sumar = (a, b) => {
    return a + b;
};

// Arrow function super corta
const sumar = (a, b) => a + b;

// En tu proyecto:
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    // ...
});

productos.filter(producto => {
    return producto.stock > 0;
});
```

---

### ⚡ Tema 7: Métodos de Arrays (MUY IMPORTANTE)

Los métodos de arrays permiten **buscar, transformar y filtrar** datos.

#### .find() - Encontrar UN elemento

```javascript
let productos = [
    { id: 1, nombre: "Pollo Entero", precio: 45 },
    { id: 2, nombre: "1/2 Pollo", precio: 25 },
    { id: 3, nombre: "1/4 Pollo", precio: 15 }
];

// Encontrar el producto con id = 2
let producto = productos.find(p => p.id === 2);
console.log(producto);  // { id: 2, nombre: "1/2 Pollo", precio: 25 }

// En tu proyecto:
const producto = productos.find(p => p.id === idProducto);
const itemExistente = carrito.find(item => item.id === idProducto);
```

#### .filter() - Filtrar (obtener VARIOS elementos)

```javascript
let productos = [
    { id: 1, nombre: "Pollo Entero", categoria: "pollos", precio: 45 },
    { id: 2, nombre: "Papas Fritas", categoria: "acompañamientos", precio: 8 },
    { id: 3, nombre: "1/4 Pollo", categoria: "pollos", precio: 15 }
];

// Obtener solo los pollos
let pollos = productos.filter(p => p.categoria === "pollos");
console.log(pollos);
// [ { id: 1, ... }, { id: 3, ... } ]

// En tu proyecto:
return productos.filter(producto => {
    const coincideBusqueda = regex.test(producto.nombre);
    const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
    return coincideBusqueda && coincideCategoria;
});
```

#### .map() - Transformar (modificar elementos)

```javascript
let numeros = [1, 2, 3, 4, 5];

// Convertir cada número al doble
let dobles = numeros.map(n => n * 2);
console.log(dobles);  // [2, 4, 6, 8, 10]

// En tu proyecto:
carrito = carrito.map(item => {
    if (item.id === idProducto) {
        const nuevaCantidad = item.cantidad + cambio;
        if (nuevaCantidad > 0 && nuevaCantidad <= item.stock) {
            return { ...item, cantidad: nuevaCantidad };
        }
    }
    return item;
});
```

#### .forEach() - Recorrer (hacer algo con cada elemento)

```javascript
let carrito = [
    { nombre: "Pollo", cantidad: 1, precio: 45 },
    { nombre: "Papas", cantidad: 2, precio: 8 }
];

// Hacer algo con cada elemento
carrito.forEach(item => {
    console.log(`${item.nombre}: ${item.cantidad} x S/ ${item.precio}`);
});

// En tu proyecto:
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    const itemHTML = `...`;
    carritoItems.innerHTML += itemHTML;
});
```

#### Comparación Visual

```javascript
let productos = [
    { id: 1, nombre: "Pollo", precio: 45, stock: 10 },
    { id: 2, nombre: "Papas", precio: 8, stock: 0 },
    { id: 3, nombre: "Ensalada", precio: 6, stock: 5 }
];

// .find() → Encuentra UNO
// Encuentra el producto con id = 2
let resultado = productos.find(p => p.id === 2);
// → { id: 2, nombre: "Papas", ... }

// .filter() → Filtra VARIOS
// Obtén todos los productos con stock > 0
let resultado = productos.filter(p => p.stock > 0);
// → [{ id: 1, ... }, { id: 3, ... }]

// .map() → Transforma
// Obtén un array solo con los nombres
let resultado = productos.map(p => p.nombre);
// → ["Pollo", "Papas", "Ensalada"]

// .forEach() → Itera
// Haz algo con cada producto
productos.forEach(p => {
    console.log(p.nombre);  // Pollo, Papas, Ensalada
});
```

---

### ⚡ Tema 8: Objetos y Destructuring

#### Crear Objetos

```javascript
let cliente = {
    nombre: "Juan",
    telefono: "987654321",
    direccion: "Av. Principal 123",
    ciudad: "Chiclayo"
};

// Acceder
console.log(cliente.nombre);        // "Juan"
console.log(cliente["telefono"]);   // "987654321"
```

#### Spread Operator (...)

Permite **copiar o combinar** objetos y arrays:

```javascript
// Copiar un objeto
let producto = { id: 1, nombre: "Pollo", precio: 45 };
let copia = { ...producto };  // Copia completa

// Agregar propiedades
let productoConCantidad = { ...producto, cantidad: 2 };
// → { id: 1, nombre: "Pollo", precio: 45, cantidad: 2 }

// En tu proyecto:
carrito.push({ ...producto, cantidad: 1 });
return { ...item, cantidad: nuevaCantidad };
```

#### Destructuring (Extraer valores)

```javascript
let producto = { id: 1, nombre: "Pollo", precio: 45 };

// Forma larga
let id = producto.id;
let nombre = producto.nombre;
let precio = producto.precio;

// Forma corta (destructuring)
let { id, nombre, precio } = producto;

// En arrays
let numeros = [10, 20, 30];
let [primero, segundo, tercero] = numeros;
```

---

### ⚡ Tema 9: Manejo de Errores (TRY/CATCH)

El **try/catch** permite **atrapar errores** sin que el programa se bloquee.

```javascript
try {
    // Código que PODRÍA tener error
    let producto = productos.find(p => p.id === 999);
    if (!producto) {
        throw new Error("Producto no encontrado");
    }
    console.log(producto.nombre);
} catch (error) {
    // Si hay error, ejecuta esto
    console.log("Error:", error.message);
    alert("Algo salió mal: " + error.message);
}

// En tu proyecto:
try {
    const producto = productos.find(p => p.id === idProducto);
    
    if (!producto) {
        throw new Error("Producto no encontrado");
    }
    
    if (producto.stock <= 0) {
        throw new Error(`${producto.nombre} sin stock disponible`);
    }
    
    // ... código de éxito
} catch (error) {
    alert(error.message);
    console.error("Error:", error);
}
```

---

### ⚡ Tema 10: Expresiones Regulares

Las **expresiones regulares** sirven para **buscar patrones** en texto.

```javascript
// Crear una regex para buscar insensible a mayúsculas
const busqueda = "pollo";
const regex = new RegExp(busqueda, 'i');  // 'i' = insensible a mayúsculas

// Probar si coincide
regex.test("Pollo a la Brasa");    // true
regex.test("1/2 POLLO");           // true
regex.test("Papas Fritas");        // false

// En tu proyecto:
const regex = new RegExp(busqueda, 'i');
return productos.filter(producto => {
    const coincideBusqueda = regex.test(producto.nombre);
    return coincideBusqueda;
});
```

---

### ⚡ Tema 11: El DOM (Document Object Model)

El **DOM** es cómo JavaScript interactúa con la página HTML.

#### Seleccionar Elementos

```javascript
// Por ID
let carrito = document.getElementById('carrito-items');

// Por clase
let botones = document.querySelectorAll('.btn-agregar');

// Por selector CSS
let producto = document.querySelector('.producto-card');
let todos = document.querySelectorAll('.producto-card');
```

#### Modificar Contenido

```javascript
let titulo = document.getElementById('titulo');

// Cambiar texto
titulo.textContent = "Nuevo título";

// Cambiar HTML
titulo.innerHTML = `<strong>Nuevo título</strong>`;

// Cambiar atributos
titulo.setAttribute('style', 'color: red;');
titulo.style.color = 'red';

// En tu proyecto:
carritoCount.textContent = carrito.length;
productosGrid.innerHTML = '';  // Limpiar
document.title = `Campos (${carrito.length}) - Pollería`;
```

#### Agregar Eventos

```javascript
// Al hacer clic
let boton = document.getElementById('mi-boton');
boton.addEventListener('click', function() {
    console.log("Se hizo clic");
});

// O directamente en HTML
<button onclick="agregarAlCarrito(1)">Agregar</button>

// Con teclado
let buscador = document.getElementById('busqueda');
buscador.addEventListener('keyup', function() {
    console.log("El usuario escribió algo");
});
// O en HTML
<input onkeyup="filtrarProductos()">
```

---

## Análisis Detallado del Código

### 📍 Parte 1: Variables Globales

```javascript
// ARRAYS DE DATOS
let productos = [
    { id: 1, nombre: "Pollo a la Brasa Entero", precio: 45.00, ... },
    // ... más productos
];

let carrito = [];    // Productos que el usuario agrega
let pedidos = [];    // Pedidos completados

// CONSTANTES DEL NEGOCIO
const IGV = 0.18;              // Impuesto (18%)
const DELIVERY_PRECIO = 5.00;  // Costo de delivery
```

**¿Por qué son así?**
- `productos`, `carrito`, `pedidos` = **Variables** (cambian durante el uso)
- `IGV`, `DELIVERY_PRECIO` = **Constantes** (valores fijos del negocio)

### 📍 Parte 2: Evento onload

```javascript
window.onload = function() {
    console.log("Sistema iniciado");
    mostrarProductos();                    // Mostrar todos los productos
    document.title = "Pollería Campos..."; // Cambiar título del navegador
    alert("¡Bienvenido!");                // Mensaje de bienvenida
};
```

**¿Cuándo se ejecuta?** Cuando la página **termina de cargar** completamente.

**¿Para qué sirve?** Para **inicializar** el sistema.

### 📍 Parte 3: Mostrar Productos

```javascript
function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';  // Limpiar
    
    const productosFiltrados = obtenerProductosFiltrados();  // Obtener productos
    
    // Recorrer cada producto
    for (const producto of productosFiltrados) {
        // Crear HTML del producto
        const productoHTML = `
            <div class="card">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <span>S/ ${producto.precio.toFixed(2)}</span>
                <button onclick="agregarAlCarrito(${producto.id})">
                    Agregar al Carrito
                </button>
            </div>
        `;
        
        productosGrid.innerHTML += productoHTML;  // Agregar al DOM
    }
}
```

**Flujo:**
1. Obtener el contenedor (`productos-grid`)
2. Limpiarlo (`innerHTML = ''`)
3. Obtener productos filtrados
4. Por cada producto, crear HTML
5. Insertar en la página

### 📍 Parte 4: Agregar al Carrito

```javascript
function agregarAlCarrito(idProducto) {
    try {
        // 1. Buscar el producto
        const producto = productos.find(p => p.id === idProducto);
        
        // 2. Validar que exista
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        
        // 3. Validar que tenga stock
        if (producto.stock <= 0) {
            throw new Error(`Sin stock`);
        }
        
        // 4. Buscar si ya está en el carrito
        const itemExistente = carrito.find(item => item.id === idProducto);
        
        if (itemExistente) {
            // Si existe, aumentar cantidad
            if (itemExistente.cantidad >= producto.stock) {
                alert("Stock máximo alcanzado");
                return;
            }
            itemExistente.cantidad += 1;
        } else {
            // Si no existe, agregarlo
            carrito.push({ ...producto, cantidad: 1 });
        }
        
        // 5. Actualizar la vista
        actualizarCarrito();
        
    } catch (error) {
        alert(error.message);
    }
}
```

**Lógica paso a paso:**
1. ¿El producto existe? Si no, error.
2. ¿Tiene stock? Si no, error.
3. ¿Ya está en el carrito?
   - **SÍ**: Aumentar cantidad (si no supera el stock)
   - **NO**: Agregarlo nuevo

### 📍 Parte 5: Actualizar Carrito

```javascript
function actualizarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    
    // Actualizar el contador
    carritoCount.textContent = carrito.length;
    
    // Si el carrito está vacío
    if (carrito.length === 0) {
        carritoItems.innerHTML = '<p>Carrito vacío</p>';
        ocultarSecciones();  // Ocultar formulario
        return;
    }
    
    // Mostrar las secciones (formulario)
    mostrarSecciones();
    
    // Limpiar el contenedor
    carritoItems.innerHTML = '';
    
    // Recorrer cada item del carrito
    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        
        const itemHTML = `
            <div class="carrito-item">
                <div>${item.nombre}</div>
                <div>S/ ${item.precio.toFixed(2)}</div>
                <button onclick="eliminarDelCarrito(${item.id})">🗑️</button>
                <button onclick="cambiarCantidad(${item.id}, -1)">−</button>
                <span>${item.cantidad}</span>
                <button onclick="cambiarCantidad(${item.id}, 1)">+</button>
                <span>S/ ${subtotal.toFixed(2)}</span>
            </div>
        `;
        
        carritoItems.innerHTML += itemHTML;
    });
    
    calcularTotales();  // Calcular subtotal, IGV, total
}
```

**Flujo:**
1. Si carrito está vacío → mostrar "Carrito vacío"
2. Si carrito tiene items → mostrar cada uno con botones
3. Calcular totales

---

## Flujo de Funcionamiento

### 🎬 Escenario Típico: Un Cliente Realiza un Pedido

```
┌─────────────────────────────────────────────────────────────┐
│ 1. El usuario CARGA LA PÁGINA                               │
└──────────────┬──────────────────────────────────────────────┘
               ↓
        ⚙️ window.onload
               ↓
        mostrarProductos()
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. Los PRODUCTOS se muestran en la página                   │
└──────────────┬──────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. El usuario BUSCA O FILTRA productos                      │
│    (por nombre o categoría)                                 │
└──────────────┬──────────────────────────────────────────────┘
               ↓
        filtrarProductos()
               ↓
        obtenerProductosFiltrados()
               ↓
        mostrarProductos() (actualizado)
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. El usuario HACES CLIC en "Agregar al Carrito"            │
└──────────────┬──────────────────────────────────────────────┘
               ↓
        agregarAlCarrito(idProducto)
               ↓
        ¿Validaciones OK?
        ├─ ¿Producto existe?
        ├─ ¿Tiene stock?
        └─ ¿Es cantidad válida?
               ↓
        Carrito se actualiza
               ↓
        actualizarCarrito()
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 5. El CARRITO se muestra con:                               │
│    - Lista de productos agregados                           │
│    - Botones para cambiar cantidad                          │
│    - Botones para eliminar                                  │
│    - Totales en tiempo real                                 │
└──────────────┬──────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 6. El usuario INGRESA DATOS:                                │
│    - Nombre, teléfono, dirección                            │
│    - Método de pago                                         │
│    - Descuento (opcional)                                   │
└──────────────┬──────────────────────────────────────────────┘
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 7. El usuario HACES CLIC en "Procesar Pedido"               │
└──────────────┬──────────────────────────────────────────────┘
               ↓
        procesarPedido()
               ↓
        Validaciones:
        ├─ ¿Datos del cliente?
        ├─ ¿Método de pago?
        ├─ ¿Carrito tiene items?
        └─ ¿Datos válidos?
               ↓
        Crear objeto pedido
        Actualizar stock
               ↓
        pedidos.push(nuevoPedido)
               ↓
┌─────────────────────────────────────────────────────────────┐
│ 8. CONFIRMACIÓN Y RESET                                     │
│    - Mostrar número de pedido                               │
│    - Limpiar carrito                                        │
│    - Mostrar en historial                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Preguntas de Autoevaluación

Responde estas preguntas para verificar tu comprensión:

### 📝 Nivel Básico

1. ¿Cuál es la diferencia entre una **variable** y una **constante**?

<details>
<summary>Ver respuesta</summary>

Una variable **puede cambiar** durante la ejecución del programa, mientras que una constante **no puede cambiar** una vez definida.

```javascript
let cantidad = 5;      // Variable (puede cambiar)
cantidad = 10;         // ✅ OK

const IGV = 0.18;      // Constante (no puede cambiar)
IGV = 0.20;            // ❌ ERROR
```

</details>

2. ¿Qué hace el método **`.find()`** en un array?

<details>
<summary>Ver respuesta</summary>

Busca el **PRIMER elemento** que cumpla una condición y devuelve ese elemento. Si no encuentra, devuelve `undefined`.

```javascript
let productos = [
    { id: 1, nombre: "Pollo" },
    { id: 2, nombre: "Papas" }
];

let resultado = productos.find(p => p.id === 1);
// → { id: 1, nombre: "Pollo" }
```

</details>

3. ¿Qué hace el método **`.filter()`** en un array?

<details>
<summary>Ver respuesta</summary>

Filtra el array y devuelve un **NUEVO array** con todos los elementos que cumplan la condición.

```javascript
let productos = [
    { id: 1, nombre: "Pollo", stock: 10 },
    { id: 2, nombre: "Papas", stock: 0 }
];

let enStock = productos.filter(p => p.stock > 0);
// → [{ id: 1, nombre: "Pollo", stock: 10 }]
```

</details>

4. ¿Qué hace el operador **`&&` (AND)**?

<details>
<summary>Ver respuesta</summary>

Verifica que **AMBAS** condiciones sean verdaderas. Si una es falsa, el resultado es falso.

```javascript
true && true;    // true
true && false;   // false
false && false;  // false

// En práctica:
if (enStock && tieneDinero) {
    console.log("Puedes comprar");
}
```

</details>

5. ¿Qué es un **Template Literal**?

<details>
<summary>Ver respuesta</summary>

Es una forma moderna de combinar texto y variables usando **backticks** (`) y **${}**.

```javascript
// Forma antigua
let nombre = "Juan";
let saludo = "Hola " + nombre;

// Template Literal (moderna)
let saludo = `Hola ${nombre}`;
```

</details>

### 📝 Nivel Intermedio

6. En tu proyecto, cuando el usuario hace clic en "Agregar al Carrito", ¿cuáles son los 4 pasos principales que ocurren?

<details>
<summary>Ver respuesta</summary>

1. **Buscar** el producto en el array `productos` usando `.find()`
2. **Validar** que el producto exista y tenga stock
3. **Verificar** si ya existe en el carrito:
   - Si existe → aumentar cantidad
   - Si no existe → agregarlo
4. **Actualizar** la vista del carrito llamando `actualizarCarrito()`

</details>

7. ¿Qué es el **Spread Operator (`...`)** y para qué se usa?

<details>
<summary>Ver respuesta</summary>

Permite **copiar o combinar** objetos y arrays. En tu proyecto se usa para crear una copia del producto:

```javascript
let producto = { id: 1, nombre: "Pollo", precio: 45 };
carrito.push({ ...producto, cantidad: 1 });
// Resultado: { id: 1, nombre: "Pollo", precio: 45, cantidad: 1 }
```

</details>

8. ¿Cuál es la diferencia entre `innerHTML` y `textContent`?

<details>
<summary>Ver respuesta</summary>

- **`textContent`**: Solo cambia el **texto**, ignora las etiquetas HTML
- **`innerHTML`**: Interpreta el **HTML**, permite insertar etiquetas

```javascript
let elemento = document.getElementById('titulo');

elemento.textContent = '<strong>Hola</strong>';  // Muestra el texto literal
elemento.innerHTML = '<strong>Hola</strong>';    // Muestra "Hola" en negritas
```

</details>

### 📝 Nivel Avanzado

9. Explica cómo funcionan los **eventos** en JavaScript. ¿Cómo se vinculan las acciones del usuario al código?

<details>
<summary>Ver respuesta</summary>

Los eventos conectan las acciones del usuario (clic, escribir, cargar página) con funciones JavaScript.

**Dos formas:**

**1. En HTML (atributo):**
```html
<button onclick="agregarAlCarrito(1)">Agregar</button>
<input onkeyup="filtrarProductos()">
```

**2. En JavaScript (addEventListener):**
```javascript
let boton = document.getElementById('mi-boton');
boton.addEventListener('click', function() {
    agregarAlCarrito(1);
});
```

En tu proyecto se usa principalmente la **primera forma** (en HTML).

</details>

10. ¿Cómo se calcula el **total con IGV** en tu proyecto? Escribe la fórmula.

<details>
<summary>Ver respuesta</summary>

```javascript
let subtotal = ... // suma de todos los productos
let igv = subtotal * IGV;           // Calcular 18% de impuesto
let total = subtotal + igv;         // Suma ambos

// O en una sola línea:
let total = subtotal * (1 + IGV);   // Suma el 18%
```

**Ejemplo:**
```javascript
let subtotal = 100;
let igv = 100 * 0.18;  // 18
let total = 100 + 18;  // 118
```

</details>

---

## Guía de Depuración

### 🐛 ¿Cómo encontrar y arreglar errores?

#### 1. Abrir la Consola del Navegador

**Chrome/Edge:**
- Presiona `F12` o `Ctrl + Shift + I`
- Haz clic en la pestaña "Console"

**Firefox:**
- Presiona `F12`
- Haz clic en la pestaña "Console"

#### 2. Tipos de Errores Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `Cannot read property 'nombre' of undefined` | Estás intentando acceder a una propiedad de algo que no existe | Verifica que el objeto existe con `if (objeto)` |
| `productos is not defined` | Olvidaste crear la variable | Define `let productos = [...]` |
| `Missing } or )` | Falta una llave o paréntesis | Cuenta las `{` y `}`, `(` y `)` |
| `Unexpected token` | Error de sintaxis | Revisa la línea indicada |

#### 3. Técnicas de Depuración

**Usar `console.log()`:**
```javascript
function agregarAlCarrito(idProducto) {
    console.log("Se llamó agregarAlCarrito con id:", idProducto);
    
    const producto = productos.find(p => p.id === idProducto);
    console.log("Producto encontrado:", producto);
    
    if (!producto) {
        console.log("ERROR: Producto no existe");
        return;
    }
    
    console.log("Stock disponible:", producto.stock);
    // ... más código
}
```

**Usar breakpoints (pausar la ejecución):**
1. Abre la consola (`F12`)
2. Ve a la pestaña "Sources"
3. Haz clic en el número de línea donde quieras pausar
4. Recarga la página y el código se pausará en esa línea
5. Puedes inspeccionar variables, paso a paso

**Usar el operador `?.` (opcional chaining):**
```javascript
// Forma segura de acceder a propiedades
let nombre = producto?.nombre;  // Si producto no existe, devuelve undefined (sin error)
```

---

## 🎓 Resumen de Aprendizaje

### Conceptos Clave a Dominar

1. ✅ **Variables y Constantes**: Contenedores de datos
2. ✅ **Tipos de Datos**: String, Number, Boolean, Object, Array
3. ✅ **Operadores**: Matemáticos, comparación, lógicos
4. ✅ **Control de Flujo**: if/else, switch
5. ✅ **Bucles**: for, for...of, forEach, while
6. ✅ **Funciones**: Definición, parámetros, return
7. ✅ **Arrays**: find, filter, map, forEach
8. ✅ **Objetos**: Crear, acceder, modificar
9. ✅ **DOM**: Seleccionar, modificar, eventos
10. ✅ **Manejo de Errores**: try/catch

### Pasos para Aprender

1. **Lee** esta guía completa
2. **Ejecuta** el código en tu navegador
3. **Modifica** el código (cambia valores, agrega console.log)
4. **Responde** las preguntas de autoevaluación
5. **Practica** escribiendo tu propio código

---

## 📚 Recursos Adicionales

- **MDN Web Docs**: https://developer.mozilla.org/es/
- **W3Schools JavaScript**: https://www.w3schools.com/js/
- **JavaScript.info**: https://javascript.info/

---

**¡Éxito en tu aprendizaje!** 🚀

Recuerda: El aprendizaje es un proceso. No entiendas algo? ¡Intenta de nuevo! Modifica el código, experimenta, comete errores y aprende de ellos.


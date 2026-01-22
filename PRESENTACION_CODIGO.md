# 📊 EXPOSICIÓN DEL CÓDIGO - POLLERÍA CAMPOS CHICLAYO

## Tabla de Contenidos
1. [Introducción](#introducción)
2. [Variables y Constantes](#variables-y-constantes)
3. [Estructuras de Control](#estructuras-de-control)
4. [Métodos de Arrays](#métodos-de-arrays)
5. [Eventos y Salidas](#eventos-y-salidas)
6. [Conclusión](#conclusión)

---

## 📌 Introducción

**Proyecto:** Sistema de Gestión de Pedidos - Pollería Campos Chiclayo

**Objetivo:** Crear una aplicación web interactiva que permita:
- Visualizar productos de la pollería
- Buscar y filtrar productos
- Agregar productos al carrito
- Procesar pedidos
- Generar reportes de ventas

**Tecnologías utilizadas:**
- HTML (estructura)
- CSS (estilos)
- JavaScript (lógica y interactividad)

---

## 1️⃣ VARIABLES Y CONSTANTES

### ¿Qué son?

**Variables (let)** = Datos que pueden cambiar  
**Constantes (const)** = Valores que no pueden cambiar

### Variables Principales

```javascript
// Arrays para almacenar datos
let productos = [
    { id: 1, nombre: "Pollo a la Brasa Entero", precio: 45.00, categoria: "pollos", stock: 15 },
    { id: 2, nombre: "1/2 Pollo a la Brasa", precio: 25.00, categoria: "pollos", stock: 20 },
    { id: 3, nombre: "1/4 Pollo a la Brasa", precio: 15.00, categoria: "pollos", stock: 25 },
    { id: 4, nombre: "Papas Fritas Grande", precio: 8.00, categoria: "acompañamientos", stock: 30 },
    { id: 5, nombre: "Ensalada Fresca", precio: 6.00, categoria: "acompañamientos", stock: 20 },
    { id: 6, nombre: "Inca Kola 1.5L", precio: 5.00, categoria: "bebidas", stock: 40 },
    { id: 7, nombre: "Chicha Morada 1L", precio: 7.00, categoria: "bebidas", stock: 25 },
    { id: 8, nombre: "Arroz Chaufa", precio: 12.00, categoria: "acompañamientos", stock: 15 }
];

let carrito = [];      // Guarda los productos seleccionados
let pedidos = [];      // Historial de pedidos realizados
```

**¿Para qué sirven?**
- `productos`: Almacena toda la información de productos disponibles
- `carrito`: Guarda items que el cliente selecciona (CAMBIA constantemente)
- `pedidos`: Registra todos los pedidos realizados (CRECE con cada venta)

### Constantes Globales

```javascript
const IGV = 0.18;                    // Impuesto del 18%
const DELIVERY_PRECIO = 5.00;        // Costo fijo de delivery
const LOGO_CAMPOS = "https://...";   // URL del logo de la pollería
```

**¿Para qué sirven?**
- `IGV`: Impuesto que SIEMPRE es el 18%
- `DELIVERY_PRECIO`: El delivery SIEMPRE cuesta S/ 5.00
- `LOGO_CAMPOS`: La URL del logo no cambia

### Tabla Resumen

| Variable | Tipo | Propósito | Ejemplo |
|----------|------|----------|---------|
| `productos` | Array | Lista de productos disponibles | `[{id:1, nombre:"Pollo", precio:45}]` |
| `carrito` | Array | Items que cliente selecciona | `[{id:1, cantidad:2}]` |
| `pedidos` | Array | Historial de ventas | `[{numero:"ORD-123", total:100}]` |
| `IGV` | Constante | Impuesto (18%) | `0.18` |
| `DELIVERY_PRECIO` | Constante | Costo delivery | `5.00` |

---

## 2️⃣ ESTRUCTURAS DE CONTROL

### A) CONDICIONALES - IF / ELSE

#### ¿Qué son?
Permiten que el programa TOME DECISIONES basadas en condiciones.

#### Sintaxis Básica
```javascript
if (condición) {
    // Se ejecuta si la condición es VERDADERA
} else {
    // Se ejecuta si la condición es FALSA
}
```

#### Ejemplo 1: Validar si el carrito está vacío

```javascript
// Línea ~178 del app.js
if (carrito.length === 0) {
    carritoItems.innerHTML = '<p class="empty-cart">Carrito vacío</p>';
    ocultarSecciones();
    return;
}
```

**Explicación:**
- Condición: `carrito.length === 0` → ¿Hay 0 items?
- SI es verdad: Mostrar "Carrito vacío" y ocultar formularios
- SI es falso: Continuar mostrando los items

**Flujo visual:**
```
¿El carrito está vacío?
    ├─ SÍ → Mostrar "Carrito vacío"
    └─ NO → Mostrar los items del carrito
```

---

#### Ejemplo 2: Validar stock disponible

```javascript
// Línea ~142 del app.js
if (producto.stock <= 0) {
    throw new Error(`${producto.nombre} sin stock disponible`);
}
```

**Explicación:**
- Condición: `producto.stock <= 0` → ¿No hay stock?
- SI es verdad: Lanzar error "Sin stock"
- SI es falso: Continuar agregando al carrito

---

#### Ejemplo 3: IF...ELSE - Mostrar o ocultar descuento

```javascript
// Línea ~209 del app.js
const descuentoPorcentaje = parseFloat(document.getElementById('descuento').value);

if (descuentoPorcentaje > 0) {
    descuentoItem.style.display = 'flex';  // MOSTRAR descuento
    document.getElementById('desc-porcentaje').textContent = (descuentoPorcentaje * 100).toFixed(0);
    document.getElementById('descuento-monto').textContent = `- S/ ${descuentoMonto.toFixed(2)}`;
} else {
    descuentoItem.style.display = 'none';  // OCULTAR descuento
}
```

**Explicación:**
```
¿Hay descuento?
    ├─ SÍ (> 0) → Mostrar línea de descuento con monto
    └─ NO (= 0) → Ocultar línea de descuento
```

---

#### Ejemplo 4: Validación múltiple

```javascript
// Línea ~308 del app.js
if (!validarCliente()) {
    throw new Error("Por favor complete todos los datos requeridos: mesa, nombre y teléfono");
}
```

**Explicación:**
- Verifica si el cliente llenó TODOS los datos
- Si falta algo → Error

**Función validarCliente():**
```javascript
function validarCliente() {
    const nombre = document.getElementById('cliente-nombre').value;
    const telefono = document.getElementById('cliente-telefono').value;
    const mesa = document.getElementById('numero-mesa').value;
    
    return nombre.trim() !== '' && telefono.trim() !== '' && mesa !== '';
}
```

---

### B) BUCLES - FOR / FOREACH

#### ¿Qué son?
Permiten REPETIR código varias veces (para procesar listas).

#### Tipo 1: FOR...OF (Simple y legible)

```javascript
// Línea ~72 del app.js
for (const producto of productosFiltrados) {
    const productoHTML = `
        <div class="card producto-card">
            <div class="producto-imagen">
                <img src="${producto.imagen}" alt="${producto.nombre}">
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
```

**Explicación:**
- Recorre CADA producto de la lista
- Para cada uno: Crea una tarjeta HTML
- Repite el proceso hasta procesar todos

**Flujo visual:**
```
Para cada producto en la lista:
    Producto 1 → Crear tarjeta → Mostrar
    Producto 2 → Crear tarjeta → Mostrar
    Producto 3 → Crear tarjeta → Mostrar
    ... y así hasta el último producto
```

---

#### Tipo 2: FOREACH (Similar, más funcional)

```javascript
// Línea ~183 del app.js
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    
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
```

**Explicación:**
- Para CADA item en el carrito
- Calcula el subtotal (precio × cantidad)
- Crea y muestra el HTML del item con botones para sumar/restar

---

#### Tipo 3: FOR tradicional (con índice)

```javascript
// Línea ~485 del app.js
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
```

**Explicación:**
- `let i = 0` → Comienza desde 0
- `i < pedidos.length` → Continúa mientras i sea menor que la cantidad de pedidos
- `i++` → Incrementa i en 1 cada vez
- Útil cuando necesitas el índice o acceder por posición

---

### Comparación: IF vs FOR

| Concepto | Uso | Ejemplo |
|----------|-----|---------|
| **IF** | Tomar decisiones | "¿Hay stock?" → Sí/No |
| **IF...ELSE** | Si no, hacer otra cosa | "¿Hay stock? → Sí: Agregar / No: Error" |
| **FOR** | Repetir acciones | "Mostrar 8 productos" → Se repite 8 veces |
| **FOREACH** | Procesar cada item | "Para cada item → Calcular subtotal" |

---

## 3️⃣ MÉTODOS DE ARRAYS

### ¿Qué son?
Herramientas especiales para trabajar con listas (arrays). Permiten BUSCAR, FILTRAR, TRANSFORMAR y CONTAR elementos.

### 1. FIND() - Buscar un elemento

**Sintaxis:**
```javascript
const resultado = array.find(elemento => condición);
```

**Ejemplo del proyecto (Línea ~123):**
```javascript
const producto = productos.find(p => p.id === idProducto);
```

**Explicación:**
- Busca en `productos` el que tenga `id` igual a `idProducto`
- Devuelve el PRIMER elemento que cumple
- Si no encuentra: devuelve `undefined`

**Uso en el código:**
- Se usa para encontrar un producto específico
- Necesario para agregarlo al carrito

---

### 2. FILTER() - Filtrar elementos

**Sintaxis:**
```javascript
const resultado = array.filter(elemento => condición);
```

**Ejemplo del proyecto (Línea ~119):**
```javascript
function obtenerProductosFiltrados() {
    const busqueda = document.getElementById('busqueda').value;
    const categoria = document.getElementById('categoria').value;
    
    const regex = new RegExp(busqueda, 'i');  // Búsqueda insensible a mayúsculas
    
    return productos.filter(producto => {
        const coincideBusqueda = regex.test(producto.nombre);
        const coincideCategoria = categoria === 'todos' || producto.categoria === categoria;
        
        return coincideBusqueda && coincideCategoria;
    });
}
```

**Explicación:**
- Devuelve una NUEVA lista con solo los productos que cumplen
- Si buscas "pollo": solo devuelve productos con "pollo"
- Si filtras por "bebidas": solo devuelve bebidas

---

**Otro ejemplo (Línea ~217):**
```javascript
carrito = carrito.filter(item => item.id !== idProducto);
```

**Explicación:**
- Devuelve un nuevo carrito SIN el producto eliminado
- Mantiene todos EXCEPTO el que tiene ese id

---

### 3. MAP() - Transformar elementos

**Sintaxis:**
```javascript
const resultado = array.map(elemento => transformación);
```

**Ejemplo del proyecto (Línea ~452):**
```javascript
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

**Explicación:**
- Transforma CADA producto
- Si fue comprado: resta la cantidad al stock
- Si NO fue comprado: lo deja igual
- Devuelve una NUEVA lista transformada

---

### 4. FOREACH() - Recorrer elementos

**Sintaxis:**
```javascript
array.forEach(elemento => {
    // Código para cada elemento
});
```

**Ejemplo del proyecto (Línea ~183):**
```javascript
carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    // ... crear HTML y mostrar
});
```

**Explicación:**
- Para CADA item en el carrito
- Ejecuta el código indicado
- NO devuelve nada (solo acciones)

---

### 5. REDUCE() - Sumar/Acumular

**Sintaxis:**
```javascript
const resultado = array.reduce((acumulador, elemento) => {
    return acumulador + transformación;
}, valorInicial);
```

**Ejemplo del proyecto (Línea ~227):**
```javascript
function calcularSubtotal() {
    return carrito.reduce((acumulador, item) => {
        return acumulador + (item.precio * item.cantidad);
    }, 0);
}
```

**Flujo:**
```
Acumulador inicia en 0
Producto 1: 0 + (45 × 2) = 90
Producto 2: 90 + (8 × 1) = 98
Producto 3: 98 + (6 × 2) = 110
Total final: 110
```

---

**Otro ejemplo (Línea ~508):**
```javascript
function calcularStockTotal() {
    return productos.reduce((total, producto) => total + producto.stock, 0);
}
```

**Explicación:**
- Suma el stock de TODOS los productos
- Devuelve el stock total disponible

---

### 6. SORT() - Ordenar elementos

**Ejemplo del proyecto (Línea ~547):**
```javascript
const productosArray = Object.entries(ventasPorProducto)
    .map(([nombre, cantidad]) => ({ nombre, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad)  // Mayor a menor
    .slice(0, 3);  // Solo top 3
```

**Explicación:**
- Ordena por cantidad (mayor primero)
- Luego toma solo los primeros 3
- Muestra el "Top 3 productos más vendidos"

---

### Tabla Resumen de Métodos

| Método | Qué hace | Devuelve | Ejemplo |
|--------|----------|----------|---------|
| **FIND** | Busca 1 elemento | El elemento o undefined | `productos.find(p => p.id === 1)` |
| **FILTER** | Filtra varios | Nueva lista | `productos.filter(p => p.stock > 0)` |
| **MAP** | Transforma cada uno | Nueva lista transformada | `productos.map(p => p.nombre)` |
| **FOREACH** | Recorre todos | Nada (undefined) | `items.forEach(item => console.log(item))` |
| **REDUCE** | Suma/acumula | Un valor único | `items.reduce((sum, item) => sum + item.precio, 0)` |
| **SORT** | Ordena | Array modificado | `items.sort((a,b) => b.cantidad - a.cantidad)` |

---

## 4️⃣ EVENTOS Y SALIDAS

### A) EVENTOS - Acciones del usuario

#### ¿Qué son?
Acciones que dispara el usuario (clic, escribir, cambiar selección).

#### Tipo 1: onclick - Cuando se hace clic

**En HTML:**
```html
<button onclick="agregarAlCarrito(${producto.id})">
    Agregar al Carrito
</button>
```

**En JavaScript:**
```javascript
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push({ ...producto, cantidad: 1 });
    actualizarCarrito();
}
```

**Explicación:**
- Cuando se hace clic en el botón
- Ejecuta `agregarAlCarrito()` pasando el id
- Busca el producto y lo añade al carrito

---

#### Tipo 2: onkeyup - Mientras escribes

**En HTML:**
```html
<input 
    type="text" 
    id="busqueda" 
    placeholder="Buscar..."
    onkeyup="filtrarProductos()"
>
```

**Explicación:**
- Cada vez que sueltas una tecla (después de escribir)
- Ejecuta `filtrarProductos()`
- Los productos se filtran en TIEMPO REAL

---

#### Tipo 3: onchange - Cuando cambias una selección

**En HTML:**
```html
<select id="categoria" onchange="filtrarProductos()">
    <option value="todos">Todos</option>
    <option value="pollos">Pollos</option>
    <option value="bebidas">Bebidas</option>
</select>
```

**Explicación:**
- Cuando cambias la categoría
- Ejecuta `filtrarProductos()` automáticamente
- Muestra solo los productos de esa categoría

---

**Otro ejemplo:**
```html
<select id="numero-mesa" onchange="validarCliente(); calcularTotales();">
    <option value="">Seleccione una mesa</option>
    <option value="1">Mesa 1</option>
    <option value="delivery">Delivery</option>
</select>
```

**Explicación:**
- Ejecuta 2 funciones
- Si selecciona "Delivery": suma el costo al total

---

#### Tipo 4: window.onload - Cuando carga la página

**En JavaScript:**
```javascript
window.onload = function() {
    console.log("=== POLLERÍA CAMPOS CHICLAYO ===");
    console.log("Sistema iniciado correctamente");
    console.log(`Total de productos: ${productos.length}`);
    
    mostrarProductos();
    document.title = "Pollería Campos Chiclayo";
    alert("¡Bienvenido a Pollería Campos Chiclayo! 🍗");
};
```

**Explicación:**
- Se ejecuta automáticamente cuando la página carga
- Muestra productos, títulos y mensaje de bienvenida
- Es el "punto de inicio" del programa

---

### B) SALIDAS - Respuestas del programa

#### ¿Qué son?
Formas en que el programa comunica resultados al usuario.

#### Tipo 1: alert() - Ventana emergente

```javascript
alert("¡Bienvenido a Pollería Campos Chiclayo! 🍗");
```

**Otro ejemplo:**
```javascript
const mensaje = `¡Pedido ${nuevoPedido.numero} registrado exitosamente!

${mesaTexto}
Cliente: ${cliente.nombre}
Total: S/ ${nuevoPedido.total.toFixed(2)}
Método de pago: ${metodoPago}

¡Gracias por su compra!`;

alert(mensaje);
```

**Explicación:**
- Muestra una ventana emergente
- El usuario DEBE hacer clic en "Aceptar" para continuar
- Usa: Mensajes importantes o confirmaciones

---

#### Tipo 2: console.log() - Imprimir en consola

```javascript
console.log("=== POLLERÍA CAMPOS CHICLAYO ===");
console.log("Sistema iniciado correctamente");
console.log(`Total de productos: ${productos.length}`);
console.log(`Producto agregado: ${producto.nombre}`);
console.log(`Total items en carrito: ${carrito.length}`);
```

**Explicación:**
- Muestra mensajes en la consola (F12)
- NO interrumpe la ejecución
- Usa: Debugging y seguimiento

---

**console.table() - Mostrar en tabla:**
```javascript
const estadisticas = [
    ["Métrica", "Valor"],
    ["Total Productos", productos.length],
    ["Total Pedidos", pedidos.length],
    ["Items en Carrito", carrito.length],
    ["Stock Total", calcularStockTotal()],
    ["Ventas Totales", `S/ ${calcularVentasTotales().toFixed(2)}`]
];

console.table(estadisticas);
```

---

#### Tipo 3: Modificar HTML - Actualizar interfaz

**Cambiar texto:**
```javascript
document.getElementById('carrito-count').textContent = carrito.length;
document.getElementById('subtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
```

**Mostrar/ocultar elementos:**
```javascript
document.getElementById('cliente-section').style.display = 'block';
document.getElementById('pago-section').style.display = 'none';
```

**Crear HTML dinámicamente:**
```javascript
const productosGrid = document.getElementById('productos-grid');
productosGrid.innerHTML = '';  // Limpiar

const productoHTML = `
    <div class="card producto-card">
        <h3>${producto.nombre}</h3>
        <span>S/ ${producto.precio.toFixed(2)}</span>
    </div>
`;
productosGrid.innerHTML += productoHTML;
```

**Explicación:**
- `textContent` = cambiar el texto
- `style.display` = mostrar/ocultar
- `innerHTML` = reemplazar contenido HTML
- Permite actualizar la interfaz sin recargar

---

### Flujo Completo: EVENTO → ACCIÓN → SALIDA

```
┌─────────────────────────────────────────────────────────┐
│ Usuario hace clic en "Agregar al Carrito"              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ [EVENTO] onclick dispara agregarAlCarrito(id)          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ [ACCIÓN]                                                │
│ • Buscar el producto en array                           │
│ • Validar stock disponible                              │
│ • Agregar a carrito                                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ [SALIDA]                                                │
│ • console.log("Producto agregado...")                   │
│ • actualizarCarrito() → innerHTML                        │
│ • Mostrar contador del carrito                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│ El usuario VE el producto en su carrito                │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 INTEGRACIÓN DE CONCEPTOS

### Ejemplo Completo: Proceso de Búsqueda

```javascript
// HTML - EVENTO
<input 
    type="text" 
    id="busqueda" 
    placeholder="Buscar..."
    onkeyup="filtrarProductos()"
>

// JavaScript - ACCIÓN
function filtrarProductos() {
    mostrarProductos();  // Llamar función para mostrar
}

// JavaScript - PROCESAMIENTO CON MÉTODOS DE ARRAY
function mostrarProductos() {
    const productosGrid = document.getElementById('productos-grid');
    productosGrid.innerHTML = '';  // Limpiar
    
    // FILTER + FIND = Obtener productos filtrados
    const productosFiltrados = obtenerProductosFiltrados();
    
    // FOR...OF + MAP = Procesar cada producto
    for (const producto of productosFiltrados) {
        const productoHTML = `...`;
        productosGrid.innerHTML += productoHTML;
    }
    
    // IF = Validación
    if (productosFiltrados.length === 0) {
        productosGrid.innerHTML = '<p>No se encontraron productos</p>';
    }
}

// SALIDA: Se actualiza la interfaz en tiempo real
```

---

### Ejemplo Completo: Procesamiento de Pedido

```javascript
// [1] EVENTO: onclick del botón "Procesar Pedido"
<button onclick="procesarPedido()">Procesar Pedido</button>

// [2] ACCIÓN: Procesamiento con múltiples conceptos
function procesarPedido() {
    // IF: Validaciones
    if (carrito.length === 0) {
        throw new Error("El carrito está vacío");
    }
    
    if (!validarCliente()) {
        throw new Error("Datos incompletos");
    }
    
    // MÉTODOS DE ARRAY: REDUCE para calcular total
    const subtotal = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    
    // OBJETOS: Crear estructura de pedido
    const nuevoPedido = {
        numero: generarNumeroOrden(),
        fecha: new Date().toLocaleString('es-PE'),
        items: [...carrito],  // SPREAD OPERATOR
        subtotal: subtotal,
        total: calcularTotal()
    };
    
    // ARRAY METHODS: PUSH para agregar a historial
    pedidos.push(nuevoPedido);
    
    // SALIDAS
    console.log("Pedido procesado:", nuevoPedido);  // console.log
    alert(`¡Pedido ${nuevoPedido.numero} registrado exitosamente!`);  // alert
    
    // MAP: Actualizar stock
    productos = productos.map(producto => {
        const item = carrito.find(i => i.id === producto.id);
        return item ? {...producto, stock: producto.stock - item.cantidad} : producto;
    });
    
    // Limpiar y actualizar interfaz
    limpiarCarrito();
    mostrarHistorial();  // innerHTML: SALIDA
}
```

---

## 🎯 CONCLUSIÓN

### Resumen de Conceptos Utilizados

| Concepto | Función | Impacto |
|----------|---------|--------|
| **Variables** | Guardar datos que cambian | Base de toda la aplicación |
| **Constantes** | Valores fijos reutilizables | Código limpio y mantenible |
| **IF/ELSE** | Tomar decisiones | Control del flujo del programa |
| **FOR/FOREACH** | Repetir acciones | Procesar múltiples datos |
| **MÉTODOS ARRAY** | Manipular listas | Búsqueda, filtrado, transformación |
| **EVENTOS** | Interacción del usuario | Dinamismo de la aplicación |
| **SALIDAS** | Comunicar con usuario | Retroalimentación visual |

### ¿Por qué son importantes?

1. **Variables y Constantes**: Sin ellas no hay datos que procesar
2. **Estructuras de Control**: Sin IF y FOR, el código sería estático
3. **Métodos de Array**: Sin FIND, FILTER, etc., no podríamos buscar/filtrar datos
4. **Eventos**: Sin eventos, la aplicación no sería interactiva
5. **Salidas**: Sin salidas, el usuario no vería resultados

### Impacto en el Proyecto

```
Usuario interactúa (EVENTO)
        ↓
Programa procesa datos (IF, FOR, MÉTODOS ARRAY)
        ↓
Se almacenan en VARIABLES
        ↓
Se calcula con CONSTANTES
        ↓
Se comunica resultado (SALIDA)
        ↓
Interfaz se actualiza (HTML dinámico)
```

---

## 📝 PUNTOS CLAVE PARA LA EXPOSICIÓN

### Enfatizar:

✅ **Funcionalidad completa**: El sistema maneja todo el ciclo de un pedido
✅ **Código limpio**: Uso correcto de variables, métodos, estructuras
✅ **Interactividad**: Eventos que hacen la app dinámica
✅ **Validaciones**: IF para evitar errores
✅ **Eficiencia**: Métodos de array para procesar datos rápidamente
✅ **Usabilidad**: Salidas claras para el usuario (alerts, HTML actualizado)

### Demostración sugerida:

1. Mostrar búsqueda en tiempo real (onkeyup + filter)
2. Agregar producto al carrito (onclick + find + push)
3. Cambiar cantidad (onclick + map)
4. Ver descuento automático (onchange + if + reduce)
5. Procesar pedido completo (try/catch + reduce + push)
6. Ver estadísticas en consola (console.table + reduce)

---

**Última actualización:** 21 de enero de 2026

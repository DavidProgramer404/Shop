// Variables globales
let productosBoleta = [];
let clienteInfo = {
    nombre: "Cliente Consumidor Final",
    rut: "11.111.111-1",
    email: "cliente@email.com"
};

let empresaInfo = {
    nombre: "DAVESTORE.CL",
    rut: "76.123.456-7",
    direccion: "Av. Providencia 1234, Santiago, Chile",
    telefono: "+56 9 9944 2312",
    email: "contacto@davestore.cl",
    web: "www.davestore.cl"
};

// Inicializar boleta
function inicializarBoleta() {
    const datosGuardados = localStorage.getItem('datosBoleta');
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        productosBoleta = datos.productos.map(item => ({
            id: item.id,
            nombre: item.nombre,
            cantidad: item.cantidad,
            precioUnitario: item.precio,
            subtotal: item.precio * item.cantidad
        }));
    }
    
    const numeroBoleta = generarNumeroBoleta();
    document.getElementById('numeroBoleta').textContent = numeroBoleta;
    
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString('es-CL');
    const hora = ahora.toLocaleTimeString('es-CL');
    
    document.getElementById('fechaEmision').textContent = fecha;
    document.getElementById('horaEmision').textContent = hora;
    
    document.getElementById('nombreCliente').textContent = clienteInfo.nombre;
    document.getElementById('rutCliente').textContent = clienteInfo.rut;
    document.getElementById('emailCliente').textContent = clienteInfo.email;
    
    cargarProductos();
    calcularTotales();
    localStorage.removeItem('datosBoleta');
}

// Agregar producto
function agregarProducto() {
    const nombre = document.getElementById('productoNombre').value.trim();
    const cantidad = parseInt(document.getElementById('productoCantidad').value);
    const precio = parseInt(document.getElementById('productoPrecio').value);
    
    if (!nombre) {
        mostrarNotificacion('Por favor ingresa el nombre del producto', 'error');
        return;
    }
    
    if (cantidad <= 0) {
        mostrarNotificacion('La cantidad debe ser mayor a 0', 'error');
        return;
    }
    
    if (precio < 0) {
        mostrarNotificacion('El precio no puede ser negativo', 'error');
        return;
    }
    
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        cantidad: cantidad,
        precioUnitario: precio,
        subtotal: cantidad * precio
    };
    
    productosBoleta.push(nuevoProducto);
    cargarProductos();
    calcularTotales();
    limpiarFormularioProducto();
    mostrarNotificacion('Producto agregado exitosamente');
}

// Limpiar formulario
function limpiarFormularioProducto() {
    document.getElementById('productoNombre').value = '';
    document.getElementById('productoCantidad').value = '1';
    document.getElementById('productoPrecio').value = '';
    document.getElementById('productoNombre').focus();
}

// Eliminar producto
function eliminarProducto(id) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        productosBoleta = productosBoleta.filter(producto => producto.id !== id);
        cargarProductos();
        calcularTotales();
        mostrarNotificacion('Producto eliminado exitosamente');
    }
}

// Editar producto
function editarProducto(id) {
    const producto = productosBoleta.find(p => p.id === id);
    if (!producto) return;
    
    document.getElementById('productoNombre').value = producto.nombre;
    document.getElementById('productoCantidad').value = producto.cantidad;
    document.getElementById('productoPrecio').value = producto.precioUnitario;
    
    eliminarProducto(id);
    
    const boton = document.querySelector('button[onclick="agregarProducto()"]');
    boton.innerHTML = '<i class="bi bi-check-circle"></i> Actualizar Producto';
    boton.onclick = function() {
        agregarProducto();
        boton.innerHTML = '<i class="bi bi-plus-circle"></i> Agregar Producto';
        boton.onclick = agregarProducto;
    };
    
    mostrarNotificacion('Modifica los datos y haz clic en "Actualizar Producto"');
}

// Cargar productos en tabla
function cargarProductos() {
    const tbody = document.getElementById('productosTabla');
    const mensajeVacio = document.getElementById('mensajeVacio');
    
    if (productosBoleta.length === 0) {
        tbody.innerHTML = '';
        mensajeVacio.style.display = 'block';
        return;
    }
    
    mensajeVacio.style.display = 'none';
    let html = '';
    
    productosBoleta.forEach(producto => {
        html += `
            <tr>
                <td>${producto.nombre}</td>
                <td class="text-center">${producto.cantidad}</td>
                <td class="text-end">$${producto.precioUnitario.toLocaleString()}</td>
                <td class="text-end">$${producto.subtotal.toLocaleString()}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1" onclick="editarProducto(${producto.id})" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${producto.id})" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });
    
    tbody.innerHTML = html;
}

// Editar cliente
function editarCliente() {
    document.getElementById('editNombreCliente').value = clienteInfo.nombre;
    document.getElementById('editRutCliente').value = clienteInfo.rut;
    document.getElementById('editEmailCliente').value = clienteInfo.email;
    
    const modal = new bootstrap.Modal(document.getElementById('editarClienteModal'));
    modal.show();
}

// Guardar cliente
function guardarCliente() {
    const nombre = document.getElementById('editNombreCliente').value.trim();
    const rut = document.getElementById('editRutCliente').value.trim();
    const email = document.getElementById('editEmailCliente').value.trim();
    
    if (!nombre || !rut || !email) {
        mostrarNotificacion('Por favor completa todos los campos', 'error');
        return;
    }
    
    clienteInfo.nombre = nombre;
    clienteInfo.rut = rut;
    clienteInfo.email = email;
    
    document.getElementById('nombreCliente').textContent = nombre;
    document.getElementById('rutCliente').textContent = rut;
    document.getElementById('emailCliente').textContent = email;
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('editarClienteModal'));
    modal.hide();
    
    mostrarNotificacion('Información del cliente actualizada exitosamente');
}

// Generar número de boleta
function generarNumeroBoleta() {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');
    const hora = String(fecha.getHours()).padStart(2, '0');
    const minuto = String(fecha.getMinutes()).padStart(2, '0');
    const segundo = String(fecha.getSeconds()).padStart(2, '0');
    
    return `B-${año}${mes}${dia}-${hora}${minuto}${segundo}`;
}

// Calcular totales
function calcularTotales() {
    const subtotal = productosBoleta.reduce((total, producto) => total + producto.subtotal, 0);
    const iva = Math.round(subtotal * 0.19);
    const total = subtotal + iva;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('iva').textContent = `$${iva.toLocaleString()}`;
    document.getElementById('total').textContent = `$${total.toLocaleString()}`;
}

// Descargar boleta
function descargarBoleta() {
    if (productosBoleta.length === 0) {
        mostrarNotificacion('No hay productos para generar la boleta', 'error');
        return;
    }
    
    const contenido = generarContenidoTXT();
    const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boleta_${document.getElementById('numeroBoleta').textContent}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    mostrarNotificacion('Boleta descargada exitosamente');
}

// Generar contenido TXT
function generarContenidoTXT() {
    const numeroBoleta = document.getElementById('numeroBoleta').textContent;
    const fechaEmision = document.getElementById('fechaEmision').textContent;
    const horaEmision = document.getElementById('horaEmision').textContent;
    const nombreCliente = document.getElementById('nombreCliente').textContent;
    const rutCliente = document.getElementById('rutCliente').textContent;
    const emailCliente = document.getElementById('emailCliente').textContent;
    const subtotal = document.getElementById('subtotal').textContent;
    const iva = document.getElementById('iva').textContent;
    const total = document.getElementById('total').textContent;
    
    let contenido = '';
    
    contenido += '='.repeat(50) + '\n';
    contenido += '                    DAVESTORE.CL\n';
    contenido += '              Tu Tienda Gaming de Confianza\n';
    contenido += '='.repeat(50) + '\n\n';
    
    contenido += 'INFORMACIÓN DE LA EMPRESA:\n';
    contenido += `RUT: ${empresaInfo.rut}\n`;
    contenido += `Dirección: ${empresaInfo.direccion}\n`;
    contenido += `Teléfono: ${empresaInfo.telefono}\n`;
    contenido += `Email: ${empresaInfo.email}\n`;
    contenido += `Web: ${empresaInfo.web}\n\n`;
    
    contenido += 'INFORMACIÓN DE LA BOLETA:\n';
    contenido += `Número de Boleta: ${numeroBoleta}\n`;
    contenido += `Fecha de Emisión: ${fechaEmision}\n`;
    contenido += `Hora de Emisión: ${horaEmision}\n\n`;
    
    contenido += 'INFORMACIÓN DEL CLIENTE:\n';
    contenido += `Nombre: ${nombreCliente}\n`;
    contenido += `RUT: ${rutCliente}\n`;
    contenido += `Email: ${emailCliente}\n\n`;
    
    contenido += 'DETALLE DE PRODUCTOS:\n';
    contenido += '-'.repeat(50) + '\n';
    contenido += 'PRODUCTO'.padEnd(30) + 'CANT'.padStart(5) + 'PRECIO'.padStart(8) + 'SUBTOTAL'.padStart(10) + '\n';
    contenido += '-'.repeat(50) + '\n';
    
    productosBoleta.forEach(producto => {
        const nombreCorto = producto.nombre.length > 28 ? producto.nombre.substring(0, 25) + '...' : producto.nombre;
        contenido += nombreCorto.padEnd(30) + 
                    String(producto.cantidad).padStart(5) + 
                    `$${producto.precioUnitario.toLocaleString()}`.padStart(8) + 
                    `$${producto.subtotal.toLocaleString()}`.padStart(10) + '\n';
    });
    
    contenido += '-'.repeat(50) + '\n';
    
    contenido += '\nTOTALES:\n';
    contenido += `Subtotal: ${subtotal}\n`;
    contenido += `IVA (19%): ${iva}\n`;
    contenido += `TOTAL: ${total}\n\n`;
    
    contenido += 'INFORMACIÓN ADICIONAL:\n';
    contenido += 'Método de Pago: Transferencia Bancaria\n';
    contenido += 'Estado de Pago: Pagado\n';
    contenido += 'Vendedor: Equipo DaveStore\n';
    contenido += 'Condiciones: Pago al contado\n\n';
    
    contenido += 'TÉRMINOS Y CONDICIONES:\n';
    contenido += '• Garantía: Todos nuestros productos cuentan con garantía de fábrica\n';
    contenido += '• Devoluciones: Aceptamos devoluciones dentro de los 30 días\n';
    contenido += '• Soporte Técnico: Ofrecemos soporte técnico gratuito por 6 meses\n';
    contenido += '• Envío: Los productos se envían dentro de 24-48 horas hábiles\n\n';
    
    contenido += '='.repeat(50) + '\n';
    contenido += '¡Gracias por elegir DaveStore.cl!\n';
    contenido += 'Para consultas: +56 9 9944 2312 | contacto@davestore.cl\n';
    contenido += 'www.davestore.cl\n';
    contenido += '='.repeat(50) + '\n';
    
    return contenido;
}

// Imprimir boleta
function imprimirBoleta() {
    if (productosBoleta.length === 0) {
        mostrarNotificacion('No hay productos para imprimir la boleta', 'error');
        return;
    }
    window.print();
}

// Mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    const notificacion = document.createElement('div');
    notificacion.className = 'position-fixed top-0 end-0 p-3';
    notificacion.style.zIndex = '9999';
    
    const bgClass = tipo === 'error' ? 'bg-danger' : 'bg-success';
    
    notificacion.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header ${bgClass} text-white">
                <strong class="me-auto">DaveStore</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${mensaje}
            </div>
        </div>
    `;
    
    document.body.appendChild(notificacion);
    
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.parentNode.removeChild(notificacion);
        }
    }, 3000);
}

// Contactar soporte
function contactarSoporte() {
    const mensaje = encodeURIComponent('Hola, necesito soporte técnico con mi compra o servicio.');
    const whatsappNumber = "+56999442312";
    window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`);
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('username');
    window.location.href = '../welcome.html';
}

// Verificar autenticación
function checkAuth() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = '../welcome.html';
    } else {
        document.getElementById('userDisplay').textContent = `¡Hola, ${username}!`;
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    inicializarBoleta();
    
    document.getElementById('productoNombre').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarProducto();
        }
    });
    
    document.getElementById('productoPrecio').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            agregarProducto();
        }
    });
}); 
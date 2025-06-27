// Manejar el formulario de suscripción
document.addEventListener("DOMContentLoaded", function () {
  const formsSubscripcion = document.querySelectorAll("footer form");

  formsSubscripcion.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email) {
        alert(
          "¡Gracias por suscribirte! Te mantendremos informado de nuestras novedades."
        );
        this.reset();
      } else {
        alert("Por favor ingresa un email válido");
      }
    });
  });

  // Animación para el botón de WhatsApp
  const whatsappBtn = document.querySelector(".whatsapp-float");
  if (whatsappBtn) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 100) {
        whatsappBtn.style.opacity = "1";
      } else {
        whatsappBtn.style.opacity = "0.8";
      }
    });
  }

  // Animación para las cards de productos
  const productCards = document.querySelectorAll(".card");
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.transition = "transform 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Manejador del modal de proyectos
  const projectModal = document.getElementById('projectModal');
  if (projectModal) {
    projectModal.addEventListener('show.bs.modal', function(event) {
      const button = event.relatedTarget;
      const title = button.getAttribute('data-title');
      const desc = button.getAttribute('data-desc');
      const img = button.getAttribute('data-img');

      const modalTitle = this.querySelector('#projectModalLabel');
      const modalDesc = this.querySelector('#projectDesc');
      const modalImg = this.querySelector('#projectImg');

      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalImg.src = img;
      modalImg.alt = title;
    });
  }
});

// envio del plan paginas web 


function compartirPlan() {
    const planSelector = document.getElementById('planSelector');
    const selectedPlan = planSelector.options[planSelector.selectedIndex];
    const planName = selectedPlan.getAttribute('data-plan-name');
    const planDescription = selectedPlan.getAttribute('data-plan-description');
    
    // Añadir saludo y solicitud de más información
    const message = `
        ¡Hola! Estoy interesado en el plan ${planName}.
        Me gustaría obtener más información y cotizar este plan.
        Descripción del plan: ${planDescription}
        Por favor, proporciona más detalles.
    `;
    
    const encodedMessage = encodeURIComponent(message);
    
    // Añade tu número de WhatsApp aquí
    const whatsappNumber = "+56999442312"; // Reemplaza con tu número
    
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
}

// Verificar autenticación
function checkAuth() {
  const username = localStorage.getItem('username');
  if (!username) {
    window.location.href = 'welcome.html';
  } else {
    document.getElementById('userDisplay').textContent = `¡Hola, ${username}!`;
  }
}

// Función para cerrar sesión
function logout() {
  localStorage.removeItem('username');
  window.location.href = 'welcome.html';
}

// Verificar al cargar la página
window.onload = checkAuth;



// mostrar y ocultar descripcion ul

function mostrarDescripcion() {
  var texto = document.getElementById("mas-info");
  var enlace = document.querySelector("a");
  
  // Si el texto está oculto, se muestra
  if (texto.style.display === "none") {
    texto.style.display = "inline";
    enlace.innerHTML = "Leer menos";
  } else {
    // Si el texto está visible, se oculta
    texto.style.display = "none";
    enlace.innerHTML = "Leer más";
  }
}

function mostrarDescripcion1() {
  var texto = document.getElementById("mas-info1");
  var enlace = document.querySelector("a");
  
  // Si el texto está oculto, se muestra
  if (texto.style.display === "none") {
    texto.style.display = "inline";
    enlace.innerHTML = "Leer menos";
  } else {
    // Si el texto está visible, se oculta
    texto.style.display = "none";
    enlace.innerHTML = "Leer más";
  }
}


function mostrarDescripcion2() {
  var texto = document.getElementById("mas-info2");
  var enlace = document.querySelector("a");
  
  // Si el texto está oculto, se muestra
  if (texto.style.display === "none") {
    texto.style.display = "inline";
    enlace.innerHTML = "Leer menos";
  } else {
    // Si el texto está visible, se oculta
    texto.style.display = "none";
    enlace.innerHTML = "Leer más";
  }
}

// Variables globales para el carrito
let carrito = [];
let productos = [
  {
    id: 1,
    nombre: "Joystick Mando Control Xbox 360 Pc Cable",
    precio: 25500,
    stock: 300,
    imagen: "./assets/img/productos/xbox360joystick.jpg"
  },
  {
    id: 2,
    nombre: "Teclado Generico",
    precio: 10000,
    stock: 100,
    imagen: "./assets/img/productos/TecladoGenerico.png"
  },
  {
    id: 3,
    nombre: "Mouse Inalambrico Acer L173 Pila",
    precio: 17000,
    stock: 10,
    imagen: "./assets/img/productos/mouseInalambrico.png"
  }
];

// Función para agregar producto al carrito
function agregarAlCarrito(productoId) {
  const producto = productos.find(p => p.id === productoId);
  if (!producto) return;

  const itemExistente = carrito.find(item => item.id === productoId);
  
  if (itemExistente) {
    if (itemExistente.cantidad < producto.stock) {
      itemExistente.cantidad++;
    } else {
      alert('No hay más stock disponible para este producto');
      return;
    }
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }
  
  actualizarCarrito();
  mostrarNotificacion('Producto agregado al carrito');
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
  const itemsCarrito = document.getElementById('itemsCarrito');
  const cantidadCarrito = document.getElementById('cantidadCarrito');
  const totalCarrito = document.getElementById('totalCarrito');
  
  if (!itemsCarrito) return;
  
  // Actualizar cantidad en el badge
  const totalItems = carrito.reduce((total, item) => total + item.cantidad, 0);
  cantidadCarrito.textContent = totalItems;
  
  // Actualizar lista de items
  if (carrito.length === 0) {
    itemsCarrito.innerHTML = '<p class="text-muted">No hay productos en el carrito</p>';
    totalCarrito.textContent = '$0';
    return;
  }
  
  let html = '';
  let total = 0;
  
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    html += `
      <div class="d-flex align-items-center mb-3 p-2 border rounded carrito-item">
        <img src="${item.imagen}" alt="${item.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="me-3">
        <div class="flex-grow-1">
          <h6 class="mb-0">${item.nombre}</h6>
          <small class="text-muted">$${item.precio.toLocaleString()}</small>
        </div>
        <div class="d-flex align-items-center">
          <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, -1)">-</button>
          <span class="mx-2">${item.cantidad}</span>
          <button class="btn btn-sm btn-outline-secondary" onclick="cambiarCantidad(${item.id}, 1)">+</button>
          <button class="btn btn-sm btn-outline-danger ms-2" onclick="eliminarDelCarrito(${item.id})">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `;
  });
  
  itemsCarrito.innerHTML = html;
  totalCarrito.textContent = `$${total.toLocaleString()}`;
}

// Función para cambiar cantidad de un producto
function cambiarCantidad(productoId, cambio) {
  const item = carrito.find(item => item.id === productoId);
  if (!item) return;
  
  const nuevaCantidad = item.cantidad + cambio;
  const producto = productos.find(p => p.id === productoId);
  
  if (nuevaCantidad <= 0) {
    eliminarDelCarrito(productoId);
  } else if (nuevaCantidad <= producto.stock) {
    item.cantidad = nuevaCantidad;
    actualizarCarrito();
  } else {
    alert('No hay suficiente stock disponible');
  }
}

// Función para eliminar producto del carrito
function eliminarDelCarrito(productoId) {
  carrito = carrito.filter(item => item.id !== productoId);
  actualizarCarrito();
  mostrarNotificacion('Producto eliminado del carrito');
}

// Función para procesar la compra
function procesarCompra() {
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }
  
  generarCotizacion();
}

// Función para generar cotización
function generarCotizacion() {
  const total = carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  
  let cotizacion = `
*COTIZACIÓN DAVESTORE.CL*

📋 *Productos cotizados:*
`;
  
  carrito.forEach(item => {
    cotizacion += `
• ${item.nombre}
  Cantidad: ${item.cantidad}
  Precio unitario: $${item.precio.toLocaleString()}
  Subtotal: $${(item.precio * item.cantidad).toLocaleString()}
`;
  });
  
  cotizacion += `
💰 *Total: $${total.toLocaleString()}*

📞 *Para proceder con la compra, contacta a nuestro equipo de ventas:*
• WhatsApp: +56 9 9944 2312
• Email: contacto@davestore.cl

⏰ *Esta cotización es válida por 24 horas*

¡Gracias por elegir DaveStore.cl! 🎮
`;
  
  // Codificar el mensaje para WhatsApp
  const encodedMessage = encodeURIComponent(cotizacion);
  const whatsappNumber = "+56999442312"; // Reemplaza con tu número real
  
  // Abrir WhatsApp con la cotización
  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
  
  // Limpiar carrito después de generar cotización
  carrito = [];
  actualizarCarrito();
  
  // Cerrar el offcanvas del carrito
  const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('carritoCompras'));
  if (offcanvas) {
    offcanvas.hide();
  }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje) {
  // Crear elemento de notificación
  const notificacion = document.createElement('div');
  notificacion.className = 'position-fixed top-0 end-0 p-3';
  notificacion.style.zIndex = '9999';
  notificacion.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header">
        <strong class="me-auto">DaveStore</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${mensaje}
      </div>
    </div>
  `;
  
  document.body.appendChild(notificacion);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    if (notificacion.parentNode) {
      notificacion.parentNode.removeChild(notificacion);
    }
  }, 3000);
}

// Función para contactar soporte
function contactarSoporte() {
  const mensaje = encodeURIComponent('Hola, necesito soporte técnico con mi compra o servicio.');
  const whatsappNumber = "+56999442312"; // Reemplaza con tu número real
  window.open(`https://wa.me/${whatsappNumber}?text=${mensaje}`);
}

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  actualizarCarrito();
  
  // Los botones ya tienen onclick handlers específicos, no necesitamos agregar event listeners adicionales
  console.log('Carrito inicializado correctamente');
});

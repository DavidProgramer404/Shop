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

  // Manejar botones de "Agregar al carrito"
  const botonesCarrito = document.querySelectorAll(".btn-primary");
  botonesCarrito.forEach((boton) => {
    if (boton.textContent === "Agregar al carrito") {
      boton.addEventListener("click", function () {
        alert("Producto agregado al carrito exitosamente");
      });
    }
  });
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
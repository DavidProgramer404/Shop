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

//  Script para manejar el login

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const navbarNav = document.getElementById("navbarNav");

  // Verificar si hay un usuario guardado
  const username = localStorage.getItem("username");
  if (username) {
    agregarBotonCerrarSesion(username);
  } else {
    agregarBotonIniciarSesion();
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("username", username);
    agregarBotonCerrarSesion(username);
    bootstrap.Modal.getInstance(document.getElementById("loginModal")).hide();
  });

  function agregarBotonIniciarSesion() {
    const loginLi = document.createElement("li");
    loginLi.className = "nav-item";
    loginLi.innerHTML = `<a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>`;
    navbarNav.querySelector("ul").appendChild(loginLi);
  }

  function agregarBotonCerrarSesion(username) {
    const ul = navbarNav.querySelector("ul");
    // Remover botón de inicio de sesión si existe
    const loginButton = ul.querySelector("li:last-child");
    if (loginButton) {
      loginButton.remove();
    }

    const userLi = document.createElement("li");
    userLi.className = "nav-item dropdown";
    userLi.innerHTML = `
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        ${username}
                    </a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" id="cerrarSesion">Cerrar Sesión</a></li>
                    </ul>
                `;
    ul.appendChild(userLi);

    document
      .getElementById("cerrarSesion")
      .addEventListener("click", function () {
        localStorage.removeItem("username");
        userLi.remove();
        agregarBotonIniciarSesion();
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

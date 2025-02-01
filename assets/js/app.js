// Manejar el formulario de suscripción
document.addEventListener('DOMContentLoaded', function() {
    const formsSubscripcion = document.querySelectorAll('footer form');
    
    formsSubscripcion.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if(email) {
                alert('¡Gracias por suscribirte! Te mantendremos informado de nuestras novedades.');
                this.reset();
            } else {
                alert('Por favor ingresa un email válido');
            }
        });
    });

    // Animación para el botón de WhatsApp
    const whatsappBtn = document.querySelector('.whatsapp-float');
    if(whatsappBtn) {
        window.addEventListener('scroll', function() {
            if(window.scrollY > 100) {
                whatsappBtn.style.opacity = '1';
            } else {
                whatsappBtn.style.opacity = '0.8';
            }
        });
    }

    // Animación para las cards de productos
    const productCards = document.querySelectorAll('.card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Manejar botones de "Agregar al carrito"
    const botonesCarrito = document.querySelectorAll('.btn-primary');
    botonesCarrito.forEach(boton => {
        if(boton.textContent === 'Agregar al carrito') {
            boton.addEventListener('click', function() {
                alert('Producto agregado al carrito exitosamente');
            });
        }
    });
});


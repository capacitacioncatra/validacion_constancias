// script.js

// Espera a que todo el contenido de la página se cargue primero
document.addEventListener('DOMContentLoaded', function() {
    
    // --- LÓGICA PARA LA PÁGINA DE VERIFICACIÓN DE CONSTANCIA ---
    const verificationSection = document.querySelector('.certificate-section');

    // Este código solo se ejecutará si estamos en la página de la constancia (index.html)
    if (verificationSection) {
        
        // 1. Leer el folio de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const folio = urlParams.get('folio');

        // 2. Buscar los datos en nuestra "base de datos"
        const datos = constanciasData[folio];

        // 3. Comprobar si se encontraron datos
        if (datos) {
            // ¡Constancia Válida! Rellenamos los campos.
            document.getElementById('status-badge').textContent = 'AUTÉNTICO';
            document.getElementById('status-badge').style.backgroundColor = '#28a745'; // Color verde

            document.getElementById('participante-nombre').textContent = datos.nombre;
            document.getElementById('participante-curp').textContent = datos.curp;
            document.getElementById('participante-curso').textContent = datos.curso;
            document.getElementById('participante-duracion').textContent = datos.duracion;
            document.getElementById('participante-calificacion').textContent = datos.calificacion;
            document.getElementById('participante-fecha').textContent = datos.fecha;
            document.getElementById('participante-folio').textContent = datos.folio;

        } else {
            // ¡Constancia NO Válida! Mostramos un mensaje de error.
            document.getElementById('status-badge').textContent = 'NO VÁLIDO';
            document.getElementById('status-badge').style.backgroundColor = '#E60000'; // Color rojo
            
            // Ocultamos la tabla de datos y mostramos un error
            const dataContainer = document.querySelector('.participant-data');
            dataContainer.innerHTML = `<p style="text-align: center; font-size: 1.2em; color: #E60000;">El folio <strong>${folio || 'desconocido'}</strong> no fue encontrado en nuestros registros. Por favor, verifique la constancia.</p>`;
        }
    }


    // --- (Aquí abajo sigue tu código existente para el carrusel y las pestañas) ---
    // ...
});
// Espera a que todo el contenido de la página se cargue primero
document.addEventListener('DOMContentLoaded', function() {
            
    // 1. Seleccionar todas las pestañas y todas las secciones de contenido
    const tabs = document.querySelectorAll('.tabs-nav li');
    const contents = document.querySelectorAll('.tab-content');

    // 2. Ocultar todos los contenidos excepto el primero al cargar la página
    contents.forEach((content, index) => {
        if (index !== 0) { // Si no es el primer elemento
            content.style.display = 'none';
        }
    });

    // 3. Añadir un "oyente" de clics a cada pestaña
    tabs.forEach(tab => {
        tab.addEventListener('click', function(event) {
            // Prevenir el comportamiento por defecto del enlace
            event.preventDefault();

            // Quitar la clase 'active' de todas las pestañas
            tabs.forEach(item => item.classList.remove('active'));
            // Añadir la clase 'active' solo a la pestaña que se le hizo clic
            this.classList.add('active');

            // Ocultar todos los contenidos
            contents.forEach(content => {
                content.style.display = 'none';
            });

            // Mostrar solo el contenido correspondiente a la pestaña clickeada
            const targetId = this.querySelector('a').getAttribute('href');
            const targetContent = document.querySelector(targetId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });
    // 1. Seleccionar los elementos del carrusel del DOM
const carouselImages = document.querySelectorAll('.carousel-images img');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageCounter = document.getElementById('page-counter');

// 2. Comprobar si los elementos del carrusel existen en la página
if (carouselImages.length > 0) {

    let currentIndex = 0; // El índice de la imagen que se está mostrando (empezando en 0)
    const totalImages = carouselImages.length;

    // 3. Función para actualizar lo que se ve en el carrusel
    function updateCarousel() {
        // Ocultar todas las imágenes quitando la clase 'active'
        carouselImages.forEach(img => {
            img.classList.remove('active');
        });

        // Mostrar la imagen actual añadiendo la clase 'active'
        carouselImages[currentIndex].classList.add('active');

        // Actualizar el contador de páginas (sumamos 1 porque los índices empiezan en 0)
        pageCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
    }

    // 4. Añadir evento al botón "Siguiente"
    nextBtn.addEventListener('click', () => {
        // Aumentar el índice
        currentIndex++;
        // Si llegamos al final, volver al principio
        if (currentIndex >= totalImages) {
            currentIndex = 0;
        }
        // Mostrar la nueva imagen
        updateCarousel();
    });

    // 5. Añadir evento al botón "Anterior"
    prevBtn.addEventListener('click', () => {
        // Disminuir el índice
        currentIndex--;
        // Si estamos en el principio, ir al final
        if (currentIndex < 0) {
            currentIndex = totalImages - 1;
        }
        // Mostrar la nueva imagen
        updateCarousel();
    });

    // 6. Llamar a la función una vez al principio para mostrar la primera imagen
    updateCarousel();
}
// --- LÓGICA PARA EL GENERADOR DE CÓDIGOS QR ---
const generateBtn = document.getElementById('generate-btn');

// Este código solo se ejecutará si estamos en la página del generador
if (generateBtn) {
    const folioInput = document.getElementById('folio-input');
    const qrContainer = document.getElementById('qrcode-container');
    const downloadLink = document.getElementById('download-link');
    let qrCode = null; // Variable para mantener la instancia del QR

    generateBtn.addEventListener('click', () => {
        const folio = folioInput.value.trim();

        if (!folio) {
            alert('Por favor, introduce un folio.');
            return;
        }

        
        // Para pruebas locales, la URL es la ruta al archivo
        const baseUrl = "file:///D:/Archivos Universidad/Residencia/Catra/index.html";
        
        // Cuando se tenga el dominio real 
        //const baseUrl = "https://www.catra.com.mx/verificar.html"; // 

        const fullUrl = `${baseUrl}?folio=${folio}`;

        // Limpiar el contenedor antes de generar un nuevo QR
        qrContainer.innerHTML = "";
        
        // Crear una nueva instancia de QR
        qrCode = new QRCode(qrContainer, {
            text: fullUrl,
            width: 256,
            height: 256,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });

        // Hacer que el QR sea descargable (esperamos un poco para que se genere)
        setTimeout(() => {
            const qrCanvas = qrContainer.querySelector('canvas');
            if (qrCanvas) {
                downloadLink.href = qrCanvas.toDataURL("image/png");
                downloadLink.download = `qr-${folio}.png`; // Nombre del archivo
                downloadLink.style.display = 'block'; // Mostrar el enlace de descarga
            }
        }, 100); // 100 milisegundos de espera
    });
}   
    // =======================================================
    // --- LÓGICA PARA ACTIVAR LAS ANIMACIONES DE ENTRADA ---
    // =======================================================
    const elementsToAnimate = document.querySelectorAll('.header-block, .partner-logos, .main-content-layout, .brand-section, .certificate-section');
    
    if (elementsToAnimate.length > 0) {
        
        elementsToAnimate.forEach(element => {
            element.classList.add('animate-on-load');
        });
    }

}); 

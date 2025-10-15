// script.js

// ÚNICO BLOQUE QUE ENVUELVE TODO EL CÓDIGO
document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE DIAGNÓSTICO ---
    console.log("¡Script principal cargado!");

    // Inicializar carga de datos desde Google Sheets
    initializeData().then(() => {
        console.log("📊 Datos listos, ejecutando lógica de la página");
        ejecutarLogicaPagina();
    });
});

// Función que contiene toda la lógica de la página
function ejecutarLogicaPagina() {

    // =======================================================
    // --- LÓGICA PARA LA PÁGINA DE VERIFICACIÓN (index.html) ---
    // =======================================================
    const verificationSection = document.querySelector('.certificate-section');
    if (verificationSection) {
        // console.log("Estoy en la página de la constancia");
        const urlParams = new URLSearchParams(window.location.search);
        const folio = urlParams.get('folio');
        const datos = constanciasData[folio];

        if (datos) {
            document.getElementById('status-badge').textContent = 'AUTÉNTICO';
            document.getElementById('status-badge').style.backgroundColor = '#28a745';
            document.getElementById('participante-nombre').textContent = datos.nombre;
            document.getElementById('participante-curp').textContent = datos.curp;
            document.getElementById('participante-curso').textContent = datos.curso;
            document.getElementById('participante-duracion').textContent = datos.duracion;
            document.getElementById('participante-calificacion').textContent = datos.calificacion;
            document.getElementById('participante-fecha').textContent = datos.fecha;
            document.getElementById('participante-folio').textContent = datos.folio;

            const validationButton = document.getElementById('instructor-link');
            if (validationButton && datos.instructorId) {
                validationButton.href = `https://manue-777.github.io/Pagina_Catra/instructor.html?id=${datos.instructorId}`;
            }
        } else {
            document.getElementById('status-badge').textContent = 'NO VÁLIDO';
            document.getElementById('status-badge').style.backgroundColor = '#E60000';
            const dataContainer = document.querySelector('.participant-data');
            dataContainer.innerHTML = `<p style="text-align: center; font-size: 1.2em; color: #E60000;">El folio <strong>${folio || 'desconocido'}</strong> no fue encontrado.</p>`;
        }
    }

    // =======================================================
    // --- LÓGICA PARA LA PÁGINA DEL INSTRUCTOR (instructor.html) ---
    // =======================================================
const instructorPage = document.getElementById('carousel-images-container');
if (instructorPage) {

    // PARTE 1: Rellenar los datos dinámicos
    const urlParams = new URLSearchParams(window.location.search);
    const instructorId = urlParams.get('id');
    const datos = instructoresData[instructorId];

    if (datos) {
        // Rellenar datos si se encontraron
        document.title = `Registro Profesional de ${datos.nombre} - CATRA`;
        document.getElementById('instructor-nombre').textContent = datos.nombre;
        document.getElementById('instructor-resumen').innerHTML = datos.resumen;

        const carouselContainer = document.getElementById('carousel-images-container');
        carouselContainer.innerHTML = '';
        datos.cv_paginas.forEach((pagina, index) => {
            const img = document.createElement('img');
            img.src = `images/${pagina}`;
            img.alt = `CV de ${datos.nombre} - Página ${index + 1}`;
            if (index === 0) img.classList.add('active');
            carouselContainer.appendChild(img);
        });

        const credentialsContainer = document.getElementById('credentials-list-container');
        credentialsContainer.innerHTML = '';
        datos.certificaciones.forEach(cert => {
            const li = document.createElement('li');
            li.innerHTML = cert;
            credentialsContainer.appendChild(li);
        });

        const generalitiesContainer = document.getElementById('generalities-list-container');
generalitiesContainer.innerHTML = ''; // Limpiar el contenedor
generalitiesContainer.className = 'general-info-list'; // Asignar la clase principal

// Iterar sobre cada propiedad en el objeto 'generalidades'
for (const [label, value] of Object.entries(datos.generalidades)) {

    // Comprobar si el valor es una LISTA (Array)
    if (Array.isArray(value)) {
        // --- Si es una lista, crear el layout vertical para certificaciones ---
        
        const certsDiv = document.createElement('div');
        certsDiv.className = 'info-item-vertical'; // Clase para el layout especial

        // Construir el HTML interno de la lista <ul>
        const certsListHTML = value.map(cert => `<li>${cert}</li>`).join('');

        certsDiv.innerHTML = `
            <span class="info-label">${label}:</span>
            <div class="info-value-list">
                <ul>${certsListHTML}</ul>
            </div>
        `;
        generalitiesContainer.appendChild(certsDiv);

    } else {
        // --- Si NO es una lista (es texto normal), crear el layout horizontal ---
        
        const itemDiv = document.createElement('div');
        itemDiv.className = 'info-item'; // Clase para la fila horizontal
        itemDiv.innerHTML = `
            <span class="info-label">${label}:</span>
            <span class="info-value">${value}</span>
        `;
        generalitiesContainer.appendChild(itemDiv);
    }
}
    } else {
        // Manejar error si el ID no es válido
        const contentContainer = document.querySelector('.panel-content');
        contentContainer.innerHTML = `<h1 style="color: #E60000;">Instructor no encontrado</h1><p>El ID <strong>${instructorId || 'desconocido'}</strong> no corresponde a nuestros registros.</p>`;
    }

    // PARTE 2: Activar la interactividad (SIEMPRE se ejecuta en esta página)

    // --- Lógica de Pestañas ---
    const tabs = document.querySelectorAll('.tabs-nav li');
    const contents = document.querySelectorAll('.tab-content');
    
    // Ocultar todos los contenidos excepto el primero
    contents.forEach((content, index) => {
        if (index !== 0) {
            content.style.display = 'none';
        }
    });

    // Añadir evento de clic a cada pestaña
    tabs.forEach(tab => {
        tab.addEventListener('click', event => {
            event.preventDefault();
            tabs.forEach(item => item.classList.remove('active'));
            tab.classList.add('active');
            contents.forEach(content => content.style.display = 'none');
            const targetContent = document.querySelector(tab.querySelector('a').getAttribute('href'));
            if (targetContent) targetContent.style.display = 'block';
        });
    });

    // --- Lógica del Carrusel ---
    const carouselImages = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const pageCounter = document.getElementById('page-counter');
    
    if (carouselImages.length > 0) {
        let currentIndex = 0;
        const totalImages = carouselImages.length;

        function updateCarousel() {
            carouselImages.forEach((img, index) => {
                img.classList.toggle('active', index === currentIndex);
            });
            pageCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
        }
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateCarousel();
        });
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateCarousel();
        });
        
        updateCarousel(); // Inicializar
    } else {
        pageCounter.textContent = "0 / 0";
    }
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
        //const baseUrl = "file:///D:/Archivos Universidad/Residencia/Catra/index.html";
        
        // Cuando se tenga el dominio real 
        const baseUrl = "https://Manue-777.github.io/Pagina_Catra/index.html"; // 

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

} // Fin de ejecutarLogicaPagina()

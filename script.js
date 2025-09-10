// script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // =======================================================
    // --- LÓGICA PARA LA PÁGINA DE VERIFICACIÓN (index.html) ---
    // =======================================================
    const verificationSection = document.querySelector('.certificate-section');
    if (verificationSection) {
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

            const validationButton = document.querySelector('a[href*="instructor.html"]');
            if (validationButton && datos.instructorId) {
                validationButton.href = `instructor.html?id=${datos.instructorId}`;
            }
        } else {
            document.getElementById('status-badge').textContent = 'NO VÁLIDO';
            document.getElementById('status-badge').style.backgroundColor = '#E60000';
            const dataContainer = document.querySelector('.participant-data');
            dataContainer.innerHTML = `<p style="text-align: center; font-size: 1.2em; color: #E60000;">El folio <strong>${folio || 'desconocido'}</strong> no fue encontrado en nuestros registros.</p>`;
        }
    }

    // =======================================================
    // --- LÓGICA PARA LA PÁGINA DEL INSTRUCTOR (instructor.html) ---
    // =======================================================
    const instructorPage = document.querySelector('.panel-layout');
    if (instructorPage) {
        const urlParams = new URLSearchParams(window.location.search);
        const instructorId = urlParams.get('id');
        const datos = instructoresData[instructorId];

        if (datos) {
            // Rellenar datos dinámicos
            document.title = `Registro Profesional de ${datos.nombre} - CATRA`;
            document.getElementById('instructor-nombre').textContent = datos.nombre;
            document.getElementById('instructor-resumen').innerHTML = datos.resumen;

            // Rellenar Carrusel de CVs
            const carouselContainer = document.getElementById('carousel-images-container');
            carouselContainer.innerHTML = ''; // Limpiar por si acaso
            datos.cv_paginas.forEach((pagina, index) => {
                const img = document.createElement('img');
                img.src = `images/${pagina}`;
                img.alt = `CV de ${datos.nombre} - Página ${index + 1}`;
                if (index === 0) img.classList.add('active');
                carouselContainer.appendChild(img);
            });

            // Rellenar Lista de Certificaciones
            const credentialsContainer = document.getElementById('credentials-list-container');
            credentialsContainer.innerHTML = ''; // Limpiar
            datos.certificaciones.forEach(cert => {
                const li = document.createElement('li');
                li.innerHTML = cert;
                credentialsContainer.appendChild(li);
            });

            // Rellenar Lista de Generalidades
            const generalitiesContainer = document.getElementById('generalities-list-container');
            generalitiesContainer.innerHTML = ''; // Limpiar
            for (const [label, value] of Object.entries(datos.generalidades)) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'detail-item-v';
                itemDiv.innerHTML = `<span class="detail-label-v">${label}:</span><p class="detail-value-v">${value}</p>`;
                generalitiesContainer.appendChild(itemDiv);
            }

            // --- Lógica del Carrusel (SOLO para la página del instructor) ---
            const carouselImages = document.querySelectorAll('.carousel-images img');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            const pageCounter = document.getElementById('page-counter');
            let currentIndex = 0;
            const totalImages = carouselImages.length;

            function updateCarousel() {
                carouselImages.forEach((img, index) => {
                    img.classList.toggle('active', index === currentIndex);
                });
                pageCounter.textContent = `${currentIndex + 1} / ${totalImages}`;
            }

            if(totalImages > 0) {
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
           

            // --- Lógica de Pestañas (SOLO para la página del instructor) ---
            const tabs = document.querySelectorAll('.tabs-nav li');
            const contents = document.querySelectorAll('.tab-content');
            tabs.forEach((tab, index) => {
                if (index !== 0) contents[index].style.display = 'none';
                tab.addEventListener('click', event => {
                    event.preventDefault();
                    tabs.forEach(item => item.classList.remove('active'));
                    tab.classList.add('active');
                    contents.forEach(content => content.style.display = 'none');
                    const targetContent = document.querySelector(tab.querySelector('a').getAttribute('href'));
                    if (targetContent) targetContent.style.display = 'block';
                });
            });

        } else {
            const contentContainer = document.querySelector('.panel-content');
            contentContainer.innerHTML = `<h1 style="color: #E60000;">Instructor no encontrado</h1><p>El ID <strong>${instructorId || 'desconocido'}</strong> no corresponde a nuestros registros.</p>`;
        }
    }

    // =======================================================
    // --- LÓGICA PARA EL GENERADOR DE QR (generador_qr.html) ---
    // =======================================================
    const generateBtn = document.getElementById('generate-btn');
    if (generateBtn) {
        const folioInput = document.getElementById('folio-input');
        const qrContainer = document.getElementById('qrcode-container');
        const downloadLink = document.getElementById('download-link');
        
        generateBtn.addEventListener('click', () => {
            const folio = folioInput.value.trim();
            if (!folio) {
                alert('Por favor, introduce un folio.');
                return;
            }
            // CORRECCIÓN: Usar la URL correcta del repositorio
            const baseUrl = "https://manue-777.github.io/Pagina_Catra/index.html"; 
            const fullUrl = `${baseUrl}?folio=${folio}`;
            
            qrContainer.innerHTML = "";
            new QRCode(qrContainer, { text: fullUrl, width: 256, height: 256 });

            setTimeout(() => {
                const qrCanvas = qrContainer.querySelector('canvas');
                if (qrCanvas) {
                    downloadLink.href = qrCanvas.toDataURL("image/png");
                    downloadLink.download = `qr-${folio}.png`;
                    downloadLink.style.display = 'block';
                }
            }, 100);
        });
    }   

    // =======================================================
    // --- LÓGICA PARA LAS ANIMACIONES DE ENTRADA (EN TODAS LAS PÁGINAS) ---
    // =======================================================
    const elementsToAnimate = document.querySelectorAll('.header-block, .partner-logos, .main-content-layout, .brand-section, .certificate-section');
    if (elementsToAnimate.length > 0) {
        elementsToAnimate.forEach(element => element.classList.add('animate-on-load'));
    }

});
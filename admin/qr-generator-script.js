// admin/qr-generator-script.js
// Script específico para el generador de QR (no necesita cargar datos de Google Sheets)

document.addEventListener('DOMContentLoaded', function() {
    console.log("✅ Generador de QR cargado");

    const generateBtn = document.getElementById('generate-btn');
    const folioInput = document.getElementById('folio-input');
    const qrContainer = document.getElementById('qrcode-container');
    const downloadLink = document.getElementById('download-link');
    let qrCode = null;

    if (!generateBtn) {
        console.error("❌ No se encontró el botón de generar");
        return;
    }

    generateBtn.addEventListener('click', () => {
        const folio = folioInput.value.trim();

        if (!folio) {
            alert('Por favor, introduce un folio válido.');
            return;
        }

        // URL de producción de GitHub Pages
        const baseUrl = "https://Manue-777.github.io/Pagina_Catra/index.html";
        const fullUrl = `${baseUrl}?folio=${folio}`;

        console.log("🔗 Generando QR para:", fullUrl);

        // Limpiar el contenedor antes de generar un nuevo QR
        qrContainer.innerHTML = "";

        // Crear una nueva instancia de QR
        qrCode = new QRCode(qrContainer, {
            text: fullUrl,
            width: 256,
            height: 256,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Hacer que el QR sea descargable
        setTimeout(() => {
            const qrCanvas = qrContainer.querySelector('canvas');
            if (qrCanvas) {
                downloadLink.href = qrCanvas.toDataURL("image/png");
                downloadLink.download = `qr-${folio}.png`;
                downloadLink.style.display = 'block';
                console.log("✅ QR generado correctamente");
            } else {
                console.error("❌ No se pudo generar el canvas del QR");
            }
        }, 100);
    });

    // Permitir generar con Enter
    folioInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            generateBtn.click();
        }
    });
});

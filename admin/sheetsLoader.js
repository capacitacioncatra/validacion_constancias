// admin/sheetsLoader.js
// Funciones para cargar y parsear datos desde Google Sheets

// Variables globales que reemplazarán a constanciasData e instructoresData
let constanciasData = {};
let instructoresData = {};

/**
 * Parsea una fila CSV respetando comillas
 */
function parseCSVRow(row) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < row.length; i++) {
        const char = row[i];
        const nextChar = row[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current.trim());
    return result;
}

/**
 * Convierte CSV a array de objetos
 */
function csvToArray(csv) {
    const lines = csv.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = parseCSVRow(lines[0]);
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        const obj = {};

        headers.forEach((header, index) => {
            obj[header] = values[index] || '';
        });

        result.push(obj);
    }

    return result;
}

/**
 * Carga datos de constancias desde Google Sheets
 */
async function loadConstanciasData() {
    try {
        const response = await fetch(SHEETS_CONFIG.constancias);
        const csv = await response.text();
        const rows = csvToArray(csv);

        // Convertir array a objeto indexado por folio
        constanciasData = {};
        rows.forEach(row => {
            if (row.Folio) {
                constanciasData[row.Folio] = {
                    nombre: row.Nombre || '',
                    curp: row.CURP || row.Curp || '',
                    curso: row.Curso || '',
                    duracion: row.Duracion || '',
                    calificacion: row.Calificacion || '',
                    fecha: row.Fecha || '',
                    folio: row.Folio || '',
                    // Soportar tanto "InstructorID" como "Instructor Id"
                    instructorId: row.InstructorID || row['Instructor Id'] || ''
                };
            }
        });

        console.log('✅ Constancias cargadas:', Object.keys(constanciasData).length);
        return true;
    } catch (error) {
        console.error('❌ Error al cargar constancias:', error);
        return false;
    }
}

/**
 * Carga datos de instructores desde Google Sheets
 */
async function loadInstructoresData() {
    try {
        const response = await fetch(SHEETS_CONFIG.instructores);
        const csv = await response.text();
        const rows = csvToArray(csv);

        // Convertir array a objeto indexado por ID
        instructoresData = {};
        rows.forEach(row => {
            if (row.ID) {
                // Procesar certificaciones (separadas por |)
                const certificaciones = row.Certificaciones
                    ? row.Certificaciones.split('|').map(cert => cert.trim())
                    : [];

                // Procesar cédulas (separadas por |)
                const cedulas = row.Cedulas
                    ? row.Cedulas.split('|').map(ced => ced.trim())
                    : [];

                // Detectar si es PDF o imágenes
                let cv_tipo = 'imagenes'; // por defecto
                let cv_contenido = [];

                // Soportar tanto "CV_PDF" como "CV PDF"
                const cvPdfField = row.CV_PDF || row['CV PDF'] || '';
                const cvPaginasField = row.CV_Paginas || row['CV Paginas'] || '';

                if (cvPdfField && cvPdfField.trim()) {
                    // Si hay un PDF, usar ese
                    cv_tipo = 'pdf';
                    cv_contenido = cvPdfField.trim();
                } else if (cvPaginasField && cvPaginasField.trim()) {
                    // Si hay páginas de imágenes, usar esas
                    cv_tipo = 'imagenes';
                    cv_contenido = cvPaginasField.split('|').map(page => page.trim());
                }

                instructoresData[row.ID] = {
                    nombre: row.Nombre || '',
                    especialidad: row.Especialidad || '',
                    cv_tipo: cv_tipo,
                    cv_paginas: cv_tipo === 'imagenes' ? cv_contenido : [],
                    cv_pdf: cv_tipo === 'pdf' ? cv_contenido : '',
                    certificaciones: certificaciones,
                    resumen: row.Resumen || '',
                    generalidades: {
                        "Nombre completo": row.Nombre || '',
                        "Curp:": row.CURP || row.Curp || '',
                        "Folio": row.ID || '',
                        "Especialidad": row.Especialidad || '',
                        "Certificaciones": cedulas
                    }
                };
            }
        });

        console.log('✅ Instructores cargados:', Object.keys(instructoresData).length);
        return true;
    } catch (error) {
        console.error('❌ Error al cargar instructores:', error);
        return false;
    }
}

/**
 * Inicializa la carga de todos los datos
 */
async function initializeData() {
    console.log('🔄 Cargando datos desde Google Sheets...');

    const [constanciasLoaded, instructoresLoaded] = await Promise.all([
        loadConstanciasData(),
        loadInstructoresData()
    ]);

    if (constanciasLoaded && instructoresLoaded) {
        console.log('✅ Todos los datos cargados correctamente');
        // Disparar evento personalizado para que el script principal sepa que los datos están listos
        document.dispatchEvent(new Event('dataLoaded'));
        return true;
    } else {
        console.error('❌ Error al cargar algunos datos');
        return false;
    }
}

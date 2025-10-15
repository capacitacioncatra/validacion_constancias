# 📋 Historial de Cambios - Sistema CATRA

## [2025-10-15] - Soporte para CV en PDF

### ✨ Nuevo
- **Soporte para PDFs**: Ahora los CVs de instructores pueden ser un solo archivo PDF en lugar de múltiples imágenes
- **Detección automática**: El sistema detecta automáticamente si el CV es PDF o imágenes
- **Visor de PDF integrado**: Se agregó un visualizador de PDF embebido con iframe

### 🔧 Mejoras
- **Más fácil de gestionar**: Solo necesitas subir 1 archivo PDF en lugar de múltiples imágenes
- **Mejor calidad**: Los PDFs mantienen mejor calidad y el texto es seleccionable
- **Retrocompatibilidad**: Los CVs con imágenes existentes siguen funcionando

### 📝 Cambios Técnicos
- Actualizado `instructor.html` con contenedor para PDF
- Modificado `sheetsLoader.js` para detectar columna "CV PDF"
- Actualizado `script.js` con lógica para mostrar PDF o imágenes
- Agregados estilos CSS para el visor de PDF
- Documentación actualizada en `GUIA_ADMINISTRADOR.md`

### 🎯 Cómo Usar
En Google Sheets, agrega una columna **"CV PDF"** con la ruta al archivo PDF:
```
../Images/CVs/NombreInstructor/CV_Completo.pdf
```

Si prefieres usar imágenes, sigue usando la columna **"CV Paginas"** como antes.

---

## [2025-10-15] - Corrección botón Validación Oficial

### 🐛 Corregido
- El botón "Validación Oficial" ahora redirige correctamente al perfil del instructor
- Solucionado problema con el nombre de columna "Instructor Id" vs "InstructorID"

### 🔧 Cambios
- `sheetsLoader.js` ahora soporta ambos formatos de nombres de columna

---

## [2025-10-14] - Generador de QR optimizado

### ✨ Nuevo
- Generador de QR accesible desde cualquier computadora vía web
- Interfaz mejorada con instrucciones claras
- Script independiente que no requiere cargar datos de Google Sheets

### 🌐 URL
```
https://Manue-777.github.io/Pagina_Catra/admin/Qr_generator.html
```

---

## [2025-10-14] - Integración con Google Sheets

### ✨ Nuevo
- **Gestión de datos vía Google Sheets**: Ya no es necesario editar archivos de código
- **Actualización automática**: Los cambios en Google Sheets se reflejan instantáneamente
- **Facilidad de uso**: Cualquier persona puede agregar constancias e instructores sin conocimientos técnicos

### 📝 Archivos Creados
- `admin/config.js` - Configuración de URLs de Google Sheets
- `admin/sheetsLoader.js` - Cargador de datos desde Google Sheets
- `GUIA_ADMINISTRADOR.md` - Documentación completa para administradores
- `INSTRUCCIONES_PRUEBA.md` - Guía de pruebas para desarrolladores

### 🔧 Archivos Modificados
- `index.html` - Actualizado para cargar desde Google Sheets
- `instructor.html` - Actualizado para cargar desde Google Sheets
- `script.js` - Modificado para esperar carga de datos

### ⚠️ Archivos Obsoletos
- `admin/Data.js` - Reemplazado por Google Sheets
- `admin/Instructors.js` - Reemplazado por Google Sheets

---

## Leyenda
- ✨ **Nuevo**: Funcionalidad nueva
- 🔧 **Mejoras**: Optimizaciones y mejoras
- 🐛 **Corregido**: Bugs solucionados
- 📝 **Documentación**: Cambios en docs
- ⚠️ **Deprecated**: Funcionalidad obsoleta

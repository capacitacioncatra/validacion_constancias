# 🧪 Instrucciones para Probar el Sistema con Google Sheets

## ✅ Cambios Realizados

El sistema ahora lee los datos directamente desde **Google Sheets** en lugar de archivos JavaScript estáticos.

### Archivos Nuevos:
- ✅ `admin/config.js` - Configuración con las URLs de Google Sheets
- ✅ `admin/sheetsLoader.js` - Código que carga datos desde Google Sheets
- ✅ `GUIA_ADMINISTRADOR.md` - Documentación para el administrador

### Archivos Modificados:
- ✅ `index.html` - Actualizado para usar el nuevo sistema
- ✅ `instructor.html` - Actualizado para usar el nuevo sistema
- ✅ `script.js` - Modificado para esperar carga de datos desde Google Sheets

### Archivos Antiguos (YA NO SE USAN):
- ❌ `admin/Data.js` - Ahora los datos vienen de Google Sheets
- ❌ `admin/Instructors.js` - Ahora los datos vienen de Google Sheets

---

## 🧪 Cómo Probar Localmente

### 1. Abrir con Live Server (Recomendado)

**IMPORTANTE**: Debido a las restricciones CORS de los navegadores, debes usar un servidor local.

#### Opción A: Live Server en VS Code
1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"
4. El navegador se abrirá automáticamente

#### Opción B: Servidor HTTP de Python
```bash
# En la carpeta del proyecto, ejecuta:
python -m http.server 8000

# Luego abre en el navegador:
# http://localhost:8000/index.html?folio=CATRA-2025-00147123
```

#### Opción C: Servidor HTTP de Node.js
```bash
# Instala http-server globalmente (solo una vez):
npm install -g http-server

# En la carpeta del proyecto, ejecuta:
http-server -p 8000

# Luego abre en el navegador:
# http://localhost:8000/index.html?folio=CATRA-2025-00147123
```

### 2. URLs de Prueba

#### Verificar Constancia:
```
http://localhost:8000/index.html?folio=CATRA-2025-00147123
```

#### Ver Perfil de Instructor:
```
http://localhost:8000/instructor.html?id=inst001
```

### 3. Abrir la Consola del Navegador

Para ver si los datos se cargan correctamente:

1. Presiona **F12** para abrir las Developer Tools
2. Ve a la pestaña **Console**
3. Deberías ver mensajes como:
   ```
   ¡Script principal cargado!
   🔄 Cargando datos desde Google Sheets...
   ✅ Constancias cargadas: 2
   ✅ Instructores cargados: 1
   ✅ Todos los datos cargados correctamente
   📊 Datos listos, ejecutando lógica de la página
   ```

---

## 🚀 Subir a GitHub Pages

Una vez que pruebes localmente y todo funcione:

### 1. Agregar los cambios a Git:
```bash
git add .
git commit -m "Integración con Google Sheets para gestión de datos"
git push origin main
```

### 2. Verificar en GitHub Pages:
Espera unos minutos y prueba:

**Constancia:**
```
https://Manue-777.github.io/Pagina_Catra/index.html?folio=CATRA-2025-00147123
```

**Instructor:**
```
https://Manue-777.github.io/Pagina_Catra/instructor.html?id=inst001
```

---

## 📝 Agregar Nuevos Datos

### Para el Administrador:

1. **Abre las hojas de Google Sheets** (comparte los enlaces de edición con el administrador)
2. **Agrega una nueva fila** con los datos
3. **Guarda** (se guarda automáticamente)
4. **Espera unos segundos** y recarga la página web
5. **¡Listo!** Los nuevos datos aparecerán automáticamente

**Ver la guía completa en:** `GUIA_ADMINISTRADOR.md`

---

## 🔧 Solución de Problemas

### ❌ Error CORS al abrir index.html directamente
**Problema:** Los navegadores bloquean peticiones a Google Sheets desde archivos locales (`file://`)

**Solución:** Usa un servidor local (Live Server, Python, o Node.js)

### ❌ Los datos no se cargan
**Verificar:**
1. ¿Las hojas de Google Sheets están **publicadas en la web**?
2. ¿Las URLs en `admin/config.js` son correctas?
3. ¿Hay errores en la consola del navegador?

### ❌ "Folio no encontrado" o "Instructor no encontrado"
**Verificar:**
1. ¿El folio/ID está escrito correctamente en Google Sheets?
2. ¿La columna se llama exactamente "Folio" o "ID"?
3. ¿Los datos están en la primera hoja de cada documento?

---

## 📞 Contacto

Si encuentras algún problema, revisa la consola del navegador para ver los errores y contacta al desarrollador.

**Última actualización:** Octubre 2025

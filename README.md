# Ejecución del Frontend en Local

Este documento describe cómo instalar, configurar y ejecutar el frontend del proyecto en tu entorno local. El frontend está desarrollado en React y utiliza herramientas modernas del ecosistema JavaScript.

## Requisitos Previos

Antes de comenzar, asegúrate de cumplir con los siguientes requisitos:

- **Node.js** (versión 16 o superior): Puedes descargarlo desde [Node.js Official Website](https://nodejs.org/).
- **npm**: Instalado junto con Node.js para manejar paquetes.

Opcional:
- **yarn**: Un gestor de paquetes alternativo (opcional).

## Instalación del Proyecto

1. Clona el repositorio del proyecto a tu máquina local:
   ```
   git clone https://github.com/usuario/repo-frontend.git
   cd repo-frontend
   ```

2. Instala las dependencias necesarias ejecutando:
   ```
   npm install
   ```
   Si prefieres usar `yarn`:
   ```
   yarn install
   ```

## Configuración para la Ejecución en Local

Verifica que el archivo `.env` esté correctamente configurado para conectarse al backend. Si no existe, crea un archivo `.env` en la raíz del proyecto con un contenido similar al siguiente:

```
REACT_APP_BACKEND_URL=http://localhost:8000
```

Esto asegura que el frontend pueda comunicarse con el backend alojado en tu máquina o en un servidor local.

## Iniciar el Servidor de Desarrollo

1. Ejecuta el siguiente comando para iniciar el servidor de desarrollo:
   ```
   npm start
   ```
   O, si estás usando `yarn`:
   ```
   yarn start
   ```

2. Una vez iniciado, el servidor estará disponible en tu navegador en la dirección:
   ```
   http://localhost:3000
   ```

## Solución de Problemas Comunes

1. **El servidor no inicia:**
   - Verifica que no haya otro proceso utilizando el puerto 3000.
   - Si el puerto está ocupado, puedes cambiarlo utilizando la variable `PORT` en el archivo `.env`.

2. **Error de conexión al backend:**
   - Asegúrate de que el backend esté corriendo en `http://localhost:8000` o en la URL configurada en `REACT_APP_BACKEND_URL`.

3. **Dependencias faltantes:**
   - Ejecuta nuevamente `npm install` o `yarn install` para reinstalar los paquetes.

4. **Problemas con el navegador:**
   - Limpia el caché o prueba abriendo la aplicación en modo incógnito.

## Dependencias Clave

El proyecto utiliza las siguientes herramientas y bibliotecas principales:

- **React**: Biblioteca principal para construir interfaces de usuario.
- **React Router Dom**: Navegación entre páginas.
- **axios**: Manejo de solicitudes HTTP.
- **react-big-calendar**: Componente de calendario interactivo.
- **moment.js**: Manejo de fechas y horarios.

Para una lista completa de dependencias, consulta el archivo `package.json` 

---

Con esta guía, deberías poder ejecutar el frontend en tu entorno local sin problemas. Si necesitas ayuda adicional, no dudes en consultar la documentación del proyecto o ponerte en contacto con el equipo de desarrollo.






# **Comenzando con Create React App**

Este proyecto fue inicializado con [Create React App](https://github.com/facebook/create-react-app).

---

## **Scripts Disponibles**

En el directorio del proyecto, puedes ejecutar:

### **`npm start`**
Ejecuta la aplicación en modo desarrollo.  
Abre **[http://localhost:3000](http://localhost:3000)** para verlo en tu navegador.

- La página **se recargará automáticamente** cuando hagas cambios.
- También podrás ver cualquier **error de ESLint** en la consola.

---

### **`npm test`**
Ejecuta el corredor de pruebas en modo interactivo.  
Consulta la sección sobre [ejecutar pruebas](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

---

### **`npm run build`**
Construye la aplicación para producción en la carpeta `build`.  

- Agrupa correctamente **React** en modo producción.
- Optimiza la construcción para obtener el **mejor rendimiento**.

La construcción está:
- **Minimizada**
- Los nombres de los archivos incluyen **hashes** para facilitar el almacenamiento en caché.

Tu aplicación está **lista para ser desplegada**.  
Consulta la sección sobre [despliegue](https://facebook.github.io/create-react-app/docs/deployment) para más información.

---

### **`npm install -g serve`**
Instala la herramienta **serve** globalmente para servir tu aplicación de forma estática.

### **`serve -s build`**
Sirve la aplicación desde la carpeta `build`. Esto es útil para probar el proyecto después de construirlo.

---

### **`npm run eject`**

> **⚠️ Nota: Esta es una operación irreversible. Una vez que ejecutes `eject`, ¡no puedes revertirla!**

Si no estás satisfecho con las configuraciones de las herramientas de construcción, puedes ejecutar `eject` en cualquier momento.  
Esto:
- **Elimina la dependencia única** del proyecto.
- Copia todos los archivos de configuración y dependencias transitivas directamente en tu proyecto.

A partir de aquí, tendrás **control total**, pero también serás **responsable** de mantener la configuración.  
No necesitas usar `eject` en la mayoría de los casos.

---

## **Aprende Más**

Puedes aprender más en la [documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para aprender React, consulta la [documentación oficial de React](https://reactjs.org/).

---

## **Secciones Adicionales**

### **División de Código (Code Splitting)**
Esta sección está aquí: [Code Splitting](https://facebook.github.io/create-react-app/docs/code-splitting).

---

### **Análisis del Tamaño del Paquete**
Consulta: [Analyzing Bundle Size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size).

---

### **Creación de una Aplicación Web Progresiva (PWA)**
Consulta: [Making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

---

### **Configuración Avanzada**
Consulta: [Advanced Configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration).

---

### **Errores en `npm run build`**
Consulta: [Troubleshooting `npm run build`](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).

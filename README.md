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

















# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Demand Management Frontend# Getting Started with Create React App

Una aplicación React con TypeScript para la gestión de demandas empresariales, desarrollada siguiendo las mejores prácticas de desarrollo frontend.This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 🚀 Características## Available Scripts

- **React 18** con TypeScript para type safetyIn the project directory, you can run:

- **Material-UI v7** para componentes de interfaz de usuario

- **React Router v6** para navegación### `npm start`

- **Axios** para consumo de APIs

- **Arquitectura modular** y escalableRuns the app in the development mode.\

- **Variables de entorno** para configuración dinámicaOpen [http://localhost:3000](http://localhost:3000) to view it in the browser.

- **Responsive design** adaptable a dispositivos móviles

The page will reload if you make edits.\

## 📁 Estructura del ProyectoYou will also see any lint errors in the console.

```### `npm test`

src/

├── components/ # Componentes reutilizablesLaunches the test runner in the interactive watch mode.\

│ ├── common/ # Componentes comunes (LoadingSpinner, ErrorMessage)See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

│ └── layout/ # Componentes de diseño (Header, Sidebar, Layout)

├── hooks/ # Custom hooks### `npm run build`

├── pages/ # Páginas de la aplicación

│ └── demand/ # Páginas específicas de demandasBuilds the app for production to the `build` folder.\

├── router/ # Configuración de rutasIt correctly bundles React in production mode and optimizes the build for the best performance.

├── services/ # Servicios para consumo de APIs

├── theme/ # Configuración del tema Material-UIThe build is minified and the filenames include the hashes.\

├── types/ # Definiciones de tipos TypeScriptYour app is ready to be deployed!

└── utils/ # Utilidades y funciones auxiliares

````See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## 🛠️ Instalación y Configuración### `npm run eject`



### Prerrequisitos**Note: this is a one-way operation. Once you `eject`, you can’t go back!**



- Node.js (v16 o superior)If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

- npm o yarn

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

### Configuración de Variables de Entorno

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

Crea un archivo `.env` en la raíz del proyecto con:

## Learn More

```env

REACT_APP_API_BASE_URL=https://localhost:7243You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

REACT_APP_API_VERSION=v1

REACT_APP_APP_NAME=Demand Management SystemTo learn React, check out the [React documentation](https://reactjs.org/).

REACT_APP_APP_VERSION=1.0.0
````

## 🚀 Scripts Disponibles

### `npm start`

Inicia la aplicación en modo desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en el navegador.

### `npm run build`

Construye la aplicación para producción en la carpeta `build`.

### `npm test`

Ejecuta las pruebas en modo interactivo.

## 🔧 Configuración de la API

La aplicación consume una API REST desde `https://localhost:7243/swagger/index.html`

### Endpoints Principales

- `GET /api/demands` - Obtener lista de demandas
- `GET /api/demands/:id` - Obtener demanda específica
- `POST /api/demands` - Crear nueva demanda
- `PUT /api/demands/:id` - Actualizar demanda
- `DELETE /api/demands/:id` - Eliminar demanda

## 📱 Funcionalidades

- **Dashboard**: Vista general con estadísticas
- **Gestión de Demandas**: CRUD completo con búsqueda y filtros
- **Menú Responsive**: Navegación adaptable a dispositivos móviles
- **Routing**: Navegación fluida entre páginas
- **TypeScript**: Tipado estricto para mejor desarrollo

## 📋 Estados de Demanda

- **PENDING**: Pendiente
- **IN_PROGRESS**: En Progreso
- **COMPLETED**: Completado
- **CANCELLED**: Cancelado
- **ON_HOLD**: En Espera

## 🎯 Prioridades

- **LOW**: Baja
- **MEDIUM**: Media
- **HIGH**: Alta
- **URGENT**: Urgente

---

**Desarrollado con ❤️ usando React + TypeScript + Material-UI**

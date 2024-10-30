# Red Social Básica - Frontend

Bienvenido a la Red Social Básica, un proyecto diseñado para facilitar la interacción y conexión entre usuarios en un entorno social en línea. Este backend ofrece una serie de características clave para gestionar la experiencia del usuario:

## Características

Registro y Autenticación de Usuarios: Permite a los nuevos usuarios registrarse y acceder a su cuenta de forma segura mediante autenticación basada en JWT (JSON Web Tokens).

Gestión de Seguidores: Los usuarios pueden seguir a otros usuarios y ser seguidos, creando una red personalizada y facilitando la interacción.

Publicaciones: Los usuarios pueden crear y compartir publicaciones.

Visualización de Contenido: Los usuarios pueden explorar las publicaciones de quienes siguen y de las personas registradas en la red social, manteniéndose actualizados sobre las actividades de sus amigos y conexiones.

Actualización de Perfil: Los usuarios tienen la capacidad de actualizar su perfil, incluyendo la opción de añadir una imagen de perfil, lo que mejora la personalización y la representación en la red.

Diseño Responsive: La interfaz se adapta a diferentes tamaños de pantalla.

## Tabla de Contenidos

- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Uso](#uso)

## Tecnologías

- **React**: Biblioteca de JavaScript para construir interfaces de usuario interactivas.
- **Vite**: Herramienta de construcción y desarrollo que permite un entorno de desarrollo rápido y optimizado.
- **Axios**: Cliente HTTP para realizar solicitudes a la API del backend.
- **React Router**: Para la navegación entre diferentes vistas y componentes.
- **SweetAlert2**: Para mostrar alertas y notificaciones estilizadas.
- **CSS**: Para el diseño y estilo de la aplicación.
- **JWT**: Para la autenticación y manejo de sesiones en el cliente.


## Instalación

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. Clona este repositorio en tu máquina local:

    ```bash
    git clone https://github.com/NestSanabria/social-network-frontend.git
    ```

2. Navega al directorio del proyecto:

    ```bash
    cd frontend_social_network
    ```

3. Instala las dependencias del proyecto utilizando npm:

    ```bash
    npm install
    ```

4. Crea una carpeta en la raíz del proyecto llamada: .env: configura las variables de entorno con el string de conexión a la API (Backend), así

    ```bash
    VITE_API_URL=http://localhost:3900/api/
    ```

## Ejecución del Proyecto

1. Inicia el servidor de desarrollo:

    ```bash
    npm run dev
    ```

2. Abre tu navegador y ve a:

    ```
    http://localhost:5173  (revisa el número de tu puerto en la consola donde iniciaste el servidor de desarrollo)
    ```

> [!NOTE]
> Asegúrate de tener Node.js y npm instalados en tu máquina antes de iniciar el proyecto.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Compila la aplicación para producción.
- `npm run preview`: Pre-visualiza la aplicación compilada.

> [!TIP]
> Utiliza `npm run build` antes de desplegar la aplicación en un entorno de producción para optimizar el rendimiento.

## Backend

Este frontend está diseñado para trabajar con una API REST desarrollada en Node.js. Puedes encontrar el repositorio del backend en el siguiente enlace:

[API REST para Red Social (Backend)](https://github.com/NestSanabria/social-network-backend.git)

> [!IMPORTANT]
> Asegúrate de tener la API REST en funcionamiento para que el frontend pueda comunicarse correctamente con el backend.

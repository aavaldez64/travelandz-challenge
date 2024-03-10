# Travelandz API

Este es el backend para la aplicación del desafío de Travelandz. Ha sido desarrollado siguiendo principios de Clean Architecture

# Requisitos

- NodeJS v.18 o superior
- Docker
- MongoDB docker image:

```bash
$ docker pull mongo:6.0.6
```

- Esta app está desarrollada mediante pnpm, el cual se puede instalar con el siguiente comando:

```bash
$ npm install -g pnpm
```

# Instalación

1. Clonar el repositorio
2. Instalar las dependencias

```bash
$ pnpm install
```

3. Copiar el archivo .env.template y renombrar a .env para establecer las variables de entorno. Modificar su contenido como sea necesario.

4. Levantar base de datos con docker

```bash
$ docker-compose up -d
```

5. Ejecutar el proyecto en modo de desarrollo

```bash
$ pnpm dev
```

# Utils

- Generar semilla para JWT

```bash
# Usando OpenSLL
$ openssl rand -base64 32

# Usando NodeJS
$ node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
```

# Stack

- NodeJS v20
- Typescript
- Express.js
- Docker
- MongoDB

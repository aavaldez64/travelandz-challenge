# Travelandz WEB

Este es el frontend para la aplicación del desafío de Travelandz. Ha sido desarrollado con NextJS 14 (App Router).

# Requisitos

- NodeJS v.18 o superior
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

4. Ejecutar el proyecto en modo de desarrollo e iniciar en [http://localhost:3000](http://localhost:3000)

```bash
$ pnpm dev
```

# Utils

- Generar semilla para AUTH_JWT

```bash
# Usando OpenSLL
$ openssl rand -base64 32

# Usando NodeJS
$ node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
```

# Stack

- NextJS 14
- Typescript
- Next Auth v5
- TailwindCSS

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

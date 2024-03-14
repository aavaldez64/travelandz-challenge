# Travelandz WEB

Este es el frontend para la aplicación del desafío de Travelandz. Ha sido desarrollado con NextJS 14 (App Router).

# Requisitos

- NodeJS v20
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

# Iniciar en producción

1. Instalar las dependencias
2. Generar build de producción

```bash
$ pnpm build
```

3. Iniciar servidor a partir del build de producción

```bash
$ pnpm start

# O generar el build e iniciar en un solo comando
$ pnpm build:start
```

# Utils

- Generar semilla para AUTH_SECRET

```bash
# Usando OpenSLL
$ openssl rand -base64 32

# Usando NodeJS
$ node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
```

# Stack

- NodeJS v20
- NextJS 14
- Typescript
- Next Auth v5
- TailwindCSS
- Zustand

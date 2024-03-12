# Travelandz API

Este es el backend para la aplicación del desafío de Travelandz. Ha sido desarrollado siguiendo principios de Clean Architecture

# Requisitos

- NodeJS v.18 o superior
- Docker
- MongoDB docker image:

```bash
$ docker pull mongo:6.0.6
```

- Instalar las dependencias de playwright:

```bash
$ npx playwright install --with-deps # with npm
$ pnpm exec playwright install --with-deps # with pnpm

# O instalar solo chromium
$ npx playwright install --with-deps chromium # with npm
$ pnpm exec playwright install --with-deps chromium # with pnpm
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

5. Insertar los códigos IATA en la base de datos de mongo

```bash
$ pnpm iata-codes:seed
```

6. Ejecutar el proyecto en modo de desarrollo

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

# Scripts para códigos IATA

El proyecta cuenta con ciertos scripts para obtener una lista de los codigos IATA de las ciudades en España por medio de web-scrapping a la página [https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm](https://www.nationsonline.org/oneworld/IATA_Codes/airport_code_list.htm).

- **iata-codes**:
  Ejecuta el servicio y guarda los codigos en el archivo `iata-codes.json` dentro de `src/data/iata-codes`

```bash
$ pnpm run iata-codes
```

- **iata-codes:test**:
  Ejecuta el servicio y retorna la lista de codigos encontrados sin alterar el archivo JSON ni la base de datos

```bash
$ pnpm run iata-codes:test
```

- **iata-codes:seed**:
  Toma los datos del archivo `iata-codes.json` y los inserta en la base de datos de mongo (Esto realiza un drop a los registros de la colección)

```bash
$ pnpm run iata-codes:seed
```

- **iata-codes:mongo**:
  Ejecuta el servicio, guarda los codigos en el archivo `iata-codes.json` dentro de `src/data/iata-codes` y realiza el seed a la base de datos (Esto realiza un drop a los registros de la colección)

```bash
$ pnpm run iata-codes:mongo
```

# Stack

- NodeJS v20
- Typescript
- Express.js
- Docker
- MongoDB
- PlaywrightJS

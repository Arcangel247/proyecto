# Backend de Inventario y Ventas

Primer entregable del proyecto final del modulo Programacion Backend Moderna.

## Objetivo

Construir una API REST para administrar productos, inventario y ventas. El proyecto utiliza Node.js, Express, MongoDB y una estructura inicial basada en Clean Architecture.

## Tecnologias

- Node.js
- Express
- MongoDB Atlas y Mongoose
- CORS
- Morgan
- Dotenv
- Nodemon

## Estructura

```text
src/
  application/     Casos de uso
  domain/           Entidades y reglas de negocio
  infrastructure/  Base de datos y servicios externos
  presentation/    Rutas, controladores y middleware
  app.js            Punto de entrada
```

## Instalacion

1. Clonar el repositorio.
2. Ejecutar `npm install`.
3. Copiar `.env.example` como `.env`.
4. Completar `MONGODB_URI` con la conexion de MongoDB Atlas.
5. Ejecutar `npm run dev`.

## Endpoint inicial

`GET /api/health`

Respuesta esperada:

```json
{
  "ok": true,
  "message": "API de inventario y ventas funcionando"
}
```

## Estado del proyecto

Primer avance: configuracion del servidor, variables de entorno, conexion preparada para MongoDB y estructura inicial por capas.

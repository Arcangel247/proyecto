# Backend de Inventario y Ventas — Segundo Entregable

**Diplomado Desarrollo Web Full Stack – Módulo III: Programación Backend Moderna**  
**Proyecto académico:** Inventario y Ventas  
**Objetivo:** Completar el primer entregable con Clean Architecture, servidor Express, rutas, middlewares, autenticación, autorización y documentación.

## Arquitectura
- `src/domain`: reglas, validaciones y errores del dominio (sin Express ni MongoDB).
- `src/application`: casos de uso de productos, ventas y autenticación.
- `src/infrastructure`: esquemas y repositorios MongoDB/Mongoose, JWT, conexión.
- `src/presentation`: controladores HTTP, rutas, middlewares, Swagger.

## Requisitos
Node.js 20+ y MongoDB. Para **registrar ventas con descuento de stock atómico** se requiere MongoDB en configuración de réplica (por ejemplo MongoDB Atlas), porque se usa una transacción de MongoDB.



## Uso y permisos
1. `POST /api/auth/register` con `{"name":"Administrador","email":"admin@ejemplo.com","password":"ClaveFuerte123"}`. **Solo el primer registro recibe rol admin**, los siguientes son vendedores. En producción, esta inicialización requiere un proceso de provisión más controlado.
2. `POST /api/auth/login` para obtener el token.
3. En Swagger seleccione **Authorize** e introduzca el token JWT.
4. El admin puede crear, editar y borrar productos; vendedores pueden consultar productos y registrar ventas. Solo admin lista todas las ventas.

## Ejemplo de creación de producto
`POST /api/products`, con token admin:
```json
{"name":"Plancha profesional","sku":"EN-001","price":580,"stock":10,"description":"Producto demo"}
```
## Ejemplo de venta
`POST /api/sales`, con token:
```json
{"items":[{"productId":"ID_REAL_DEVUELTO_POR_PRODUCTS","quantity":1}]}
```
La venta descuenta stock mediante transacción y guarda el precio y nombre del artículo al momento de vender.

## Rutas
| Método | Ruta | Acceso |
|---|---|---|
| GET | `/api/health` | Público |
| POST | `/api/auth/register` | Público (primer usuario admin) |
| POST | `/api/auth/login` | Público |
| GET | `/api/auth/me` | Token |
| GET | `/api/products` | Token |
| GET | `/api/products/:id` | Token |
| POST | `/api/products` | Admin |
| PUT | `/api/products/:id` | Admin |
| DELETE | `/api/products/:id` | Admin |
| GET | `/api/sales` | Admin |
| POST | `/api/sales` | Admin/vendedor |

## Seguridad
Se usa hash bcrypt para contraseñas, JWT firmado, Helmet, CORS, límite de peticiones al login, errores centralizados, validaciones en dominio y control de roles.
**No subir `.env`, contraseñas ni tokens a GitHub.** El archivo `.env.example` solo debe contener marcadores o valores locales.

## Notas para el docente
Este proyecto **mantiene el tema propio del primer entregable (inventario y ventas)** y toma como referencia la organización y conceptos practicados con el proyecto manager-expense-api; no es una copia de su lógica de gastos.

## Limitaciones / futuras mejoras
No se realizó integración con MySQL/Sequelize porque la consigna mostrada no lo exige explícitamente; el ejemplo del docente sí lo usa. Falta una suite de integración con servidor MongoDB de prueba. Las dependencias deben instalarse y validarse en la computadora antes de la entrega; no se incluye `node_modules` ni se ha creado `package-lock.json` en este paquete.

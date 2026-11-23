# Gestor de Finanzas Personales

API REST para la administración de ingresos, egresos, categorías, billeteras, presupuestos y tipos de cambio. Implementa Clean Architecture con Node.js, Express, MySQL, MongoDB, Sequelize, Mongoose, JWT y Swagger.

## Funcionalidades

- Registro e inicio de sesión con JWT.
- Gestión de categorías, transacciones y presupuestos.
- Creación, listado y eliminación de billeteras financieras propias.
- Asociación opcional de transacciones con billeteras (`walletId`).
- Comprobantes públicos de transacciones, con opción de privacidad.
- Administración de tipos de cambio restringida al rol `admin`.
- Resumen de ingresos, egresos y saldo.

## Estructura

- `src/domain`: entidades y reglas de negocio.
- `src/application`: casos de uso.
- `src/infrastructure`: modelos, persistencia y servicios de seguridad.
- `src/presentation`: rutas, controladores, middlewares y documentación.

## Configuración

Requiere Node.js 20+, MySQL y MongoDB. Crear `bd_gastos` en MySQL:

```sql
CREATE DATABASE IF NOT EXISTS bd_gastos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Crear `.env` a partir de `.env.example` y definir una clave JWT privada. En Windows se puede generar una clave mediante:

```powershell
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Instalación y ejecución

```bash
npm install
npm run dev
```

Swagger: `http://localhost:3000/api-docs`.

Pruebas:

```bash
npm test
```

## Endpoints principales

| Método | Endpoint | Autenticación |
| --- | --- | --- |
| POST | `/api/v1/auth/register` | Pública |
| POST | `/api/v1/auth/login` | Pública |
| GET/POST | `/api/v1/wallets` | JWT |
| DELETE | `/api/v1/wallets/:id` | JWT |
| GET/POST | `/api/v1/categories` | JWT |
| GET/POST | `/api/v1/transactions` | JWT |
| PUT/DELETE | `/api/v1/transactions/:id` | JWT |
| GET | `/api/v1/transactions/:id/public` | Pública |
| GET/POST | `/api/v1/currencies` | JWT; POST solo `admin` |
| GET/POST | `/api/v1/budgets` | JWT |
| GET | `/api/v1/reports/summary` | JWT |

## Referencia

La organización y los conceptos del proyecto se basan en [manager-expense-api](https://github.com/loquendo2309/manager-expense-api). Esta implementación incorpora los módulos de billeteras, relación con transacciones, comprobantes públicos y control de acceso por roles.

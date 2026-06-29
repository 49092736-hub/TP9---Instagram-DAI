# Copilot Instructions

## Project Overview
- Instagram-like social API built with Node.js/Express and PostgreSQL. Entrypoint: `index.js`.
- Database schema: `usuarios` (id, nombre_completo, nombre_usuario, email, password, foto_perfil, biografia) and `publicaciones` (id, url_imagen, descripcion, likes, fecha_creacion, usuario_id with FK to usuarios).
- Database connection via `config/db.js` using `pg.Pool` with dotenv config from `.env`.

## Architecture & Layers
- **Controllers** (`controllers/`): Parse requests, call services, return JSON responses using `StatusCodes` from `http-status-codes`.
- **Services** (`services/`): Business logic and service coordination (e.g., password hashing, JWT generation, data validation).
- **Repository** (`repository/ig-repository.js`): Encapsulates all SQL/DB access using parameterized `pool.query()` for injection prevention.
- Middleware (`middlewares/ig-middlewares.js`): `requireAuth` validates JWT tokens and attaches `req.user` with usuario data.

## Key Conventions
- **CommonJS only**: `require/module.exports` throughout (no ES modules).
- **SQL**: Always use parameterized queries: `pool.query('SELECT * FROM usuarios WHERE id = $1', [id])`.
- **Status codes**: Import from `http-status-codes` package (e.g., `StatusCodes.OK`, `StatusCodes.UNAUTHORIZED`).
- **Error responses**: JSON objects with `{ success: false, message: "..." }`.
- **JWT**: Token payload stores `{ id, email }`. Validate with `process.env.JWT_SECRET`.
- **File naming**: `ig-*` for Instagram features (ig-controller, ig-services, ig-middlewares).

## Running the App
- `npm start` — production mode.
- `npm run dev` — development with nodemon (watches `index.js`).
- No test suite defined; verify changes by running endpoints manually.

## Example: Adding a Feature
If adding a new user operation:
1. Add method to `IgRepository` using `pool.query(...)` with parameterized queries.
2. Create business logic in a service (e.g., `IgService.registerUser()` hashes password, calls repo).
3. Create controller handler calling service and returning `StatusCodes` + JSON response.
4. Wire into `index.js` with `app.post('/registro', controllerMethod)`.
5. Optionally protect route with `requireAuth` middleware.

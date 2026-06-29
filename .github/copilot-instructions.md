# Copilot Instructions

- This repo is a minimal Node.js Express API. The runtime entrypoint is `index.js`.
- `index.js` currently configures `cors`, `express.json()`, a health route `/`, and a direct database query route `/usuarios`.
- Database connection is managed in `config/db.js` using `pg.Pool` and dotenv values from `.env`.
- Existing `controllers/`, `services/`, and `repository/` files are scaffolds only. They are not wired into `index.js` yet.
- Do not assume the controller/service layers are functional as written:
  - `controllers/ig-controller.js` uses `this.patientService` but the constructor stores `IgService`.
  - `repository/ig-services.js` currently contains invalid class syntax.
- When adding features, keep the intended separation:
  - `controllers/*` should parse requests and send responses.
  - `services/*` should contain business logic and coordinate repositories.
  - `repository/*` should encapsulate SQL/DB access.
- Use `npm start` to run production mode and `npm run dev` to run with `nodemon`.
- Avoid converting only part of the codebase to ES modules. The repo is configured as CommonJS in `package.json`.
- SQL access should use `pool.query(...)`; if you add new queries, prefer parameterized queries to prevent injection.
- There is no test suite currently defined; changes should be verified by running the app and exercising endpoints manually.
- Keep route names and response shape consistent with the current API style: JSON responses, `StatusCodes` from `http-status-codes`, and errors returned as JSON.

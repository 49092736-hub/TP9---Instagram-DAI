# Guía de Prueba - API Instagram TP9

## Datos de Prueba Disponibles

Se han generado dos archivos con datos para pruebas:

### 1. **test-data.json**
Contiene todos los datos estructurados para registro, login y publicaciones.

#### Usuarios de Prueba (registro):
```json
{
  "nombre_completo": "Juan Pérez García",
  "nombre_usuario": "juanp",
  "email": "juan@gmail.com",
  "password": "securePass123",
  "foto_perfil": "https://i.pravatar.cc/300?img=1",
  "biografia": "Fanatico de los gatos y la programación"
}
```

5 usuarios precargados: **juanp**, **mariag**, **lucasf**, **sofiam**, **carlosedu**

#### Credenciales para Login:
| Email | Contraseña | Usuario |
|-------|-----------|---------|
| juan@gmail.com | securePass123 | juanp |
| maria@gmail.com | securePass456 | mariag |
| lucas@gmail.com | securePass789 | lucasf |
| sofia@gmail.com | passWord2024 | sofiam |
| carlos@gmail.com | myPassword321 | carlosedu |

---

## Pruebas Manuales con cURL

### Opción 1: Ejecutar Script Completo (Linux/Mac)
```bash
bash test-api.sh
```

### Opción 2: Pruebas Individuales

#### 1. **Registrar un usuario**
```bash
curl -X POST "http://localhost:3000/api/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Juan Pérez García",
    "nombre_usuario": "juanp",
    "email": "juan@gmail.com",
    "password": "securePass123",
    "foto_perfil": "https://i.pravatar.cc/300?img=1",
    "biografia": "Fanatico de los gatos y la programación"
  }'
```

**Respuesta esperada (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": 1,
      "nombre_completo": "Juan Pérez García",
      "nombre_usuario": "juanp",
      "email": "juan@gmail.com",
      "foto_perfil": "https://i.pravatar.cc/300?img=1",
      "biografia": "Fanatico de los gatos y la programación"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. **Login con credenciales válidas**
```bash
curl -X POST "http://localhost:3000/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@gmail.com",
    "password": "securePass123"
  }'
```

**Respuesta esperada (200):**
```json
{
  "success": true,
  "message": "Sesión iniciada exitosamente",
  "data": {
    "user": {
      "id": 1,
      "nombre_completo": "Juan Pérez García",
      "nombre_usuario": "juanp",
      "email": "juan@gmail.com",
      "foto_perfil": "https://i.pravatar.cc/300?img=1",
      "biografia": "Fanatico de los gatos y la programación"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 3. **Login con credenciales inválidas** (error esperado)
```bash
curl -X POST "http://localhost:3000/api/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@gmail.com",
    "password": "wrongPassword"
  }'
```

**Respuesta esperada (401):**
```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

---

## Casos de Validación a Probar

### Email Inválido
```bash
curl -X POST "http://localhost:3000/api/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test",
    "nombre_usuario": "test",
    "email": "emailInvalido",
    "password": "pass123"
  }'
```
**Error esperado:** `Email inválido. Formato correcto: usuario@dominio.com`

### Contraseña muy corta (< 6 caracteres)
```bash
curl -X POST "http://localhost:3000/api/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test",
    "nombre_usuario": "test",
    "email": "test@gmail.com",
    "password": "123"
  }'
```
**Error esperado:** `La contraseña debe tener al menos 6 caracteres`

### Nombre de usuario inválido (espacios/caracteres especiales)
```bash
curl -X POST "http://localhost:3000/api/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test",
    "nombre_usuario": "test user",
    "email": "test@gmail.com",
    "password": "pass123"
  }'
```
**Error esperado:** `nombre_usuario debe tener 3-20 caracteres (solo letras, números y guion bajo)`

### Campos Obligatorios Faltantes
```bash
curl -X POST "http://localhost:3000/api/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test",
    "email": "test@gmail.com"
  }'
```
**Error esperado:** `Campo requerido: nombre_usuario`

---

## Usar Token JWT para Rutas Protegidas

1. **Realiza login o registro** y copia el `token` de la respuesta
2. **Abre la terminal y ejecuta:**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

curl -X GET "http://localhost:3000/api/perfil" \
  -H "Authorization: Bearer $TOKEN"
```

---

## Flujo Completo Recomendado

1. **Registrar usuario:**
   ```bash
   curl -X POST "http://localhost:3000/api/registro" ... # Ver ejemplo arriba
   ```
   → Guarda el `token` de la respuesta

2. **Ver mi perfil (protegido):**
   ```bash
   curl -X GET "http://localhost:3000/api/perfil" \
     -H "Authorization: Bearer <TOKEN>"
   ```

3. **Ver perfil de otro usuario (público):**
   ```bash
   curl -X GET "http://localhost:3000/api/perfil/mariag"
   ```

4. **Crear publicación (protegida):**
   ```bash
   curl -X POST "http://localhost:3000/api/publicaciones" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <TOKEN>" \
     -d '{
       "url_imagen": "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
       "descripcion": "Mi gato disfrutando del sol"
     }'
   ```

---

## Con Postman (Alternativa Visual)

1. Abre Postman
2. Importa la colección desde `test-data.json` o crea requests manualmente:
   - **POST** `http://localhost:3000/api/registro`
   - **POST** `http://localhost:3000/api/login`
   - **GET** `http://localhost:3000/api/perfil` (agregar header `Authorization: Bearer TOKEN`)

---

## Notas Importantes

- El servidor debe estar corriendo: `npm start` o `npm run dev`
- Los tokens JWT expiran en **24 horas**
- Las contraseñas en los datos de prueba son simples por propósitos de testing (en producción deben hashearse)
- Las URLs de fotos son ejemplares de [pravatar.cc](https://i.pravatar.cc)
- Si encuentras errores, revisa que:
  - El servidor esté corriendo
  - La BD esté configurada en `.env`
  - Los middlewares de validación estén activos

---

Documentado: 29/06/2026

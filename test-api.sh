#!/bin/bash

# ============================================
# GUÍA DE PRUEBA - EndPoints API Instagram
# ============================================
# Para ejecutar estos comandos, necesitas:
# 1. Que el servidor esté corriendo: npm start o npm run dev
# 2. Cambiar BASE_URL si tu servidor no está en localhost:3000

BASE_URL="http://localhost:3000/api"

echo "========== REGISTRO DE USUARIOS =========="

# Registro usuario 1: Juan
echo -e "\n1. Registrando a Juan..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Juan Pérez García",
    "nombre_usuario": "juanp",
    "email": "juan@gmail.com",
    "password": "securePass123",
    "foto_perfil": "https://i.pravatar.cc/300?img=1",
    "biografia": "Fanatico de los gatos y la programación"
  }'

# Registro usuario 2: María
echo -e "\n\n2. Registrando a María..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "María González López",
    "nombre_usuario": "mariag",
    "email": "maria@gmail.com",
    "password": "securePass456",
    "foto_perfil": "https://i.pravatar.cc/300?img=2",
    "biografia": "Cat lover 🐱"
  }'

# Registro usuario 3: Lucas
echo -e "\n\n3. Registrando a Lucas..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Lucas Fernández Martín",
    "nombre_usuario": "lucasf",
    "email": "lucas@gmail.com",
    "password": "securePass789",
    "foto_perfil": "https://i.pravatar.cc/300?img=3",
    "biografia": "Desarrollador Full Stack"
  }'

# Registro usuario 4: Sofía
echo -e "\n\n4. Registrando a Sofía..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Sofía Martínez Argentina",
    "nombre_usuario": "sofiam",
    "email": "sofia@gmail.com",
    "password": "passWord2024",
    "foto_perfil": "https://i.pravatar.cc/300?img=4",
    "biografia": "Fotografa de gatos profesional"
  }'

# Registro usuario 5: Carlos
echo -e "\n\n5. Registrando a Carlos..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Carlos Eduardo López",
    "nombre_usuario": "carlosedu",
    "email": "carlos@gmail.com",
    "password": "myPassword321",
    "foto_perfil": "https://i.pravatar.cc/300?img=5",
    "biografia": "React & Node.js Developer"
  }'

echo -e "\n\n========== LOGIN DE USUARIOS =========="

# Login usuario 1: Juan
echo -e "\n\n6. Login de Juan (credenciales correctas)..."
curl -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@gmail.com",
    "password": "securePass123"
  }'

# Login usuario 2: María
echo -e "\n\n7. Login de María (credenciales correctas)..."
curl -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "maria@gmail.com",
    "password": "securePass456"
  }'

# Login con credenciales incorrectas (error esperado)
echo -e "\n\n8. Login con credenciales inválidas (ERROR ESPERADO)..."
curl -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@gmail.com",
    "password": "wrongPassword"
  }'

# Login sin email (error esperado)
echo -e "\n\n9. Login sin email (ERROR ESPERADO)..."
curl -X POST "$BASE_URL/login" \
  -H "Content-Type: application/json" \
  -d '{
    "password": "securePass123"
  }'

echo -e "\n\n========== PRUEBAS CON TOKEN JWT =========="

# NOTA: Reemplaza <TOKEN> con el token JWT que recibes del login
# Ejemplo: TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

echo -e "\n\n10. Ver mi perfil (requiere TOKEN)..."
echo "Instrucción: Copia el token del login de Juan y ejecuta:"
echo 'curl -X GET "http://localhost:3000/api/perfil" \\'
echo '  -H "Authorization: Bearer <TOKEN>"'

echo -e "\n\n11. Ver perfil de otro usuario (sin token necesario)..."
curl -X GET "$BASE_URL/perfil/mariag"

echo -e "\n\n========== VALIDACIONES DE ERROR =========="

# Registro con email inválido
echo -e "\n\n12. Registro con email inválido (ERROR ESPERADO)..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test Usuario",
    "nombre_usuario": "testuser",
    "email": "emailInvalido",
    "password": "securePass123",
    "biografia": "Test"
  }'

# Registro sin campos obligatorios
echo -e "\n\n13. Registro sin nombre_usuario (ERROR ESPERADO)..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test Usuario",
    "email": "test@gmail.com",
    "password": "securePass123"
  }'

# Registro con contraseña muy corta
echo -e "\n\n14. Registro con contraseña < 6 caracteres (ERROR ESPERADO)..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test Usuario",
    "nombre_usuario": "testuser2",
    "email": "test2@gmail.com",
    "password": "123"
  }'

# Registro con nombre_usuario inválido (tiene espacios)
echo -e "\n\n15. Registro con nombre_usuario inválido (ERROR ESPERADO)..."
curl -X POST "$BASE_URL/registro" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Test Usuario",
    "nombre_usuario": "test user invalido",
    "email": "test3@gmail.com",
    "password": "securePass123"
  }'

echo -e "\n\n========== FIN DE PRUEBAS =========="
echo -e "\nTodos los tests completados. Revisa los resultados arriba.\n"

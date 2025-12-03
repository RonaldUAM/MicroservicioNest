# Datos Iniciales Necesarios para AUTH

## Problema

Cuando intentas registrar un usuario, recibes: `Role USER not found`

## Causa

La tabla `roles` está vacía. El sistema intenta asignar un rol por defecto `USER` al usuario registrado, pero ese rol no existe en la BD.

## Solución: Insertar roles base

Ejecuta este SQL en tu base de datos `genosentinel`:

```sql
USE genosentinel;

INSERT INTO roles (id, name) VALUES
  (1, 'USER'),
  (2, 'ADMIN'),
  (3, 'DOCTOR'),
  (4, 'PATIENT');
```

### Cómo ejecutar:

**Opción 1: Si tienes MySQL local instalado**

```powershell
mysql -u root -p genosentinel < "C:\ruta\al\archivo\SEED_AUTH_DATA.sql"
```

**Opción 2: Si usas Docker Compose (recomendado)**

```powershell
docker exec genosentinel-db mysql -uroot -ppassword -e "USE genosentinel; INSERT INTO roles (id, name) VALUES (1, 'USER'), (2, 'ADMIN'), (3, 'DOCTOR'), (4, 'PATIENT');"
```

**Opción 3: Desde cliente MySQL Workbench o DBeaver**

1. Abre una conexión a `genosentinel`
2. Copia y pega el SQL anterior
3. Ejecuta

## Verificar que funcionó

```sql
SELECT * FROM roles;
```

Deberías ver:

```
| id | name   |
|----|--------|
| 1  | USER   |
| 2  | ADMIN  |
| 3  | DOCTOR |
| 4  | PATIENT|
```

## Ahora sí puedes registrarte

Con los roles insertados, cuando hagas un POST a `/auth/register` (o lo que corresponda):

```json
{
  "username": "juan_usuario",
  "email": "juan@example.com",
  "password": "Secura123!"
}
```

El sistema:

1. ✅ Creará el usuario
2. ✅ Asignará el rol `USER` (id=1) por defecto
3. ✅ Devolverá token o usuario creado (según tu implementación)

## Estructura de datos de USERS

Una vez registrado, un usuario en `genosentinel.users` se verá así:

```
| id | username     | email            | password (hash) | active | role_id |
|----|--------------|------------------|-----------------|--------|---------|
| 1  | juan_usuario | juan@example.com | $2b$10$...      | 1      | 1       |
```

- `role_id = 1` → Rol `USER` (el más básico)
- `role_id = 2` → Rol `ADMIN` (si quieres crear usuarios especiales)

## Datos opcionales (Genes para la aplicación)

Si tu BD incluye tablas de genética (`gene`, `geneticvariant`), puedes también insertar datos de prueba:

```sql
INSERT INTO gene (symbol, fullName, functionSummary) VALUES
  ('BRCA1', 'Breast Cancer Type 1', 'Tumor suppressor involved in DNA repair'),
  ('TP53', 'Tumor Protein P53', 'Guardian of the genome, controls cell cycle'),
  ('EGFR', 'Epidermal Growth Factor Receptor', 'Growth signaling molecule');
```

Pero esto es **opcional** — solo necesitas los roles para que funcione el auth.

# Configuración de Base de Datos - GenoSentinel

## Conexión MySQL Configurada

Tu proyecto NestJS está configurado para conectar a **MySQL** con la base de datos `genosentinel`.

### Credenciales por defecto (.env)

```
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=password
DB_NAME=genosentinel
```

Edita el archivo `.env` con tus credenciales reales antes de desplegar a producción.

## Opciones de levantamiento

### Opción 1: MySQL local (Manual)

1. Instala MySQL 8.0 en tu máquina
2. Crea la base de datos usando el script SQL:
   ```sql
   mysql -u root -p < ruta/del/script.sql
   ```
3. Actualiza `.env` con tus credenciales
4. Inicia la aplicación:
   ```bash
   npm run start:dev
   ```

### Opción 2: Docker Compose (Recomendado)

1. Instala Docker y Docker Compose
2. Levanta los servicios:
   ```bash
   docker-compose up -d
   ```
3. Para detener:
   ```bash
   docker-compose down
   ```

Ver logs:

```bash
docker-compose logs -f app
```

## Verificar conexión

Cuando inicia la aplicación, verás en consola:

```
[Nest] 12345  - 12/03/2025, 10:30:00 AM     LOG [TypeOrmModule] Database connection established
```

Si la conexión falla, revisa:

- Credenciales en `.env`
- MySQL está corriendo
- Firewall/puerto 3306 accesible
- Base de datos `genosentinel` existe

## Entidades configuradas

Actualmente está mapseada la entidad `Patient`:

- Tabla: `patient`
- Columnas automáticamente sincronizadas

Para agregar más entidades:

1. Crea la clase con decoradores `@Entity()` y `@Column()`
2. Agrega a `app.module.ts` en el array `entities`
3. Importa en `TypeOrmModule.forFeature()`

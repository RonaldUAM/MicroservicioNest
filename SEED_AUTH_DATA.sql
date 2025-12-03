-- =====================================================
-- Script para insertar datos iniciales en la tabla de ROLES
-- Necesario para que el registro de usuarios funcione
-- =====================================================

USE genosentinel;

-- Insertar roles base (si no existen)
INSERT IGNORE INTO roles (id, name) VALUES
  (1, 'USER'),
  (2, 'ADMIN'),
  (3, 'DOCTOR'),
  (4, 'PATIENT');

-- Verificar que se insertaron correctamente
SELECT * FROM roles;

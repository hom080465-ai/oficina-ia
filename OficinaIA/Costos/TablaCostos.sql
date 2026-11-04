-- 1. CREACIÓN DE LA TABLA DE COSTOS
CREATE TABLE CostosComponentes (
    Codigo VARCHAR(10) PRIMARY KEY,
    Descripcion VARCHAR(150) NOT NULL,
    PrecioCosto DECIMAL(10, 2) DEFAULT 0.00
);

-- 2. CARGA INICIAL DE COMPONENTES DE LA PÁGINA
INSERT INTO CostosComponentes (Codigo, Descripcion, PrecioCosto) VALUES
-- PROCESADORES (CPU)
('CPU001', 'Procesador Intel Core i3', 0.00),
('CPU002', 'Procesador Intel Core i5', 0.00),
('CPU003', 'Procesador Intel Core i7', 0.00),
('CPU004', 'Procesador Intel Core i9', 0.00),
('CPU005', 'Procesador AMD Ryzen 3', 0.00),
('CPU006', 'Procesador AMD Ryzen 5', 0.00),
('CPU007', 'Procesador AMD Ryzen 7', 0.00),
('CPU008', 'Procesador AMD Ryzen 9', 0.00),

-- PLACAS MADRE (MB)
('MB001', 'Placa Madre Gama Inicio - DDR4', 0.00),
('MB002', 'Placa Madre Gama Media - DDR4/5', 0.00),
('MB003', 'Placa Madre Gama Alta - DDR5', 0.00),

-- MEMORIAS RAM (RAM)
('RAM001', 'Memoria RAM DDR4 4GB', 0.00),
('RAM002', 'Memoria RAM DDR4 8GB', 0.00),
('RAM003', 'Memoria RAM DDR4 16GB', 0.00),
('RAM004', 'Memoria RAM DDR4 32GB', 0.00),
('RAM005', 'Memoria RAM DDR4 64GB', 0.00),
('RAM006', 'Memoria RAM DDR5 4GB', 0.00),
('RAM007', 'Memoria RAM DDR5 8GB', 0.00),
('RAM008', 'Memoria RAM DDR5 16GB', 0.00),
('RAM009', 'Memoria RAM DDR5 32GB', 0.00),
('RAM010', 'Memoria RAM DDR5 64GB', 0.00),

-- ALMACENAMIENTO (STR)
('STR001', 'Disco SSD M.2 NVMe 256GB', 0.00),
('STR002', 'Disco SSD M.2 NVMe 512GB', 0.00),
('STR003', 'Disco SSD M.2 NVMe 1TB', 0.00),
('STR004', 'Disco SSD M.2 NVMe 2TB', 0.00),
('STR005', 'Disco SATA SSD / HDD 500GB', 0.00),
('STR006', 'Disco SATA SSD / HDD 1TB', 0.00),
('STR007', 'Disco SATA SSD / HDD 2TB', 0.00),

-- FUENTES DE PODER (FON)
('FON001', 'Fuente de Alimentación 350W', 0.00),
('FON002', 'Fuente de Alimentación 450W', 0.00),
('FON003', 'Fuente de Alimentación 500W', 0.00),
('FON004', 'Fuente de Alimentación 650W', 0.00),
('FON005', 'Fuente de Alimentación 750W', 0.00),
('FON006', 'Fuente de Alimentación 850W', 0.00),

-- GABINETES (GAB)
('GAB001', 'Gabinete Chapa Negro', 0.00),
('GAB002', 'Gabinete Chapa Blanco', 0.00),
('GAB003', 'Gabinete Vidrio Templado Negro', 0.00),
('GAB004', 'Gabinete Vidrio Templado Blanco', 0.00);
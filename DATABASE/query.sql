DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
id SERIAL PRIMARY KEY,
nombre VARCHAR(50),
balance FLOAT CHECK (balance >= 0)
);

CREATE TABLE transferencias (
id SERIAL PRIMARY KEY,
emisor INT,
receptor INT,
monto FLOAT,
fecha TIMESTAMP,
FOREIGN KEY (emisor) REFERENCES usuarios(id) ON DELETE CASCADE,
FOREIGN KEY (receptor) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- semilla

INSERT INTO usuarios (nombre, balance) VALUES 
('Usuario1', 1000.00),
('Usuario2', 2000.00),
('Usuario3', 1500.00);

-- Insertar 9 transferencias distintas
INSERT INTO transferencias (emisor, receptor, monto, fecha) VALUES 
(1, 2, 100.00, '2024-07-07 10:00:00'),
(2, 3, 200.00, '2024-07-07 11:00:00'),
(3, 1, 150.00, '2024-07-07 12:00:00'),
(1, 3, 50.00, '2024-07-07 13:00:00'),
(2, 1, 300.00, '2024-07-07 14:00:00'),
(3, 2, 120.00, '2024-07-07 15:00:00'),
(1, 2, 180.00, '2024-07-07 16:00:00'),
(2, 3, 250.00, '2024-07-07 17:00:00'),
(3, 1, 170.00, '2024-07-07 18:00:00');


SELECT * FROM usuarios;
SELECT * FROM transferencias;
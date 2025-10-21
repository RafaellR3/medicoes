CREATE TABLE IF NOT EXISTS medicao (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uC VARCHAR(50) NOT NULL,
  timestamp DATETIME NOT NULL,
  leitura DOUBLE NOT NULL,
  tipo ENUM('ENERGIA_ATIVA', 'TENSAO_A', 'CORRENTE_A') NOT NULL,
  UNIQUE KEY unique_leitura (unidadeConsumidora, timestamp, tipo)
);

CREATE TABLE IF NOT EXISTS consumidor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  uC VARCHAR(50) NOT NULL UNIQUE,
  ultimo_valor DECIMAL(10,2),
  ultimo_tipo ENUM('ENERGIA_ATIVA', 'TENSAO_A', 'CORRENTE_A'),
  ultima_leitura DATETIME
);
CREATE DATABASE IF NOT EXISTS preparacao_db;
USE preparacao_db;

CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE PRODUTO (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao VARCHAR(255) NOT NULL,
    custo DECIMAL(10,2) NOT NULL,
    quantidade INT NOT NULL,
    estoque_minimo INT NOT NULL
);

CREATE TABLE PRODUCAO (
    id_producao INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_produto INT NOT NULL,
    tipo ENUM('ENTRADA', 'SAIDA') NOT NULL,
    quantidade INT NOT NULL,
    data DATE NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES USUARIO(id_usuario),
    FOREIGN KEY (id_produto) REFERENCES PRODUTO(id_produto)
);

INSERT INTO USUARIO (nome, email, senha) VALUES
('Administrador', 'admin@jit.com', '123456'),
('Joao Silva', 'joao@jit.com', '123456'),
('Maria Souza', 'maria@jit.com', '123456');

INSERT INTO PRODUTO (nome, descricao, custo, quantidade, estoque_minimo) VALUES
('Mesa MDF', 'Mesa produzida em MDF', 250.00, 10, 3),
('Armario MDF', 'Armario produzido em MDF', 480.00, 8, 3),
('Prateleira MDF', 'Prateleira produzida em MDF', 120.00, 15, 5);

INSERT INTO PRODUCAO (id_usuario, id_produto, tipo, quantidade, data) VALUES
(1, 1, 'ENTRADA', 5, '2026-08-20'),
(1, 2, 'ENTRADA', 4, '2026-08-21'),
(2, 3, 'SAIDA', 2, '2026-08-25');
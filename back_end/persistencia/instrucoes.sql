DROP DATABASE IF EXISTS sistema;
CREATE DATABASE sistema;
USE sistema;

CREATE TABLE categoria(
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_nome VARCHAR(50) NOT NULL,
    prod_descricao VARCHAR(200) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_cat_cod INT NOT NULL,
    CONSTRAINT pk_prod_codigo PRIMARY KEY (prod_codigo),
    CONSTRAINT fk_categoria_cod FOREIGN KEY (prod_cat_cod) REFERENCES categoria(cat_codigo)
);

CREATE TABLE fornecedor(
    forn_codigo INT NOT NULL AUTO_INCREMENT,
    forn_CNPJ VARCHAR(18) NOT NULL,
    forn_nome VARCHAR(50),
    forn_endereco VARCHAR(100),
    forn_bairro VARCHAR(40),
    forn_email VARCHAR(100),
    forn_num INT NOT NULL,
    forn_complemento VARCHAR(50),
    forn_cep VARCHAR(10) NOT NULL,
    forn_tel VARCHAR(14) NOT NULL,
    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_codigo)
);

CREATE TABLE cliente(
    cli_codigo INT NOT NULL AUTO_INCREMENT,
    cli_cpf VARCHAR(14) NOT NULL UNIQUE,
    cli_nome VARCHAR(50) NOT NULL,
    cli_endereco VARCHAR(100),
    cli_bairro VARCHAR(40),
    cli_num INT NOT NULL,
    cli_cidade VARCHAR(50),
    cli_uf VARCHAR(2) NOT NULL,
    cli_cep VARCHAR(10) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_codigo)
);

CREATE TABLE venda(
    ven_codigo INT NOT NULL AUTO_INCREMENT,
    ven_dataVenda DATETIME,
    ven_valorTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    ven_qtdItens INT NOT NULL DEFAULT 1,
    ven_prod_cod INT NOT NULL,
    ven_cli_cod INT NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY(ven_codigo),
    CONSTRAINT fk_venda_cli_cod FOREIGN KEY (ven_cli_cod) REFERENCES cliente(cli_codigo),
    CONSTRAINT fk_venda_prod_cod FOREIGN KEY (ven_prod_cod) REFERENCES produto(prod_codigo)
);

CREATE TABLE lista_espera (
    le_produto_codigo INT NOT NULL,
    le_cliente_codigo INT NOT NULL,
    PRIMARY KEY (le_produto_codigo, le_cliente_codigo),
    FOREIGN KEY (le_produto_codigo) REFERENCES produto(prod_codigo),
    FOREIGN KEY (le_cliente_codigo) REFERENCES cliente(cli_codigo)
);

INSERT INTO categoria (cat_descricao) VALUES 
('Eletrônicos'),('Roupas'),('Comida'),('Esportes'),('Jóias'),('Jogos'),('Frutas');

INSERT INTO fornecedor (forn_CNPJ, forn_nome, forn_endereco, forn_bairro, forn_email, forn_num, forn_complemento, forn_cep, forn_tel) VALUES 
('11222','Fornecedor C Comércio','Travessa do Comércio','Bairro Comercial','fornecedorc@email.com',789,'Loja 5','34567-890','(31) 1111-2'),
('98765','Fornecedor B S.A.','Avenida Industrial','Distrito Industrial','fornecedorb@email.com',567,'Andar 2','87654-321','(21) 9876-5'),
('12345','Fornecedor A Ltda.','Rua Comercial','Centro','fornecedora@email.com',234,'Sala 3','12345-678','(11) 1234-5');

INSERT INTO cliente (cli_cpf, cli_nome, cli_endereco, cli_bairro, cli_num, cli_cidade, cli_uf, cli_cep) VALUES 
('987.654.321-00','João Oliveira Silva Andrade','Avenida dos Pássaros','Jardim Botânico',456,'Rio de Janeiro','RJ','23456-789'),
('123.456.789-01','Maria Silva','Rua das Flores','Centro',123,'São Paulo','SP','01234-567'),
('111.222.333-44','Carlos Santos','Travessa das Estrelas','Vila Celestial',789,'Belo Horizonte','MG','34567-890'),
('987.654.231-57','Carolina Correa Andrade','Rua União dos Palmares','Jd. União',509,'Botucatu','SP','18743-000'),
('456.871.989-44','Edivaldo Pereira Cavalcante','Rua Comendador','Bairro Castelo',321,'Morada','SP','67852-045');

INSERT INTO produto (prod_nome, prod_descricao, prod_precoCusto, prod_precoVenda, prod_dataValidade, prod_qtdEstoque, prod_cat_cod) VALUES 
('Chuteira','Com muito conforto para os seus pés, essa chuteira é perfeita para ficar longos períodos jogando fut',50.00,199.99,'2030-07-12',12.00,4),
('Macarrão','Uma massa perfeita para suas receitas',1.89,4.59,'2024-06-10',7.00,3),
('Anel de Ouro','Um belo anel para impressionar quem voce ama',400.00,720.75,'2025-12-12',3.00,5),
('Coca-Cola','Refrigerante sabor cola',3.25,7.69,'2024-06-27',35.00,3),
('Chocolate','Para adoçar sua vida',2.69,5.50,'2024-04-10',33.00,3),
('Pirulito','Docinho e redondo em um palito',0.50,2.00,'2024-05-27',26.00,3),
('Algodão Doce','Derrete na boca e é doce igual açúcar',1.50,3.00,'2024-03-01',18.00,3),
('Bolsa de Couro','Serve para carregar objetos',65.50,187.99,'2025-12-28',5.00,2),
('Chocolate Amargo','Para quem gosta do verdadeiro sabor do cacau',4.20,9.50,'2025-04-15',45.00,3),
('God Of War Ragnarok','Um jogo de aventura hack and slash',75.99,129.99,'2024-12-21',3.00,6),
('Mostarda','Melhor molho',0.50,1.50,'2024-12-29',5.00,3);

INSERT INTO venda (ven_dataVenda, ven_valorTotal, ven_qtdItens, ven_prod_cod, ven_cli_cod) VALUES 
('2023-12-10 17:52:35',38.50,7,9,1),
('2024-09-14 18:28:17',720.75,1,6,2);
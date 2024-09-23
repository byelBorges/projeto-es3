create database sistema;
use sistema;
create table categoria(
    cat_codigo int not null auto_increment,
    cat_descricao varchar(100) not null,
    constraint pk_categoria primary key(cat_codigo)
);

create table produto(
    prod_codigo int not null auto_increment,
    prod_nome varchar(50) not null,
    prod_descricao varchar(200) not null,
    prod_precoCusto decimal(10,2) not null default 0,
    prod_precoVenda decimal(10,2) not null default 0,
    prod_dataValidade DATE,
    prod_qtdEstoque decimal(10,2) not null default 0,
    prod_cat_cod int not null,
    constraint pk_prod_codido primary key (prod_codigo),
    constraint fk_categoria_cod foreign key (prod_cat_cod) references categoria(cat_codigo)
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
    ven_dataVenda DATETIME,
    ven_valorTotal DECIMAL(10,2) NOT NULL DEFAULT 0,
    ven_qtdItens INT NOT NULL DEFAULT 1,
    ven_prod_cod INT NOT NULL,
    ven_cli_cod INT NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY(ven_cli_cod, ven_dataVenda),
    CONSTRAINT fk_venda_cli_cod FOREIGN KEY (ven_cli_cod) REFERENCES cliente(cli_codigo),
    CONSTRAINT prod FOREIGN KEY (ven_prod_cod) REFERENCES produto(prod_codigo)
);

CREATE TABLE lista_espera (
    le_produto_codigo INT NOT NULL,
    le_cliente_codigo INT NOT NULL,
    PRIMARY KEY (le_produto_codigo, le_cliente_codigo),
    FOREIGN KEY (le_produto_codigo) REFERENCES produto(prod_codigo),
    FOREIGN KEY (le_cliente_codigo) REFERENCES cliente(cli_codigo)
);

INSERT INTO `categoria` VALUES (1,'Eletrônicos'),(2,'Roupas'),(10,'Comida'),(12,'Esportes'),(13,'Jóias'),(14,'Jogos'),(15,'Frutas');
INSERT INTO `fornecedor` VALUES (14,11222,'Fornecedor C Comércio','Travessa do Comércio','Bairro Comercial','fornecedorc@email.com',789,'Loja 5','34567-890','(31) 1111-2'),(15,98765,'Fornecedor B S.A.','Avenida Industrial','Distrito Industrial','fornecedorb@email.com',567,'Andar 2','87654-321','(21) 9876-5'),(16,12345,'Fornecedor A Ltda.','Rua Comercial','Centro','fornecedora@email.com',234,'Sala 3','12345-678','(11) 1234-5');
INSERT INTO `cliente` VALUES (1,'987.654.321-00','João Oliveira Silva Andrade','Avenida dos Pássaros','Jardim Botânico',456,'Rio de Janeiro','RJ','23456-789'),(2,'123.456.789-01','Maria Silva','Rua das Flores','Centro',123,'São Paulo','SP','01234-567'),(3,'111.222.333-44','Carlos Santos','Travessa das Estrelas','Vila Celestial',789,'Belo Horizonte','MG','34567-890'),(13,'987.654.231-57','Carolina Correa Andrade','Rua União dos Palmares','Jd. União',509,'Botucatu','SP','18743-000'),(15,'456.871.989-44','Edivaldo Pereira Cavalcante','Rua Comendador','Bairro Castelo',321,'Morada','SP','67852-045');
INSERT INTO `produto` VALUES (3,'Chuteira','Com muito conforto para os seus pés, essa chuteira é perfeita para ficar longos períodos jogando fut',50.00,199.99,'2030-07-12',12.00,12),(5,'Macarrão','Uma massa perfeita para suas receitas',1.89,4.59,'2024-06-10',7.00,10),(6,'Anel de Ouro','Um belo anel para impressionar quem voce ama',400.00,720.75,'2025-12-12',3.00,13),(8,'Coca-Cola','Refrigerante sabor cola',3.25,7.69,'2024-06-27',35.00,10),(9,'Chocolate','Para adoçar sua vida',2.69,5.50,'2024-04-10',33.00,10),(10,'Pirulito','Docinho e redondo em um palito',0.50,2.00,'2024-05-27',26.00,10),(11,'Algodão Doce','Derrete na boca e é doce igual açúcar',1.50,3.00,'2024-03-01',18.00,10),(12,'Bolsa de Couro','Serve para carregar objetos',65.50,187.99,'2025-12-28',5.00,2),(13,'Chocolate Amargo','Para quem gosta do verdadeiro sabor do cacau',4.20,9.50,'2025-04-15',45.00,10),(14,'God Of War Ragnarok','Um jogo de aventura hack and slash',75.99,129.99,'2024-12-21',3.00,14),(15,'Mostarda','Melhor molho',0.50,1.50,'2024-12-29',5.00,10);
INSERT INTO `venda` VALUES ('2023-12-10 17:52:35',38.50,7,9,2),('2024-09-14 18:28:17',720.75,1,6,13);
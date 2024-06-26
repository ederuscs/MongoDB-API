# MongoDB API USCS
Este projeto contém o código fonte de uma API simples escrita em NodeJS, para realizar somente o CRUD de uma collection de Produtos utilizando MongoDB.

# Getting Started

## Criando banco de dados com Atlas
Usando o MongoDB Atlas, crie seu cluster com qualquer nome, depois crie um database com o nome "LojaUscs" e crie mais duas collections: "produtos" e "usuarios".

## Baixando repositório
Usando o terminal:

    git clone https://github.com/ederuscs/MongoDB-API.git

## Configurando ambiente
Crie um arquivo ".env" e escreva:

    ATLAS_CONNSTR=SUA STRING DE CONEXÃO ATLAS

Use o comando npm:

    npm install

Inicialize o servidor:

    node index.js

# Endpoints

## Tipos de dados

### Usuario
|Campo|Tipo de dado|Descrição|Obrigatório?|
|--|--|--|--|
|_id|ObjectId|Identificador do usuário|Sim|
|nome|String|Nome do usuário|Sim|
|email|String|Email do usuário|Sim|

### Produto
|Campo|Tipo de dado|Descrição|Obrigatório|
|--|--|--|--|
|_id|ObjectId|Identificador do produto|Sim|
|nome|String|Nome do produto|Sim|
|preco|Decimal|Preço do produto|Sim|
|descricao|String|Descrição do produto|Não|
|qtd_estoque|Int|Quantidade no estoque|Sim|
|criado_em|Timestamp|Quando foi registrado|Sim|
|usuario|Usuario|Usuário que inseriu o registro|Sim|

## Buscar todos os produtos

    [GET] /api/produtos

Retorna todos os produtos armazenados

Retorno: **Produto[]**

## Buscar produto por ID

    [GET] /api/produtos/:id

|Parâmetro|Descrição|
|--|--|
|:id|ID do produto a ser buscado|

Retorna o produto com o ID correspondente

Retorno: **Produto**

## Inserindo novo produto

    [POST] /api/produtos
    [BODY] Produto {
	    nome: String,
	    preco: Decimal,
	    qtd_estoque: Int,
	    criado_em: Timestamp,
	    usuario: Usuario {
		    _id: ObjectId,
		    nome: String,
		    email: String
	    }
    }

Insere um novo usuário

**!!!A API não valida se o usuário existe, apenas se tem os campos obrigatórios!!!**

## Atualizando um produto

    [PUT] /api/produtos/:id
    [BODY] Produto {
	    nome: String,
	    preco: Decimal,
	    qtd_estoque: Int,
	    criado_em: Timestamp,
	    usuario: Usuario {
		    _id: ObjectId,
		    nome: String,
		    email: String
	    }
    }

|Parâmetro|Descrição|
|--|--|
|:id|ID do produto a ser atualizado|

Atualiza um produto com base no seu id

**!!!A API não valida se o usuário existe, apenas se tem os campos obrigatórios!!!**

## Deletando um produto

    [DELETE] /api/produtos/:id
    
|Parâmetro|Descrição|
|--|--|
|:id|ID do produto a ser deletado|

Deleta um produto com base no seu id

# Resultado dos testes

Os testes foram realizados utilizando ThunderClient no VSCode

## GET
<img src="./resources/GET.png">

## GET BY ID
<img src="./resources/GETID.png">

## POST
<img src="./resources/POST.png">

## PUT
<img src="./resources/PUT.png">

## DELETE
<img src="./resources/DELETE.png">

# Alunos participantes
|Nome|RA|
|--|--|
|Davi Valdez Rodrigues|8145827|
|Eder de Souza Vanzei|8154562|
|Fernanda Brandão Pizzinatto|8149776|
|Gabriel de Souza Bezerra|8068971|
|Higor Rocha Pereira|8143566|
|Julio Cesar Viana Silva|8077937|
|Larissa Pereira Ibiapino|8143555|
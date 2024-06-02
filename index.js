import express  from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

// Criar API
const app = express();
const port = 3000;

app.use(express.json());

// Configurar conexão com ATLAS
dotenv.config();
const uri = process.env.ATLAS_CONNSTR;
const client = new MongoClient(uri);

// Constantes
const dbName = 'LojaUscs';
const prodCollectionName = 'produtos';
const userCollectionName = 'usuarios';

function getProdCollection() {
  const database = client.db(dbName);
  return database.collection(prodCollectionName);
}

function getProdutoFormatado(produto) {
  const camposProdutos = Object.keys(produto);
  const camposUsuario = Object.keys(produto.usuario);

  if (
    !camposProdutos.includes('nome') &&
    !camposProdutos.includes('preco') &&
    !camposProdutos.includes('qtd_estoque') &&
    !camposProdutos.includes('criado_em') &&
    !camposUsuario.includes('_id') &&
    !camposUsuario.includes('nome') &&
    !camposUsuario.includes('email')
  )
    throw new Error('Produto inválido!')


  let newProduto = {
    nome: produto.nome,
    preco: produto.preco,
    qtd_estoque: produto.qtd_estoque,
    criado_em: produto.criado_em,
    usuario: {
      _id: new ObjectId(produto.usuario._id),
      nome: produto.usuario.nome,
      email: produto.usuario.email
    }
  };

  if (produto.descricao)
    newProduto.descricao = produto.descricao;

  return newProduto;
}

// CRUD produtos
app.get('/api/produtos', async (req, res) => {
  try {
    const prodCollection = getProdCollection();
  
    const cursorProd = prodCollection.find();
    const produtos = [];

    await cursorProd.forEach(produto => {
      produtos.push(produto);
    });
  
    res.json(produtos);
  }
  catch(e) {
    res.status = 400;
    res.json({ message: "ERROR", data: e.message });
  }
});

app.post('/api/produtos', async (req, res) => {
  try {
    const prodCollection = getProdCollection();
    
    const body = req.body;
    const produto = getProdutoFormatado(body);

    const result = await prodCollection.insertOne(produto);
    res.json(result);
  }
  catch(e) {
    res.status = 400;
    res.json({ message: "ERROR", data: e.message });
  }
});

app.put('/api/produtos/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const prodCollection = getProdCollection();
    
    const body = req.body;
    const produto = getProdutoFormatado(body);
    delete produto._id;

    const result = await prodCollection.replaceOne({ _id: id }, produto);
    res.json(result);
  }
  catch(e) {
    res.status = 400;
    res.json({ message: "ERROR", data: e.message });
  }
});

app.delete('/api/produtos/:id', async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const prodCollection = getProdCollection();

    const query = { _id: id };
    const result = await prodCollection.deleteOne(query);

    res.json(result);
  }
  catch(e) {
    res.status = 400;
    res.json({ message: "ERROR", data: e.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
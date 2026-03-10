# 📦 Order API

API REST simples para gerenciamento de pedidos (Orders) e itens utilizando Node.js, Express e PostgreSQL, construída seguindo uma arquitetura em camadas.

O projeto foi desenvolvido com foco em organização de código, separação de responsabilidades e facilidade de manutenção.

# 🧱 Arquitetura do Projeto
order-api/
│
├── src/
│   ├── config/         # Configuração do banco de dados
│   │   └── database.js
│   │
│   ├── controllers/    # Entrada HTTP (req/res)
│   │   └── order.controller.js
│   │
│   ├── services/       # Regras de negócio
│   │   └── order.service.js
│   │
│   ├── repositories/   # Acesso ao banco (SQL)
│   │   └── order.repository.js
│   │
│   ├── mappers/        # Conversão DTO ⇄ Database
│   │   └── order.mapper.js
│   │
│   ├── routes/         # Definição das rotas
│   │   └── order.routes.js
│   │
│   ├── models/         # Modelos de domínio
│   │   └── order.model.js
│   │
│   └── app.js          # Configuração do Express
│
├── server.js           # Inicialização do servidor
├── package.json


# ⚙️ Tecnologias Utilizadas

Node.js

Express

PostgreSQL

pg (node-postgres)

# 🗄️ Configuração do Banco de Dados
## 1️⃣ Criar o banco

No PostgreSQL, execute:

CREATE DATABASE orders_db;
## 2️⃣ Criar as tabelas

Após criar o banco, execute:

CREATE TABLE orders (
  orderid SERIAL PRIMARY KEY,
  value NUMERIC NOT NULL,
  creationdate TIMESTAMP NOT NULL
);

CREATE TABLE items (
  orderid INTEGER NOT NULL,
  productid VARCHAR(50) NOT NULL,
  quantity INTEGER NOT NULL,
  price NUMERIC NOT NULL,
  CONSTRAINT fk_order
    FOREIGN KEY (orderid)
    REFERENCES orders(orderid)
    ON DELETE CASCADE
);

✔️ A tabela items possui relacionamento com orders via chave estrangeira.

# 🔌 Configuração da Conexão

As configurações do banco ficam em:

src/config/database.js

Edite conforme seu ambiente:

user
password
host
port
database

# ▶️ Rodando o Projeto

Instale as dependências:

npm install

Inicie o servidor:

node server.js

Se tudo estiver correto, você verá:

Servidor rodando na porta 3000

# 🚀 Endpoints Disponíveis
Criar pedido
POST /order

Body:

{
  "numeroPedido": "ABC-001",
  "valorTotal": 1000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "idItem": "123",
      "quantidadeItem": 2,
      "valorItem": 500
    }
  ]
}
Listar pedidos
GET /order
Buscar pedido por ID
GET /order/:id
Atualizar pedido
PUT /order/:id
Deletar pedido
DELETE /order/:id

# 🧠 Organização em Camadas

O projeto segue separação clara de responsabilidades:

Camada	Responsabilidade
Controller	Recebe requisição HTTP
Service	Regras de negócio e validações
Repository	Comunicação com banco
Mapper	Conversão entre API e banco
Config	Infraestrutura
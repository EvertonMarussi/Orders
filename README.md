# Arquitetura do projeto

order-api/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   │   └── order.controller.js
│   │
│   ├── services/
│   │   └── order.service.js
│   │
│   ├── repositories/
│   │   └── order.repository.js
│   │
│   ├── mappers/
│   │   └── order.mapper.js
│   │
│   ├── routes/
│   │   └── order.routes.js
│   │
│   ├── models/
│   │   └── order.model.js
│   │
│   ├── app.js
│
├── server.js
├── package.json

# Para criar o projeto:

- EM SQL de o seguinte comando: 

CREATE DATABASE orders_db;

- Isso cria o banco de dados para armazenar as tabelas do CRUD
- Após criar o banco, é necessário criar as tabelas:

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

# As configurações de conexão com o banco postgrs:
- Caminho da configuração: 
- config/database.js

# Rodar o projeto
- Pra rodar, basta dar: 
    npm i
    node server.js


# Marketplace EaseDoc

Camada servidor MongoDB para um marketplace, com queries de leitura e comandos de escrita organizados por responsabilidade.

## Requisitos

- Node.js 18+
- Acesso ao MongoDB (padrão: `mongodb://modelum.es/db:27017`, database `marketplace`)

## Instalação

```bash
npm install
```

## Configuração

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

Variáveis disponíveis:

| Variável       | Padrão                              | Descrição              |
|----------------|-------------------------------------|------------------------|
| `MONGODB_URL`  | `mongodb://modelum.es/db:27017`     | URL de conexão MongoDB |
| `DB_NAME`      | `marketplace`                       | Nome do database       |

## Estrutura do projeto

```
src/
├── config/
│   └── database.js              # Configuração de conexão
├── server/
│   └── DatabaseConnection.js    # Cliente MongoDB reutilizável
├── queries/
│   ├── read/                    # Queries de leitura (01–14)
│   └── write/                   # Comandos de escrita (01–07)
└── examples/
    └── query-08-and-write-02.js # Exemplo de uso
```

## Queries de leitura

| Arquivo | Descrição |
|---------|-----------|
| `01-get-order-header.js` | Cabeçalho do pedido |
| `02-list-customer-orders.js` | Pedidos do cliente |
| `03-list-order-payments.js` | Pagamentos do pedido |
| `04-list-order-shipments.js` | Envios do pedido |
| `05-get-order-with-items.js` | Pedido com itens e produtos |
| `06-get-customer-cart.js` | Carrinho do cliente |
| `07-get-customer-wishlist.js` | Lista de desejos |
| `08-get-product-page.js` | Página do produto (produto, vendedor e categoria) |
| `09-list-seller-products.js` | Produtos do vendedor |
| `10-list-category-products.js` | Produtos da categoria |
| `11-list-product-reviews.js` | Avaliações do produto |
| `12-list-customer-reviews.js` | Avaliações do cliente |
| `13-get-payment-operational-view.js` | Visão operacional de pagamento |
| `14-get-shipment-operational-view.js` | Visão operacional de envio |

## Comandos de escrita

| Arquivo | Descrição |
|---------|-----------|
| `01-update-customer-name.js` | Atualiza nome do cliente |
| `02-update-product-price.js` | Atualiza preço do produto |
| `03-update-seller-profile.js` | Atualiza perfil do vendedor |
| `04-update-category-name.js` | Atualiza nome da categoria |
| `05-update-order-status.js` | Atualiza status do pedido |
| `06-create-order.js` | Cria pedido |
| `07-add-review.js` | Adiciona avaliação |

## Exemplo

O script de exemplo busca a página do produto "Smartphone X" e atualiza seu preço:

```bash
npm run example
```

Equivalente a:

```bash
node src/examples/query-08-and-write-02.js
```

## Uso

```javascript
const DatabaseConnection = require('./src/server/DatabaseConnection');
const GetProductPageQuery = require('./src/queries/read/08-get-product-page');

async function main() {
  const connection = new DatabaseConnection();

  try {
    const db = await connection.connect();
    const query = new GetProductPageQuery(db);
    await query.execute('Smartphone X');
  } finally {
    await connection.close();
  }
}

main().catch(console.error);
```

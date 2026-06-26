const DatabaseConnection = require('../server/DatabaseConnection');
const GetProductPageQuery = require('../queries/read/08-get-product-page');
const UpdateProductPriceCommand = require('../queries/write/02-update-product-price');

async function main() {
  const connection = new DatabaseConnection();

  try {
    const db = await connection.connect();

    const getProductPage = new GetProductPageQuery(db);
    const result = await getProductPage.execute('Smartphone X');

    if (result && result.available) {
      console.log(result.product.name + ' - R$ ' + result.product.price);
      console.log('Seller: ' + result.seller.storeName);
      console.log('Rating: ' + result.seller.rating);
      console.log('Category: ' + result.category.name);
    }

    const updateProductPrice = new UpdateProductPriceCommand(db);
    await updateProductPrice.execute('Smartphone X', 2499.90);
    console.log('Product price updated');
  } finally {
    await connection.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

const { callbackify } = require('util');

class GetProductPageQuery {
  constructor(db) {
    this.db = db;
  }

  execute(productName) {
    const db = this.db;
    const findOne = callbackify((collection, filter) => collection.findOne(filter));

    return new Promise((resolve, reject) => {
      findOne(db.collection('products'), { name: productName }, (err, product) => {
        if (err) return reject(err);

        findOne(db.collection('sellers'), { _id: product.sellerId }, (err, seller) => {
          if (err) return reject(err);

          findOne(db.collection('categories'), { _id: product.categoryId }, (err, category) => {
            if (err) return reject(err);

            if (product.stock > 0) {
              console.log(product.name + ' - R$ ' + product.price);
              console.log('Seller: ' + seller.storeName);
              console.log('Rating: ' + seller.rating);
              console.log('Category: ' + category.name);
            }

            resolve();
          });
        });
      });
    });
  }
}

module.exports = GetProductPageQuery;

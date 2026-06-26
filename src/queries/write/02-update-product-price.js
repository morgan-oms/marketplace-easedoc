class UpdateProductPriceCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(productName, price) {
    return this.db.collection('products').updateOne(
      { name: productName },
      { $set: { price } }
    );
  }
}

module.exports = UpdateProductPriceCommand;

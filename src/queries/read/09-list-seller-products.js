class ListSellerProductsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(sellerId) {
    return this.db.collection('products').find({ sellerId }).toArray();
  }
}

module.exports = ListSellerProductsQuery;

class ListCategoryProductsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(categoryId) {
    return this.db.collection('products').find({ categoryId }).toArray();
  }
}

module.exports = ListCategoryProductsQuery;

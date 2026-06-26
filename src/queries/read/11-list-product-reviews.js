class ListProductReviewsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(productId) {
    return this.db.collection('reviews').find({ productId }).toArray();
  }
}

module.exports = ListProductReviewsQuery;

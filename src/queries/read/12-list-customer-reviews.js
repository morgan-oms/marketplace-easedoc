class ListCustomerReviewsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(customerId) {
    return this.db.collection('reviews').find({ customerId }).toArray();
  }
}

module.exports = ListCustomerReviewsQuery;

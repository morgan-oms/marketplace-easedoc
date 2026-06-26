class ListCustomerOrdersQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(customerId) {
    return this.db
      .collection('orders')
      .find({ customerId })
      .sort({ orderDate: -1 })
      .toArray();
  }
}

module.exports = ListCustomerOrdersQuery;

class GetOrderHeaderQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(orderId) {
    return this.db.collection('orders').findOne(
      { _id: orderId },
      {
        projection: {
          _id: 1,
          orderDate: 1,
          status: 1,
          customerId: 1,
          couponId: 1,
        },
      }
    );
  }
}

module.exports = GetOrderHeaderQuery;

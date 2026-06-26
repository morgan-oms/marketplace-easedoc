class ListOrderPaymentsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(orderId) {
    const order = await this.db.collection('orders').findOne(
      { _id: orderId },
      { projection: { payments: 1 } }
    );

    if (!order) {
      return null;
    }

    return order.payments || [];
  }
}

module.exports = ListOrderPaymentsQuery;

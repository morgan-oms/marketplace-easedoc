class GetPaymentOperationalViewQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(paymentId) {
    const order = await this.db.collection('orders').findOne({
      'payments._id': paymentId,
    });

    if (!order) {
      return null;
    }

    const payment = (order.payments || []).find((p) => p._id === paymentId);

    if (!payment) {
      return null;
    }

    const customer = await this.db.collection('customers').findOne(
      { _id: order.customerId },
      { projection: { _id: 1, name: 1, email: 1 } }
    );

    return {
      payment,
      order: {
        _id: order._id,
        orderDate: order.orderDate,
        status: order.status,
        customerId: order.customerId,
      },
      customer,
    };
  }
}

module.exports = GetPaymentOperationalViewQuery;

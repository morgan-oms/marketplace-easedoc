class ListOrderShipmentsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(orderId) {
    const order = await this.db.collection('orders').findOne(
      { _id: orderId },
      { projection: { shipment: 1 } }
    );

    if (!order) {
      return null;
    }

    return order.shipment ? [order.shipment] : [];
  }
}

module.exports = ListOrderShipmentsQuery;

class GetShipmentOperationalViewQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(shipmentId) {
    const order = await this.db.collection('orders').findOne({
      'shipment._id': shipmentId,
    });

    if (!order || !order.shipment) {
      return null;
    }

    const customer = await this.db.collection('customers').findOne(
      { _id: order.customerId },
      { projection: { _id: 1, name: 1, email: 1 } }
    );

    return {
      shipment: order.shipment,
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

module.exports = GetShipmentOperationalViewQuery;

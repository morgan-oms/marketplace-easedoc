class GetOrderWithItemsQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(orderId) {
    const order = await this.db.collection('orders').findOne({ _id: orderId });

    if (!order) {
      return null;
    }

    const productIds = (order.orderItems || []).map((item) => item.productId);

    if (productIds.length === 0) {
      return { ...order, orderItems: [] };
    }

    const products = await this.db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    const productsById = Object.fromEntries(products.map((p) => [p._id, p]));

    const orderItems = (order.orderItems || []).map((item) => ({
      ...item,
      product: productsById[item.productId] || null,
    }));

    return { ...order, orderItems };
  }
}

module.exports = GetOrderWithItemsQuery;

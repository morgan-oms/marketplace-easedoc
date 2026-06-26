class GetCustomerCartQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(customerId) {
    const customer = await this.db.collection('customers').findOne(
      { _id: customerId },
      { projection: { cart: 1 } }
    );

    if (!customer || !customer.cart) {
      return null;
    }

    const cartItems = customer.cart.cartItems || [];
    const productIds = cartItems.map((item) => item.productId);

    if (productIds.length === 0) {
      return { ...customer.cart, cartItems: [] };
    }

    const products = await this.db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    const productsById = Object.fromEntries(products.map((p) => [p._id, p]));

    const enrichedItems = cartItems.map((item) => ({
      ...item,
      product: productsById[item.productId] || null,
    }));

    return { ...customer.cart, cartItems: enrichedItems };
  }
}

module.exports = GetCustomerCartQuery;

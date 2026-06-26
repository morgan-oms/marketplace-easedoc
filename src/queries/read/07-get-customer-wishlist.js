class GetCustomerWishlistQuery {
  constructor(db) {
    this.db = db;
  }

  async execute(customerId) {
    const customer = await this.db.collection('customers').findOne(
      { _id: customerId },
      { projection: { wishlist: 1 } }
    );

    if (!customer || !customer.wishlist) {
      return null;
    }

    const productIds = customer.wishlist.productIds || [];

    if (productIds.length === 0) {
      return { ...customer.wishlist, products: [] };
    }

    const products = await this.db
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();

    return { ...customer.wishlist, products };
  }
}

module.exports = GetCustomerWishlistQuery;

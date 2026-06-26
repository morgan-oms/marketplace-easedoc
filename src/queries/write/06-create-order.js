class CreateOrderCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(order) {
    return this.db.collection('orders').insertOne(order);
  }
}

module.exports = CreateOrderCommand;

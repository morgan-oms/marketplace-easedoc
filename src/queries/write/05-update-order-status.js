class UpdateOrderStatusCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(orderId, status) {
    return this.db.collection('orders').updateOne(
      { _id: orderId },
      { $set: { status } }
    );
  }
}

module.exports = UpdateOrderStatusCommand;

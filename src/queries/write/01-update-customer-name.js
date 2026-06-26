class UpdateCustomerNameCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(customerId, name) {
    return this.db.collection('customers').updateOne(
      { _id: customerId },
      { $set: { name } }
    );
  }
}

module.exports = UpdateCustomerNameCommand;

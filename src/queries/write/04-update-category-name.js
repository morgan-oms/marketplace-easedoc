class UpdateCategoryNameCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(categoryId, name) {
    return this.db.collection('categories').updateOne(
      { _id: categoryId },
      { $set: { name } }
    );
  }
}

module.exports = UpdateCategoryNameCommand;

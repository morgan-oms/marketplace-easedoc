class AddReviewCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(review) {
    return this.db.collection('reviews').insertOne(review);
  }
}

module.exports = AddReviewCommand;

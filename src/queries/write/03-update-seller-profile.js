class UpdateSellerProfileCommand {
  constructor(db) {
    this.db = db;
  }

  async execute(sellerId, profile) {
    const update = {};

    if (profile.storeName !== undefined) {
      update.storeName = profile.storeName;
    }

    if (profile.rating !== undefined) {
      update.rating = profile.rating;
    }

    return this.db.collection('sellers').updateOne(
      { _id: sellerId },
      { $set: update }
    );
  }
}

module.exports = UpdateSellerProfileCommand;

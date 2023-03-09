const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function categoryWiseExpensesFromDb(client) {
  return client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CATEGORY_WISE_EXPENSES)
    .find({ [category]: { $exists: true } })
    .toArray();
}

module.exports = { categoryWiseExpensesFromDb };

const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getExpenseCategoriesFromDb(client) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.EXPENSE_CATEGORY)
    .findOne();
}

module.exports = { getExpenseCategoriesFromDb };

const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function insertCumulativeMonthlyExpenseInDb(client) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .findOne({ [search]: { $exists: true } });
}

module.exports = { insertCumulativeMonthlyExpenseInDb };

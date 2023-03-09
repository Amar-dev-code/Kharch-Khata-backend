const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function insertCumulativeExpense(client, year, month) {
  const search = [year[month]];
  console.log(search);
  const result = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .findOne({ search: { $exists: true } });
  console.log({ result });
  return result;
}

module.exports = { insertCumulativeExpense };

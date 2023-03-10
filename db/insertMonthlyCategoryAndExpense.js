const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function insertMonthlyCategoryAndExpenseInDb(
  client,
  createYearMonthCategoryExpense,
  amount
) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
    .updateOne({}, { $set: { [[createYearMonthCategoryExpense]]: amount } });
}

async function getRelevantDocumentsFromDb(client, year) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
    .find({ [year]: { $exists: true } })
    .toArray();
}

module.exports = {
  insertMonthlyCategoryAndExpenseInDb,
  getRelevantDocumentsFromDb,
};

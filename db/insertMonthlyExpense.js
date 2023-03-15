const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function updateMonthlyExpenseInDb(
  client,
  year,
  createYearMonthCategoryExpense,
  amount,
  session
) {
  const isSuccess = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
    .updateOne(
      { [year]: { $exists: true } },
      { $set: { [[createYearMonthCategoryExpense]]: amount } },
      { session }
    );
  return isSuccess.acknowledged;
}

async function insertMonthlyExpenseInDb(client, document, session) {
  const isSuccess = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
    .insertOne(document, { session });
  return isSuccess.acknowledged;
}

async function getRelevantDocumentsFromDb(client, year) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
    .find({ [year]: { $exists: true } })
    .toArray();
}

module.exports = {
  updateMonthlyExpenseInDb,
  getRelevantDocumentsFromDb,
  insertMonthlyExpenseInDb,
};

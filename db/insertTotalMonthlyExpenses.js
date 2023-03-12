const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getMonthlyExpensesInDb(client, year) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .find({ [year]: { $exists: true } })
    .toArray();
}

async function insertTotalMonthlyExpensesInDb(client, document) {
  const isSuccessful = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .insertOne(document);
  return isSuccessful.acknowledged;
}

async function updateTotalMonthlyExpensesInDb(
  client,
  year,
  yearAndMonth,
  expenseAmount
) {
  const isSuccessful = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .updateOne(
      { [year]: { $exists: true } },
      { $set: { [[yearAndMonth]]: expenseAmount } }
    );
  return isSuccessful.acknowledged;
}

module.exports = {
  getMonthlyExpensesInDb,
  insertTotalMonthlyExpensesInDb,
  updateTotalMonthlyExpensesInDb,
};

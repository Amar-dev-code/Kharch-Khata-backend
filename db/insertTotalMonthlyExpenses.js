const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getMonthlyExpensesInDb(client, year) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .find({ [year]: { $exists: true } })
    .toArray();
}

async function insertTotalMonthlyExpensesInDb(client, document, session) {
  const isSuccessful = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .insertOne(document, { session });
  return isSuccessful.acknowledged;
}

async function updateTotalMonthlyExpensesInDb(
  client,
  year,
  yearAndMonth,
  expenseAmount,
  session
) {
  const isSuccessful = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
    .updateOne(
      { [year]: { $exists: true } },
      { $set: { [[yearAndMonth]]: expenseAmount } },
      { session }
    );
  return isSuccessful.acknowledged;
}

module.exports = {
  getMonthlyExpensesInDb,
  insertTotalMonthlyExpensesInDb,
  updateTotalMonthlyExpensesInDb,
};

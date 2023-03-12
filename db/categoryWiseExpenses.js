const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function categoryWiseExpensesFromDb(client, category) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CATEGORY_WISE_EXPENSES)
    .find({ [category]: { $exists: true } })
    .toArray();
}

async function updateCategoryWiseExpenseInDb(
  client,
  category,
  categoryToBeUpdated,
  amount
) {
  const isSuccess = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CATEGORY_WISE_EXPENSES)
    .updateOne(
      { [category]: { $exists: true } },
      { $set: { [[categoryToBeUpdated]]: amount } }
    );
  return isSuccess.acknowledged;
}

async function insertCategoryWiseExpenseInDb(client, document) {
  const isSuccess = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CATEGORY_WISE_EXPENSES)
    .insertOne(document);
  return isSuccess.acknowledged;
}

module.exports = {
  categoryWiseExpensesFromDb,
  insertCategoryWiseExpenseInDb,
  updateCategoryWiseExpenseInDb,
};

async function insertCategoryWiseExpenseInDb(
  client,
  categoryYearAndMonth,
  amount
) {
  return await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.CATEGORY_WISE_EXPENSES)
    .updateOne({}, { $set: { [[categoryYearAndMonth]]: amount } });
}
module.exports = { insertCategoryWiseExpenseInDb };

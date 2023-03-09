const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function insertMonthlyCategoryAndExpense(
  client,
  year,
  month,
  category,
  amount
) {
  const documents = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
    .find({ [year]: { $exists: true } })
    .toArray();
  if (!documents.length > 0) {
    const createYearMonthCategoryExpense = `${year}.${month}.${category}`;
    await client
      .db(DATABASE_NAME)
      .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
      .updateOne({}, { $set: { [[createYearMonthCategoryExpense]]: amount } });
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          if (document[year][month].hasOwnProperty(category)) {
            const expenseToBeUpdated = document[year][month][category] + amount;
            const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
            await client
              .db(DATABASE_NAME)
              .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
              .updateOne(
                {},
                { $set: { [[categoryToBeUpdatedInDb]]: expenseToBeUpdated } }
              );
          }
        } else {
          const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
          await client
            .db(DATABASE_NAME)
            .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
            .updateOne({}, { $set: { [[categoryToBeUpdatedInDb]]: amount } });
        }
      }
    });
  }
  return documents;
}

module.exports = { insertMonthlyCategoryAndExpense };

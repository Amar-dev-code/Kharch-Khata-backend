const {
  insertMonthlyCategoryAndExpenseInDb,
  getRelevantDocumentsFromDb,
} = require("../db/insertMonthlyCategoryAndExpense");

async function insertMonthlyCategoryAndExpense(
  client,
  year,
  month,
  category,
  amount
) {
  const documents = await getRelevantDocumentsFromDb(client, year);
  if (!documents.length > 0) {
    const createYearMonthCategoryExpense = `${year}.${month}.${category}`;
    await insertMonthlyCategoryAndExpenseInDb(
      client,
      createYearMonthCategoryExpense,
      amount
    );
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          if (document[year][month].hasOwnProperty(category)) {
            const expenseToBeUpdated = document[year][month][category] + amount;
            const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
            await insertMonthlyCategoryAndExpenseInDb(
              client,
              categoryToBeUpdatedInDb,
              expenseToBeUpdated
            );
          }
        } else {
          const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
          await insertMonthlyCategoryAndExpenseInDb(
            client,
            categoryToBeUpdatedInDb,
            amount
          );
        }
      }
    });
  }
  return documents;
}

module.exports = { insertMonthlyCategoryAndExpense };

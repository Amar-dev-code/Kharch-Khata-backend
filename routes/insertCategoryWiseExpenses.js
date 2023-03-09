const { categoryWiseExpensesFromDb } = require("../db/categoryWiseExpenses");
const {
  insertCategoryWiseExpenseInDb,
} = require("../db/insertCategoryWiseExpenseInDb");

async function insertCategoryWiseExpenses(
  client,
  category,
  year,
  month,
  amount
) {
  const documents = await categoryWiseExpensesFromDb(client);
  if (!documents.length > 0) {
    const categoryYearAndMonth = `${category}.${year}.${month}`;
    await insertCategoryWiseExpenseInDb(client, categoryYearAndMonth, amount);
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(category)) {
        if (document[category].hasOwnProperty(year)) {
          if (document[category][year].hasOwnProperty(month)) {
            const expenseToBeUpdated = document[category][year][month] + amount;
            const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
            await insertCategoryWiseExpenseInDb(
              client,
              monthToBeUpdatedInDb,
              expenseToBeUpdated
            );
          }
        } else {
          const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
          await insertCategoryWiseExpenseInDb(
            client,
            monthToBeUpdatedInDb,
            amount
          );
        }
      }
    });
  }
  return documents;
}

module.exports = { insertCategoryWiseExpenses };

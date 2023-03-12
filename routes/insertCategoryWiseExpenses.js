const {
  categoryWiseExpensesFromDb,
  insertCategoryWiseExpenseInDb,
  updateCategoryWiseExpenseInDb,
} = require("../db/categoryWiseExpenses");

async function insertCategoryWiseExpenses(
  client,
  category,
  year,
  month,
  amount
) {
  const documents = await categoryWiseExpensesFromDb(client, category);
  if (!documents.length > 0) {
    const documentToInsert = {
      [category]: {
        [year]: {
          [month]: amount,
        },
      },
    };
    return await insertCategoryWiseExpenseInDb(client, documentToInsert);
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(category)) {
        if (document[category].hasOwnProperty(year)) {
          if (document[category][year].hasOwnProperty(month)) {
            const expenseToBeUpdated = document[category][year][month] + amount;
            const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
            return await updateCategoryWiseExpenseInDb(
              client,
              category,
              monthToBeUpdatedInDb,
              expenseToBeUpdated
            );
          } else {
            const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
            return await updateCategoryWiseExpenseInDb(
              client,
              category,
              monthToBeUpdatedInDb,
              amount
            );
          }
        } else {
          const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
          return await updateCategoryWiseExpenseInDb(
            client,
            category,
            monthToBeUpdatedInDb,
            amount
          );
        }
      }
    });
  }
}

module.exports = { insertCategoryWiseExpenses };

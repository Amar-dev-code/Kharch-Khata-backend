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
    if (documents[0].hasOwnProperty(category)) {
      if (documents[0][category].hasOwnProperty(year)) {
        if (documents[0][category][year].hasOwnProperty(month)) {
          const expenseToBeUpdated =
            documents[0][category][year][month] + amount;
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
  }
}

module.exports = { insertCategoryWiseExpenses };

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
  amount,
  session
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
    return await insertCategoryWiseExpenseInDb(
      client,
      documentToInsert,
      session
    );
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
            expenseToBeUpdated,
            session
          );
        } else {
          const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
          return await updateCategoryWiseExpenseInDb(
            client,
            category,
            monthToBeUpdatedInDb,
            amount,
            session
          );
        }
      } else {
        const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
        return await updateCategoryWiseExpenseInDb(
          client,
          category,
          monthToBeUpdatedInDb,
          amount,
          session
        );
      }
    }
  }
}

module.exports = { insertCategoryWiseExpenses };

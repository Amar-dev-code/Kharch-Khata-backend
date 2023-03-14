const {
  updateMonthlyExpenseInDb,
  getRelevantDocumentsFromDb,
  insertMonthlyExpenseInDb,
} = require("../db/insertMonthlyExpense");

async function insertMonthlyExpense(client, year, month, category, amount) {
  const documents = await getRelevantDocumentsFromDb(client, year);
  if (!documents.length > 0) {
    const documentToInsert = {
      [year]: {
        [month]: {
          [category]: amount,
        },
      },
    };
    return await insertMonthlyExpenseInDb(client, documentToInsert);
  } else {
    if (documents[0].hasOwnProperty(year)) {
      if (documents[0][year].hasOwnProperty(month)) {
        if (documents[0][year][month].hasOwnProperty(category)) {
          const expenseToBeUpdated =
            documents[0][year][month][category] + amount;
          const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
          return await updateMonthlyExpenseInDb(
            client,
            year,
            categoryToBeUpdatedInDb,
            expenseToBeUpdated
          );
        } else {
          const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
          return await updateMonthlyExpenseInDb(
            client,
            year,
            categoryToBeUpdatedInDb,
            amount
          );
        }
      } else {
        const categoryToBeUpdatedInDb = `${year}.${month}.${category}`;
        return await updateMonthlyExpenseInDb(
          client,
          year,
          categoryToBeUpdatedInDb,
          amount
        );
      }
    }
  }
}

module.exports = { insertMonthlyExpense };

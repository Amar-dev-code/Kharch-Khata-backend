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
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          if (document[year][month].hasOwnProperty(category)) {
            const expenseToBeUpdated = document[year][month][category] + amount;
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
    });
  }
}

module.exports = { insertMonthlyExpense };

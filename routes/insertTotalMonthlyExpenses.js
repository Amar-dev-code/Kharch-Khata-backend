const {
  insertTotalMonthlyExpensesInDb,
  updateTotalMonthlyExpensesInDb,
  getMonthlyExpensesInDb,
} = require("../db/insertTotalMonthlyExpenses");

async function insertTotalMonthlyExpenses(client, year, month, expenseAmount) {
  const documents = await getMonthlyExpensesInDb(client, year);

  if (!documents.length > 0) {
    const documentToInsert = {
      [year]: {
        [month]: expenseAmount,
      },
    };
    return await insertTotalMonthlyExpensesInDb(client, documentToInsert);
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          const updatedExpenseForMonth = document[year][month] + expenseAmount;
          const yearAndMonth = `${year}.${month}`;
          return await updateTotalMonthlyExpensesInDb(
            client,
            year,
            yearAndMonth,
            updatedExpenseForMonth
          );
        } else {
          const yearAndMonth = `${year}.${month}`;
          return await updateTotalMonthlyExpensesInDb(
            client,
            year,
            yearAndMonth,
            expenseAmount
          );
        }
      }
    });
  }
}
module.exports = { insertTotalMonthlyExpenses };

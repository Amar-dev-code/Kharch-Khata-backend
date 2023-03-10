const {
  insertMonthlyExpensesInDb,
  getMonthlyExpensesInDb,
} = require("../db/insertMonthlyExpenses");

async function insertTotalMonthlyExpenses(client, year, month, expenseAmount) {
  const documents = await getMonthlyExpensesInDb(client, year);
  if (!documents.length > 0) {
    const yearAndMonth = `${year}.${month}`;
    await insertMonthlyExpensesInDb(client, yearAndMonth, expenseAmount);
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          const updatedExpenseForMonth = document[year][month] + expenseAmount;
          const yearAndMonth = `${year}.${month}`;
          await insertMonthlyExpensesInDb(
            client,
            yearAndMonth,
            updatedExpenseForMonth
          );
        } else {
          const yearAndMonth = `${year}.${month}`;
          await insertMonthlyExpensesInDb(client, yearAndMonth, expenseAmount);
        }
      }
    });
  }
  return documents;
}
module.exports = { insertTotalMonthlyExpenses };

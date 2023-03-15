const {
  insertTotalMonthlyExpensesInDb,
  updateTotalMonthlyExpensesInDb,
  getMonthlyExpensesInDb,
} = require("../db/insertTotalMonthlyExpenses");

async function insertTotalMonthlyExpenses(
  client,
  year,
  month,
  expenseAmount,
  session
) {
  const documents = await getMonthlyExpensesInDb(client, year);
  if (!documents.length > 0) {
    const documentToInsert = {
      [year]: {
        [month]: expenseAmount,
      },
    };
    return await insertTotalMonthlyExpensesInDb(
      client,
      documentToInsert,
      session
    );
  } else {
    if (documents[0].hasOwnProperty(year)) {
      if (documents[0][year].hasOwnProperty(month)) {
        const updatedExpenseForMonth =
          documents[0][year][month] + expenseAmount;
        const yearAndMonth = `${year}.${month}`;
        return await updateTotalMonthlyExpensesInDb(
          client,
          year,
          yearAndMonth,
          updatedExpenseForMonth,
          session
        );
      } else {
        const yearAndMonth = `${year}.${month}`;
        return await updateTotalMonthlyExpensesInDb(
          client,
          year,
          yearAndMonth,
          expenseAmount,
          session
        );
      }
    }
  }
}
module.exports = { insertTotalMonthlyExpenses };

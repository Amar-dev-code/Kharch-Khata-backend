const { getAllExpensesForTheMonth } = require("../db/getAllExpensesForTheMonth");

async function fetchTotalExpenseForTheMonth(client, year, month) {
    const yearAndMonth = `${year}.${month}`;
    const response = await getAllExpensesForTheMonth(client, yearAndMonth);
    let expense = 0;
    const obj = response[0][year.toString()][month];
    for (let expenseCategory in obj) {
        expense = expense + obj[expenseCategory];
    }
    return expense;
}

module.exports = { fetchTotalExpenseForTheMonth };
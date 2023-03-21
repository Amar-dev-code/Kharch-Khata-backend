const { getAllExpensesForTheMonth } = require("../db/getAllExpensesForTheMonth");

async function fetchAllExpensesForTheMonth(client, year, month) {
    const yearAndMonth = `${year}.${month}`;
    const response = await getAllExpensesForTheMonth(client, yearAndMonth)
    return response;
}

module.exports = { fetchAllExpensesForTheMonth };
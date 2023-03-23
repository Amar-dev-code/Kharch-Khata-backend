const { getMonthlyExpensesForTheYear } = require("../db/getMonthlyExpensesForTheYear");

async function fetchMonthlyExpensesForTheYear(client, year) {
    const response = await getMonthlyExpensesForTheYear(client, year);
    return response[0][year];
}

module.exports = { fetchMonthlyExpensesForTheYear };
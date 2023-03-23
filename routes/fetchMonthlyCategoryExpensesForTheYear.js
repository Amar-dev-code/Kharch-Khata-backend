const { getMonthlyCategoryExpensesForThYear } = require("../db/getMonthlyCategoryExpensesForTheYear");

async function fetchMonthlyCategoryExpensesForTheYear(client, year, category) {
    const response = await getMonthlyCategoryExpensesForThYear(client, year, category);
    return response[0][category][year];
}

module.exports = { fetchMonthlyCategoryExpensesForTheYear };
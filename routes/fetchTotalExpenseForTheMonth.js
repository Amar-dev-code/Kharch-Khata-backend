const { getTotalExpenseForTheMonth } = require("../db/getTotalExpenseForTheMonth");

async function fetchTotalExpenseForTheMonth(client, year, month) {
    const yearAndMonth = `${year}.${month}`;
    const response = await getTotalExpenseForTheMonth(client, yearAndMonth);
    return response[0][year][month];
}

module.exports = { fetchTotalExpenseForTheMonth };
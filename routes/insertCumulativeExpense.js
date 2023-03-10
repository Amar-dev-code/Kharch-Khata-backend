const {
  insertCumulativeMonthlyExpenseInDb,
} = require("../db/insertCumulativeMonthlyExpense");

async function insertCumulativeExpense(client, year, month) {
  const search = [year[month]];
  const result = await insertCumulativeMonthlyExpenseInDb(search);
  return result;
}

module.exports = { insertCumulativeExpense };

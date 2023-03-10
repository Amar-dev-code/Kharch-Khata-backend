async function getMonthlyExpensesInDb(client, year) {
  return await client
    .db("myFirstDatabase")
    .collection("cumulativeExpensesMonthly")
    .find({ [year]: { $exists: true } })
    .toArray();
}
async function insertMonthlyExpensesInDb(client, yearAndMonth, expenseAmount) {
  return client
    .db("myFirstDatabase")
    .collection("cumulativeExpensesMonthly")
    .updateOne({}, { $set: { [[yearAndMonth]]: expenseAmount } });
}
module.exports = { getMonthlyExpensesInDb, insertMonthlyExpensesInDb };

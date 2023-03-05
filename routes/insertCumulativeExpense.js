async function insertCumulativeExpense(client, year, month) {
  //console.log(year);
  //console.log(month);
  const search = [year[month]];
  console.log(search);
  const result = await client
    .db("myFirstDatabase")
    .collection("cumulativeExpensesMonthly")
    .findOne({ search: { $exists: true } });
  console.log({ result });
  return result;
}
module.exports = { insertCumulativeExpense };

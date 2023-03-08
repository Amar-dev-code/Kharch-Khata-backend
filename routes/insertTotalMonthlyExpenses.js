async function insertTotalMonthlyExpenses(client, year, month, expenseAmount) {
  const documents = await client
    .db("myFirstDatabase")
    .collection("cumulativeExpensesMonthly")
    .find({ [year]: { $exists: true } })
    .toArray();
  if (!documents.length > 0) {
    const yearAndMonth = `${year}.${month}`;
    await client
      .db("myFirstDatabase")
      .collection("cumulativeExpensesMonthly")
      .updateOne({}, { $set: { [[yearAndMonth]]: expenseAmount } });
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          const updatedExpenseForMonth = document[year][month] + expenseAmount;
          const yearAndMonth = `${year}.${month}`;
          await client
            .db("myFirstDatabase")
            .collection("cumulativeExpensesMonthly")
            .updateOne(
              {},
              { $set: { [[yearAndMonth]]: updatedExpenseForMonth } }
            );
        } else {
          const yearAndMonth = `${year}.${month}`;
          await client
            .db("myFirstDatabase")
            .collection("cumulativeExpensesMonthly")
            .updateOne({}, { $set: { [[yearAndMonth]]: expenseAmount } });
        }
      }
    });
  }
  return documents;
}
module.exports = { insertTotalMonthlyExpenses };

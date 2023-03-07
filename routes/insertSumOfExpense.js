async function insertCumulativeExpense(client, year, month) {
    const documents = await client
      .db("myFirstDatabase")
      .collection("cumulativeExpensesMonthly")
      .find({ [year]: { $exists: true } })
      .toArray();
    documents.forEach((document) => {
      if (document.hasOwnProperty(year)) {
        if (document[year].hasOwnProperty(month)) {
          console.log("month exists");
        } else {
          console.log("month doesn't exist");
        }
      }
    });
    return documents;
  }
  module.exports = { insertCumulativeExpense };
  
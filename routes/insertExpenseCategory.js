async function insertExpenseCategory(client, newExpenseCategory) {
  const result = await client
    .db("myFirstDatabase")
    .collection("expenseCategory")
    .updateOne({}, { $push: { category: newExpenseCategory } });
}

module.exports = { insertExpenseCategory };

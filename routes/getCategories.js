async function getCategories(client) {
  const result = await client
    .db("myFirstDatabase")
    .collection("expenseCategory")
    .findOne();
  return result.category;
}

module.exports = { getCategories };

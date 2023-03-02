async function getCategory(client) {
  const result = await client
    .db("myFirstDatabase")
    .collection("expenseCategory")
    .findOne();
  console.log({ result });
  return result;
}

module.exports = { getCategory };

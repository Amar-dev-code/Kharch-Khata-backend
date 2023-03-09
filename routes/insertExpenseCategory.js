const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function insertExpenseCategory(client, newExpenseCategory) {
  const result = await client
    .db(DATABASE_NAME)
    .collection(COLLECTION_NAMES.EXPENSE_CATEGORY)
    .updateOne({}, { $push: { category: newExpenseCategory } });
}

module.exports = { insertExpenseCategory };

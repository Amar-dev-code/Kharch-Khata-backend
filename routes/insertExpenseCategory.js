const { insertExpenseCategoryInDb } = require("../db/insertExpenseCategory");

async function insertExpenseCategory(client, newExpenseCategory) {
  const result = await insertExpenseCategoryInDb(client, newExpenseCategory);
  return result.acknowledged;
}

module.exports = { insertExpenseCategory };

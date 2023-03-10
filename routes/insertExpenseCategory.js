const { insertExpenseCategoryInDb } = require("../db/insertExpenseCategory");

async function insertExpenseCategory(client, newExpenseCategory) {
  const result = await insertExpenseCategoryInDb(newExpenseCategory);
}

module.exports = { insertExpenseCategory };

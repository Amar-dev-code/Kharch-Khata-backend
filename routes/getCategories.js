const { getExpenseCategoriesFromDb } = require("../db/expenseCategories");

async function getCategories(client) {
  const result = await getExpenseCategoriesFromDb(client);
  return result.category;
}

module.exports = { getCategories };

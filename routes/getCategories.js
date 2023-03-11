const { getExpenseCategoriesFromDb } = require("../db/expenseCategories");

async function getCategories(client) {
  const documents = await getExpenseCategoriesFromDb(client);
  return documents.category;
}

module.exports = { getCategories };

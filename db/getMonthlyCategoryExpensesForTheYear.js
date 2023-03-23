const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getMonthlyCategoryExpensesForThYear(client, year, category) {
    const expenseToBeFound = `${category}.${year}`
    return await client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAMES.CATEGORY_WISE_EXPENSES)
        .find({ [expenseToBeFound]: { $exists: true } })
        .toArray();
}

module.exports = { getMonthlyCategoryExpensesForThYear };
const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getMonthlyExpensesForTheYear(client, year) {
    return await client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
        .find({ [year]: { $exists: true } })
        .toArray();
}

module.exports = { getMonthlyExpensesForTheYear };
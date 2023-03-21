const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getAllExpensesForTheMonth(
    client,
    yearAndMonth
) {
    return await client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAMES.ALL_EXPENSE_MONTHLY)
        .find(
            { [yearAndMonth]: { $exists: true } }
        ).toArray();
}

module.exports = { getAllExpensesForTheMonth }
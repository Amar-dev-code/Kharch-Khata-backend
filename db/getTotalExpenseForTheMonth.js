const { DATABASE_NAME, COLLECTION_NAMES } = require("../constant");

async function getTotalExpenseForTheMonth(client, month) {
    return await client
        .db(DATABASE_NAME)
        .collection(COLLECTION_NAMES.CUMULATIVE_EXPENSE_MONTHLY)
        .find({ [month]: { $exists: true } })
        .toArray();
}

module.exports = { getTotalExpenseForTheMonth };
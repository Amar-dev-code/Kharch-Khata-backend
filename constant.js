const COLLECTION_NAMES = {
  EXPENSE_CATEGORY: "expenseCategory",
  CATEGORY_WISE_EXPENSES: "categoryWiseExpenses",
  CUMULATIVE_EXPENSE_MONTHLY: "cumulativeExpensesMonthly",
  ALL_EXPENSE_MONTHLY: "allExpensesMonthly",
};
const DATABASE_NAME = "myFirstDatabase";
const STATUS_MESSAGES = {
  SERVER_ERROR: "Server error",
};
const ROUTES = {
  GET_EXPENSE_CATEGORIES: "/getExpenseCategories",
  ADD_EXPENSE: "/addExpense",
};

module.exports = { COLLECTION_NAMES, DATABASE_NAME, STATUS_MESSAGES, ROUTES };

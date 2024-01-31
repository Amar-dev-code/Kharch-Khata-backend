const COLLECTION_NAMES = {
  EXPENSE_CATEGORY: "expenseCategory",
  CATEGORY_WISE_EXPENSES: "categoryWiseExpenses",
  CUMULATIVE_EXPENSE_MONTHLY: "cumulativeExpensesMonthly",
  ALL_EXPENSE_MONTHLY: "allExpensesMonthly",
};
const DATABASE_NAME = "myFirstDatabase";
const MESSAGES = {
  SERVER_ERROR: "Server error",
  NO_EXPENSE_CATEGORIES_FOUND: "No expense categories found",
  EXPENSE_ADDED: "Expense Added",
  EXPENSE_NOT_FOUND: "No expenses found",
};
const ROUTES = {
  GET_EXPENSE_CATEGORIES: "/getExpenseCategories",
  ADD_EXPENSE: "/addExpense",
  ALL_EXPENSES_FOR_THE_MONTH: "/allExpensesForTheMonth",
  TOTAL_EXPENSE_FOR_MONTH: "/totalExpense",
  MONTHLY_EXPENSES_FOR_THE_YEAR: "/MonthlyExpensesForTheYear",
  MONTHLY_CATEGORY_EXPENSES_FOR_THE_YEAR: "/monthlyCategoryExpensesForTheYear",
};

module.exports = { COLLECTION_NAMES, DATABASE_NAME, MESSAGES, ROUTES };

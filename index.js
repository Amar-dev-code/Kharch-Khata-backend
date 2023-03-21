const express = require("express");

const { getCategories } = require("./routes/getCategories");
const { connectToDataBase } = require("./db/initializedb");
const {
  insertTotalMonthlyExpenses,
} = require("./routes/insertTotalMonthlyExpenses");
const {
  insertMonthlyCategoryAndExpense,
} = require("./routes/insertMonthlyExpense");
const {
  insertCategoryWiseExpenses,
} = require("./routes/insertCategoryWiseExpenses");
const { insertMonthlyExpense } = require("./routes/insertMonthlyExpense");
const { insertExpenseCategory } = require("./routes/insertExpenseCategory");
const { fetchAllExpensesForTheMonth } = require("./routes/getAllExpensesForTheMonth");
const { MESSAGES, ROUTES } = require("./constant");

const app = express();
const port = 3000;

app.get(ROUTES.GET_EXPENSE_CATEGORIES, async (req, res) => {
  try {
    const client = await connectToDataBase();
    const expenseCategories = await getCategories(client);
    if (expenseCategories.length > 0) {
      res.status(200).send(expenseCategories);
    } else res.status(200).send(MESSAGES.NO_EXPENSE_CATEGORIES_FOUND);
  } catch (e) {
    res.status(500).send(MESSAGES.SERVER_ERROR);
  }
});

app.get(ROUTES.ADD_EXPENSE, async (req, res) => {
  const client = await connectToDataBase();
  const session = client.startSession();
  try {
    session.startTransaction();
    const categories = await getCategories(client);
    if (!categories.includes(req.expenseCategory)) {
      await Promise.all([
        insertExpenseCategory(client, req.expenseCategory),
        insertTotalMonthlyExpenses(client, 2031, "february", 5000, session),
        insertMonthlyExpense(client, 2026, "january", "rent", 5000, session),
        insertCategoryWiseExpenses(client, "rent", 2027, "march", 5000),
      ]);
      await session.commitTransaction();
      res.status(200).send("Expense Added");
    } else {
      await Promise.all([
        insertTotalMonthlyExpenses(client, 2031, "february", 5000, session),
        insertMonthlyExpense(client, 2026, "january", "rent", 5000, session),
        insertCategoryWiseExpenses(
          client,
          "rent",
          2027,
          "march",
          5000,
          session
        ),
      ]);
      await session.commitTransaction();
      res.status(200).send(MESSAGES.EXPENSE_ADDED);
    }
  } catch (e) {
    await session.abortTransaction();
    res.status(500).send(MESSAGES.SERVER_ERROR);
  } finally {
    session.endSession();
  }
});


app.get(ROUTES.ALL_EXPENSES_FOR_THE_MONTH, async (req, res) => {
  try {
    const client = await connectToDataBase();
    const year = 2027;
    const month = "january";
    const expenses = await fetchAllExpensesForTheMonth(client, year, month);
    if (expenses.length > 0) {
      res.status(200).send(expenses[0]);
    }
    else {
      res.status(200).send(MESSAGES.EXPENSE_NOT_FOUND);
    }
  } catch {
    res.status(500).send(MESSAGES.SERVER_ERROR)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




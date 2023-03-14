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

const { STATUS_MESSAGES, ROUTES } = require("./constant");

const app = express();
const port = 3000;

app.get(ROUTES.GET_EXPENSE_CATEGORIES, async (req, res) => {
  try {
    const client = await connectToDataBase();
    const expenseCategories = await getCategories(client);
    if (expenseCategories.length > 0) {
      res.status(200).send(expenseCategories);
    } else res.status(200).send(STATUS_MESSAGES.NO_EXPENSE_CATEGORIES_FOUND);
  } catch (e) {
    res.status(500).send(STATUS_MESSAGES.SERVER_ERROR);
  }
});

app.get(ROUTES.ADD_EXPENSE, async (req, res) => {
  try {
    const client = await connectToDataBase();
    const categories = await getCategories(client);
    if (!categories.includes(req.expenseCategory)) {
      const isInsertSuccess = await insertExpenseCategory(
        client,
        req.expenseCategory
      );
      if (!isInsertSuccess) {
        res.status(500).send(STATUS_MESSAGES.SERVER_ERROR);
      } else {
      }
    }
    await Promise.all([
      insertTotalMonthlyExpenses(client, 2031, "february", 5000),
      insertMonthlyExpense(client, 2026, "january", "rent", 5000),
      insertCategoryWiseExpenses(client, "rent", 2027, "march", 5000),
    ]);
    res.status(200).send("Expense Added");
  } catch (e) {
    res.status(500).send(STATUS_MESSAGES.SERVER_ERROR);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const express = require("express");

const { getCategories } = require("./routes/getCategories");
const { connectToDataBase } = require("./db/initializedb");
const {
  insertTotalMonthlyExpenses,
} = require("./routes/insertTotalMonthlyExpenses");
const {
  insertMonthlyCategoryAndExpense,
} = require("./routes/insertMonthlyCategoryAndExpense");
const {
  insertCategoryWiseExpenses,
} = require("./routes/insertCategoryWiseExpenses");
const { insertExpenseCategory } = require("./routes/insertExpenseCategory");

const { STATUS_MESSAGES, ROUTES } = require("./constant");

const app = express();
const port = 3000;

app.get(ROUTES.GET_EXPENSE_CATEGORIES, async (req, res) => {
  try {
    const client = await connectToDataBase();
    const expenseCategories = await getCategories(client);
    if (expenseCategories.length > 0) {
      res.status(200).send(expenseCategories);
    } else res.status(500).send(STATUS_MESSAGES.SERVER_ERROR);
  } catch (e) {
    res.status(500).send(STATUS_MESSAGES.SERVER_ERROR);
  }
});

app.get(ROUTES.ADD_EXPENSE, async (req, res) => {
  const client = await connectToDataBase();
  const categories = await getCategories(client);
  if (!categories.includes(req.expenseCategory)) {
    const isInsertSuccess = await insertExpenseCategory(
      client,
      req.expenseCategory
    );
    if (!isInsertSuccess) {
      res.status(500).send(STATUS_MESSAGES.SERVER_ERROR);
    }
    else{
      
    }
  }
  //await insertTotalMonthlyExpenses(client, 2024, "january", 27.01);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

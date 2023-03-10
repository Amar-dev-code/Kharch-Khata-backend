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

const app = express();
const port = 3000;

app.get("/getExpenseCategories", async (req, res) => {
  const client = await connectToDataBase();
  const expenseCategories = await getCategories(client);
  if (expenseCategories.length > 0) {
    res.status(200).send(categories);
    await insertCategoryWiseExpenses(client, "uber", "2023", "january", 210);
  } else res.status(500).send("Server error");
});

app.post("/submitExpense", async (req, res) => {
  const client = await connectToDataBase();
  const categories = await getCategories(client);
  if (!categories.includes(req.expenseCategory)) {
    await insertExpenseCategory(client, req.expenseCategory);
  }
  await insertTotalMonthlyExpenses(client, 2024, "january", 27.01);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

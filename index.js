const express = require("express");

const { getCategories } = require("./routes/getCategories");
const { connectToDataBase } = require("./db/initializedb");
const { insertExpenseCategory } = require("./routes/insertExpenseCategory");

const app = express();
const port = 3000;

app.get("/getExpenseCategories", async (req, res) => {
  const client = await connectToDataBase();
  const categories = await getCategories(client);
  if (categories.length > 0) {
    res.status(200).send(categories);
  } else res.status(500).send("Server error");
});

app.post("/submitExpense", async (req, res) => {
  const client = await connectToDataBase();
  const categories = await getCategories(client);
  if (!categories.includes(req.expenseCategory)) {
    await insertExpenseCategory(client, req.expenseCategory);
  } else {
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

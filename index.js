const express = require("express");
const { MongoClient } = require("mongodb");

const { getCategory } = require("./routes/getCategory");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

async function connectToDataBase() {
  const uri =
    "mongodb+srv://dbUser:7gYppmXluBPtoUEP@cluster0.iasv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log(getCategory(client));
  } catch (e) {
    console.error(e);
  } finally {
    console.log("amrendra");
    //await client.close();
  }
}
connectToDataBase().catch(console.error);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

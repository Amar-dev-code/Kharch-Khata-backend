const { MongoClient } = require("mongodb");

async function connectToDataBase() {
  const uri =
    "mongodb+srv://dbUser:7gYppmXluBPtoUEP@cluster0.iasv4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
  } catch (e) {
    console.error(e);
    await client.close();
  }
  return client;
}
module.exports = { connectToDataBase };

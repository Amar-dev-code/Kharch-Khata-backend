async function insertCategoryWiseExpenses(
  client,
  category,
  year,
  month,
  amount
) {
  const documents = await client
    .db("myFirstDatabase")
    .collection("categoryWiseExpenses")
    .find({ [category]: { $exists: true } })
    .toArray();
  console.log({ documents });
  if (!documents.length > 0) {
    const categoryYearAndMonth = `${category}.${year}.${month}`;
    console.log({ categoryYearAndMonth });
    await client
      .db("myFirstDatabase")
      .collection("categoryWiseExpenses")
      .updateOne({}, { $set: { [[categoryYearAndMonth]]: amount } });
  } else {
    documents.forEach(async (document) => {
      if (document.hasOwnProperty(category)) {
        if (document[category].hasOwnProperty(year)) {
          if (document[category][year].hasOwnProperty(month)) {
            const expenseToBeUpdated = document[category][year][month] + amount;
            const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
            await client
              .db("myFirstDatabase")
              .collection("categoryWiseExpenses")
              .updateOne(
                {},
                { $set: { [[monthToBeUpdatedInDb]]: expenseToBeUpdated } }
              );
          }
        } else {
          const monthToBeUpdatedInDb = `${category}.${year}.${month}`;
          await client
            .db("myFirstDatabase")
            .collection("categoryWiseExpenses")
            .updateOne({}, { $set: { [[monthToBeUpdatedInDb]]: amount } });
        }
      }
    });
  }
  return documents;
}

module.exports = { insertCategoryWiseExpenses };

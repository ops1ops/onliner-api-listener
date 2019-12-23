require("dotenv").config();
const express = require("express");
const db = require("./db");

const { Item } = db;

const app = express();

const PORT = process.env.PORT || 8000;

app.set("view engine", "ejs");

app.use(express.json());
app.set("json spaces", 4);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

//require('./onliner-listener');

app.use("/test", async (req, res) => {
  const items = await Item.findAll({
    attributes: ["name", "htmlUrl", "imageUrl", "price"],
    include: ["history"]
  });

  return res.render("home", { items });
});

app.use("/front", async (req, res) => {
  const viewModel = {};
  let items = await Item.findAll({
    attributes: ["name", "htmlUrl", "imageUrl", "price"],
    include: ["history"]
  });

 
//  items =  items.map(item => {
//     if(!item.history){
//       item.history = [];
//       return item
//     }

//     item.history = item.history.map(el => ({
//       x: new Date(el.createdAt),
//       y: el.price
//     }));

//     return item;
//   });

//   console.log(items[4].history); - OK. mapping works perfectly

//   viewModel.items = items;
//   return res.render("home", viewModel );
//   => in EJS - items not mapped => WTF???
//   fucking magic. 
  viewModel.items = items;

  return res.render("home", viewModel );
});

app.use("/", async (req, res) => {
  const items = await Item.findAll({
    attributes: ["name", "htmlUrl", "imageUrl", "price"],
    include: ["history"]
  });

  return res.send(items);
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

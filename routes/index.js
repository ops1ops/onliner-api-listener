const db = require("../db");
const { Op } = require("sequelize");
const { Item,User } = db;
var express = require('express');
var router  = express.Router();

router.get("/", async (req, res) => {
  const viewModel = {};
  if(req.query.query){
    viewModel.items = await Item.findAll({
      attributes: ["name", "htmlUrl", "imageUrl", "price"],
      include: ["history"],
      where:  {
        name: { [Op.like]: `%${req.query.query}%`} 
      }
    });
    viewModel.items = items;
    return res.render("home", viewModel );
  } else {
    viewModel.items = await Item.findAll({
      attributes: ["name", "htmlUrl", "imageUrl", "price"],
      include: ["history"]
    });
    
    return res.render("home", viewModel );
  }
  
});
module.exports = router;
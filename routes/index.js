const db = require("../db");
const { Op } = require("sequelize");
const { Item,User } = db;
const express = require('express');
const router  = express.Router();

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

const router = require('express').Router();
const { Op } = require('sequelize');
const db = require('../db');

const { Item } = db;

router.get('/', async (req, res) => {
  const viewModel = {};
  if (req.query.query) {
    viewModel.items = await Item.findAll({
      attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
      include: ['history'],
      where: {
        name: { [Op.like]: `%${req.query.query}%` },
      },
    });

    return res.render('home', viewModel);
  }
  viewModel.items = await Item.findAll({
    attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
    include: ['history'],
  });

  return res.render('home', viewModel);
});
module.exports = router;

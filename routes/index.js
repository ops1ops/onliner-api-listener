import React from 'react';
import { renderToString } from 'react-dom/server';
import { Router } from 'express';
import { Op } from 'sequelize';
import { App } from '../components/App';
import db from '../db';

const { Item } = db;
const router = Router();
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

// eslint-disable-next-line react/jsx-filename-extension
router.get('/react', async (req, res) => res.render('react', { ReactApp: renderToString(<App />) }));
export default router;

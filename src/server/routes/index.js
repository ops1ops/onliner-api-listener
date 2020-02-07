import { Router } from 'express';
import { Op } from 'sequelize';
import os from 'os';
import db from '../db';

const { Item } = db;
const router = Router();

router.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
router.get('/api', async ({ query: { query } }, res) => {
  let items;
  if (query) {
    items = await Item.findAll({
      attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
      include: ['history'],
      where: {
        name: { [Op.like]: `%${query}%` },
      },
    });
  } else {
    items = await Item.findAll({
      attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
      include: ['history'],
    });
  }

  return res.send(items);
});


export default router;

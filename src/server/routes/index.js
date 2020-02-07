import { Router } from 'express';
import { Op } from 'sequelize';
import os from 'os';
import db from '../db';

const { Item } = db;
const router = Router();

router.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
router.get('/api', async (req, res) => {
  let items;
  if (req.query.query) {
    items = await Item.findAll({
      attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
      include: ['history'],
      where: {
        name: { [Op.like]: `%${req.query.query}%` },
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

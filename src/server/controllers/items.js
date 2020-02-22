import { Op } from 'sequelize';
import db from '../db';

const { Item } = db;

// eslint-disable-next-line import/prefer-default-export
export const getAllItems = async ({ query: { name } }, res) => {
  let items;

  if (name) {
    items = await Item.findAll({
      attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
      include: ['history'],
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
  } else {
    items = await Item.findAll({
      attributes: ['name', 'htmlUrl', 'imageUrl', 'price'],
      include: ['history'],
    });
  }

  return res.send(items);
};

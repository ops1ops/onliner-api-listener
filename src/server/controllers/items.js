import { Op } from 'sequelize';
import db from '../db';
import onliner from '../services/onlinerAPI';

const { Item, UserItems } = db;

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

export const getItemsByCategory = async ({ params: { categoryKey }, query: { page } }, res) => {
  const items = await onliner.searchByCategory(categoryKey, page);

  return res.send(items);
};

export const getItemsByQuery = async ({ query: { query } }, res) => {
  if (!query) {
    return res.send('"query" is the mandatory parameter!');
  }
  const items = await onliner.searchByQuery(query);

  return res.send(items);
};

export const subscribeUserToItem = async ({ userId, params: { itemId } }, res) => {
  const [userItem, isCreated] = await UserItems.findOrCreate({
    where: { userId, itemId },
    defaults: { userId, itemId },
  });
  const response = userItem.get({ plain: true });
  response.isAlreadySubscribed = !isCreated;

  res.send({ ...response });
};

export const unsubscribeUserFromItem = async ({ userId, params: { itemId } }, res) => {
  const deletedRows = await UserItems.destroy({
    where: { userId, itemId },
    raw: true,
  });

  res.send({ unsubscribed: !!deletedRows });
};

import { Op } from 'sequelize';
import db from '../db';
import onliner from '../services/onlinerAPI';

const { Item, UserItems } = db;

export const getItemById = async ({ params: { id } }, res) => {
  const item = await Item.findAll({
    include: ['history'],
    where: { id },
  });

  return res.send(...item);
};

export const getAllItems = async ({ query: { name } }, res) => {
  let items;

  if (name) {
    items = await Item.findAll({
      include: ['history'],
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
  } else {
    items = await Item.findAll({
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

export const subscribeUserToItem = async ({ userId, params: { itemKey } }, res) => {
  // TODO: check for valid id === accept key instead of itemKey, then get id from onliner
  // THE PROBLEM: Videocards don't have `key` property filled for now
  const { id: itemId, key, full_name: name,
    prices: { price_min: { amount: price } } } = await onliner.getItemByKey(itemKey);

  await Item.findOrCreate({
    where: { id: itemId },
    defaults: { id: itemId, key, name, price },
  });

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

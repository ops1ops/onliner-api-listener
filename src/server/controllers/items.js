import { Op } from "sequelize";

import db from "../db";
import onliner from "../services/onlinerAPI";

const { Item, User, UserItems } = db;

const mergeOnlinerItemsWithTrackable = async (onlinerItems, userId) => {
  const onlinerItemsIds = onlinerItems.map(({ id }) => id);
  const userItems = await UserItems.findAll({
    attributes: ["itemId"],
    where: {
      userId,
      itemId: onlinerItemsIds,
    },
    raw: true,
  });
  const userItemsIds = userItems.map(({ itemId }) => itemId);

  return onlinerItems.map((item) => {
    const isSubscribed = userItemsIds.includes(item.id);

    return { ...item, isSubscribed };
  });
};

export const getItemByKey = async ({ params: { key } }, res) => {
  const onlinerItem = await onliner.getItemByKey(key);
  const trackableItem = await Item.findOne({
    include: ["history"],
    where: { key },
  });

  return res.send({
    ...onlinerItem,
    history: trackableItem ? trackableItem.history : null,
  });
};

export const getAllItems = async ({ query: { name } }, res) => {
  let items;

  if (name) {
    items = await Item.findAll({
      include: ["history"],
      where: {
        name: { [Op.like]: `%${name}%` },
      },
    });
  } else {
    items = await Item.findAll({
      include: ["history"],
    });
  }

  return res.send(items);
};

export const getItemsByCategory = async ({ userId, params: { categoryKey }, query: { page } }, res) => {
  const data = await onliner.searchByCategory(categoryKey, page);

  data.products = await mergeOnlinerItemsWithTrackable(data.products, userId);

  return res.send(data);
};

export const getItemsByQuery = async ({ userId, query: { query } }, res) => {
  if (!query) {
    return res.send("'query' is the mandatory parameter!");
  }

  const response = await onliner.searchByQuery(query);

  response.products = await mergeOnlinerItemsWithTrackable(response.products, userId);

  return res.send(response);
};

export const subscribeUserToItem = async ({ userId, params: { itemKey } }, res) => {
  const {
    id: itemId,
    key,
    full_name: name,
    prices: {
      price_min: { amount: price },
    },
  } = await onliner.getItemByKey(itemKey);

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

export const getUserItems = async ({ userId }, res) => {
  const user = await User.findOne({
    where: { id: userId },
  });
  const userItems = await user.getItems();

  return res.send(userItems);
};

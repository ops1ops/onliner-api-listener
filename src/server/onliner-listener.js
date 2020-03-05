import sleep from './utils/sleep';
import onlinerAPI from './services/onlinerAPI';

require('dotenv').config();
const { setRandomInterval } = require('set-random-interval');
const db = require('./db');

const { Item } = db;

const MIN_DELAY = 30 * 60 * 1000;
const MAX_DELAY = 60 * 60 * 1000;

const getSleepTime = (wholeTime, itemsCount, processingTime) => {
  const maxSleepTime = wholeTime / itemsCount - processingTime;

  return Math.floor(Math.random() * Math.floor(maxSleepTime));
};

const callback = async () => {
  const items = await Item.findAll();
  const itemsCount = items.length;

  for (let i = 0; i < itemsCount - 1; i++) {
    const startProcessingTime = new Date();
    const item = items[i];
    const { key, price } = item;
    const { prices: { price_min: { amount: onlinerPrice } } } = await onlinerAPI.getItemByKey(key);

    if (onlinerPrice !== price) {
      await item.createHistory({ price });
      await item.update({ price: onlinerPrice });
    }

    const endProcessingTime = new Date();
    await sleep(getSleepTime(MIN_DELAY, itemsCount, endProcessingTime - startProcessingTime));
  }
};

setRandomInterval(callback, MIN_DELAY, MAX_DELAY);

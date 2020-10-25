import { setRandomInterval } from 'set-random-interval';

import sleep from './utils/sleep';
import onlinerAPI from './services/onlinerAPI';
import db from './db';

const { Item } = db;

const MIN_DELAY = 30 * 60 * 1000;
const MAX_DELAY = 60 * 60 * 1000;

const getSleepTime = (wholeTime, itemsCount, processingTime) => {
  const maxSleepTime = wholeTime / itemsCount - processingTime;
  const validTime = Math.max(maxSleepTime, 0);

  return Math.floor(Math.random() * Math.floor(validTime));
};

const trackPrice = async () => {
  const items = await Item.findAll();
  const itemsCount = items.length;

  for (let i = 0; i < itemsCount; i++) {
    const startProcessingTime = new Date();
    const item = items[i];
    const { key, price } = item;

    const { prices } = await onlinerAPI.getItemByKey(key);

    if (prices) {
      const { price_min: { amount: onlinerPrice } } = prices;

      if (onlinerPrice !== price) {
        await item.createHistory({ price });
        await item.update({ price: onlinerPrice });
      }
    }

    const endProcessingTime = new Date();

    await sleep(getSleepTime(MIN_DELAY, itemsCount, endProcessingTime - startProcessingTime));
  }
};

trackPrice();

setRandomInterval(trackPrice, MIN_DELAY, MAX_DELAY);

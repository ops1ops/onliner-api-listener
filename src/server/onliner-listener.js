import sleep from './utils/sleep';
import onlinerAPI from './services/onlinerAPI';
import db from './db';

const { Item } = db;

const SLEEP_TIME = 750;
const REQUEST_TIMEOUT = 7000;
const ABORTED_CONNECTION_CODE = 'ECONNABORTED';
const MAX_TIMEOUTS_AMOUNT = 5;

const compareItemPrices = async (item) => {
  const { key, price } = item;

  try {
    const { prices } = await onlinerAPI.getItemByKey(key, REQUEST_TIMEOUT);

    if (prices) {
      const { price_min: { amount: onlinerPrice } } = prices;

      if (onlinerPrice !== price) {
        await item.createHistory({ price });
        await item.update({ price: onlinerPrice });
      }
    }
  } catch (error) {
    console.error(`Error happened with ${key}: `, error.message);

    return error.code;
  }
};

const trackPrice = async () => {
  let timeoutsAmount = 0;
  const items = await Item.findAll();
  const itemsCount = items.length;

  for (let index = 0; index < itemsCount; index++) {
    const item = items[index];

    console.log(`Checking item ${index} of ${itemsCount - 1} - ${item.key}`); // eslint-disable-line no-console

    const code = await compareItemPrices(item);

    if (code === ABORTED_CONNECTION_CODE) {
      timeoutsAmount++;
    }

    if (timeoutsAmount > MAX_TIMEOUTS_AMOUNT) {
      process.exit(2);
    }

    await sleep(SLEEP_TIME);
  }
};

trackPrice();

require('dotenv').config();
const axios = require('axios');
const { setRandomInterval } = require('set-random-interval');
const db = require('./db');

const { Item } = db;

const VIDEOCARDS_API_URL = 'https://catalog.onliner.by/sdapi/catalog.api/search/videocard';
const MIN_DELAY = 30 * 60 * 1000;
const MAX_DELAY = 60 * 60 * 1000;
const callback = async () => {
  const { data: { products } } = await axios.get(VIDEOCARDS_API_URL);

  for (let i = 0; i < products.length - 1; i++) {
    const {
      id,
      name,
      key,
      html_url: htmlUrl,
      images: { header: imageUrl },
      prices: { price_min: { amount: price } },
    } = products[i];

    const [item, isCreated] = await Item.findOrCreate({
      where: { id },
      defaults: {
        name,
        key,
        imageUrl,
        htmlUrl,
        price,
      },
    });

    if (!isCreated && item.price !== price.replace(',', '.')) {
      await item.createHistory({ price: item.price });
      await item.update({ price });
    }
  }
};

setRandomInterval(callback, MIN_DELAY, MAX_DELAY);

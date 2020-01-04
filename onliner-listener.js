require("dotenv").config();
const axios = require('axios');
const db = require('./db');

const { Item, History } = db;

const INTERVAL_TIME = 10000;
const VIDEOCARDS_API_URL = 'https://catalog.onliner.by/sdapi/catalog.api/search/videocard';

let i = 0;
setInterval(async () => {
  const { data: { products } } = await axios.get(VIDEOCARDS_API_URL);

  for (let i = 0; i < products.length - 1; i++) {
    const { id, name, html_url: htmlUrl, images: { header: imageUrl }, prices: { price_min: { amount: price } } } = products[i];

    const [videocard, isCreated] = await Item.findOrCreate({
      where: { id },
      defaults: {
        name,
        imageUrl,
        htmlUrl,
        price,
      }
    });
  
    if (!isCreated && videocard.price !== price.replace(',', '.')) {
      await videocard.createHistory({ price: videocard.price });
      await videocard.update({ price })
    }
  }

}, INTERVAL_TIME);

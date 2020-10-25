import axios from 'axios';

export default {
  searchByCategory: async (categoryKey, page) => {
    let requestURL = `https://catalog.onliner.by/sdapi/catalog.api/search/${categoryKey}`;

    if (page) {
      requestURL = `${requestURL}?page=${page}`;
    }

    const { data } = await axios.get(requestURL);

    return data;
  },
  searchByQuery: async (query) => {
    const { data } = await axios.get(`https://catalog.api.onliner.by/search/products?query=${query}`);

    return data;
  },
  getItemByKey: async (key) => {
    const { data } = await axios.get(`https://catalog.api.onliner.by/products/${key}`);

    return data;
  },
};


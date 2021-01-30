const FILTER_CATEGORY_LOCAL_STORAGE_KEY = 'categoryFilter';
const SEARCH_VALUE_LOCAL_STORAGE_KEY = 'searchHistory';

export default {
  getItem: (key) => JSON.parse(localStorage.getItem(key)),
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem('user')),
  clear: () => localStorage.clear(),
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? user.jwt : '';
  },
  getSearchValue() {
    return this.getItem(SEARCH_VALUE_LOCAL_STORAGE_KEY);
  },
  saveSearchValue(searchValue) {
    this.setItem(SEARCH_VALUE_LOCAL_STORAGE_KEY, searchValue);
  },
  getFilterCategory() {
    return this.getItem(FILTER_CATEGORY_LOCAL_STORAGE_KEY);
  },
  saveFilterCategory(category) {
    this.setItem(FILTER_CATEGORY_LOCAL_STORAGE_KEY, category);
  },
};

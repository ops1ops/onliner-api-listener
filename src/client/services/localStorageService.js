const FILTER_CATEGORY_LOCALSTORAGE_KEY = 'categoryFilter';

export default {
  saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem('user')),
  clear: () => localStorage.clear(),
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? user.jwt : '';
  },
  saveSearchValue: (searchValue) => localStorage.setItem('searchHistory', JSON.stringify(searchValue)),
  getFilterCategory: () => JSON.parse(localStorage.getItem(FILTER_CATEGORY_LOCALSTORAGE_KEY)),
  saveFilterCategory: (category) => localStorage.setItem(FILTER_CATEGORY_LOCALSTORAGE_KEY, JSON.stringify(category)),
};

export default {
  saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem('user')),
  clear: () => localStorage.clear(),
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? user.jwt : '';
  },
  saveSearchValue: (searchValue) => localStorage.setItem('searchHistory', JSON.stringify(searchValue)),
  getCategoryKeyFilter: () => JSON.parse(localStorage.getItem('categoryFilterKeyHistory')),
  getCategoryNameFilter: () => JSON.parse(localStorage.getItem('categoryFilterNameHistory')),
  saveCategoryKeyFilter: (categoryFilterValue) => localStorage
    .setItem('categoryFilterKeyHistory', JSON.stringify(categoryFilterValue)),
  saveCategoryNameFilter: (categoryFilterValue) => localStorage
    .setItem('categoryFilterNameHistory', JSON.stringify(categoryFilterValue)),
};

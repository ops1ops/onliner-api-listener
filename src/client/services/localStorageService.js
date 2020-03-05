export default {
  saveUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  getUser: () => JSON.parse(localStorage.getItem('user')),
  clear: () => localStorage.clear(),
  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));

    return user ? user.jwt : '';
  },
  saveSearchValue: (searchValue) => localStorage.setItem('searchHistory', JSON.stringify(searchValue)),
  getCategoryFilter: () => JSON.parse(localStorage.getItem('categoryFilterHistory')),
  saveCategoryFilter: (categoryFilterValue) => localStorage
    .setItem('categoryFilterHistory', JSON.stringify(categoryFilterValue)),
};

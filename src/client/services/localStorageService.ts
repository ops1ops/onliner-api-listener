import { PaginationCategoryType } from '@root/client/types/category';
import { UserType } from '@root/client/types/user';

const FILTER_CATEGORY_LOCAL_STORAGE_KEY = 'categoryFilter';
const SEARCH_VALUE_LOCAL_STORAGE_KEY = 'searchHistory';

export default {
  getItem: (key: string) => JSON.parse(localStorage.getItem(key) as string),
  setItem: (key: string, value: PaginationCategoryType | string) =>
    localStorage.setItem(key, JSON.stringify(value)),
  saveUser: (user: UserType) => localStorage.setItem('user', JSON.stringify(user)),
  getUser(): UserType {
    return this.getItem('user');
  },
  clear: () => localStorage.clear(),
  getToken() {
    const user = this.getUser();

    return user ? user.jwt : '';
  },
  getSearchValue() {
    return this.getItem(SEARCH_VALUE_LOCAL_STORAGE_KEY);
  },
  saveSearchValue(searchValue: string) {
    this.setItem(SEARCH_VALUE_LOCAL_STORAGE_KEY, searchValue);
  },
  getFilterCategory() {
    return this.getItem(FILTER_CATEGORY_LOCAL_STORAGE_KEY);
  },
  saveFilterCategory(category: PaginationCategoryType) {
    this.setItem(FILTER_CATEGORY_LOCAL_STORAGE_KEY, category);
  },
};

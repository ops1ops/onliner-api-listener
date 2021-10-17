import { UserReducerState } from '@root/client/store/reducers/userReducer';
import { PaginationCategoryType } from '@root/client/types/category';
import { UserType } from '@root/client/types/user';

const FILTER_CATEGORY_LOCAL_STORAGE_KEY = 'categoryFilter';
const SEARCH_VALUE_LOCAL_STORAGE_KEY = 'searchHistory';

export default {
  getItem: (key: string) => JSON.parse(localStorage.getItem(key) as string),
  setItem: (key: string, value: PaginationCategoryType | string): void =>
    localStorage.setItem(key, JSON.stringify(value)),
  saveUser: (user: UserType) => localStorage.setItem('user', JSON.stringify(user)),
  setAuthenticated: (isAuthenticated: UserReducerState['isAuthenticated']): void =>
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated)),
  getUser(): UserType {
    return this.getItem('user');
  },
  getAuthenticated(): UserReducerState['isAuthenticated'] {
    return this.getItem('isAuthenticated');
  },
  clear: () => localStorage.clear(),
  getToken(): string {
    const user = this.getUser();

    return user ? user.jwt : '';
  },
  getSearchValue(): string {
    return this.getItem(SEARCH_VALUE_LOCAL_STORAGE_KEY);
  },
  saveSearchValue(searchValue: string): void {
    this.setItem(SEARCH_VALUE_LOCAL_STORAGE_KEY, searchValue);
  },
  getFilterCategory(): PaginationCategoryType {
    return this.getItem(FILTER_CATEGORY_LOCAL_STORAGE_KEY);
  },
  saveFilterCategory(category: PaginationCategoryType): void {
    this.setItem(FILTER_CATEGORY_LOCAL_STORAGE_KEY, category);
  },
};

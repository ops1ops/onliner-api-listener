import localStorageService from '../services/localStorageService';

export default (state, { type, payload: user }) => {
  switch (type) {
    case 'LOGIN':
      localStorageService.saveUser(user);

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    case 'LOGOUT':
      localStorageService.clear();

      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    default:

      return state;
  }
};

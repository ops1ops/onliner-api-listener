import { Reducer } from 'react';

import { UserActions } from '@root/client/enums';
import { UserActionsType } from '@root/client/store/actions/actionsTypes';
import { UserType } from '@root/client/types/user';

import localStorageService from '../../services/localStorageService';

export type UserReducerState = {
  isAuthenticated: boolean;
  user: UserType | null;
};

const userReducer: Reducer<UserReducerState, UserActionsType> = (state, action) => {
  switch (action.type) {
    case UserActions.LOGIN:
      const { payload } = action;

      localStorageService.saveUser(payload);

      return {
        ...state,
        isAuthenticated: true,
        payload,
      };
    case UserActions.LOGOUT:
      localStorageService.clear();

      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default userReducer;

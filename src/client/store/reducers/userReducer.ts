import { Reducer } from 'react';

import { UserActions } from '@root/client/enums';
import localStorageService from '@root/client/services/localStorageService';
import { UserActionsType } from '@root/client/store/actions/actionsTypes';
import { UserType } from '@root/client/types/user';

export type UserReducerState = {
  isAuthenticated: boolean;
  user: UserType | null;
};

const userReducer: Reducer<UserReducerState, UserActionsType> = (state, action) => {
  switch (action.type) {
    case UserActions.REGISTER:
    case UserActions.LOGIN: {
      const { payload } = action;

      localStorageService.saveUser(payload);
      localStorageService.setAuthenticated(true);

      return {
        ...state,
        isAuthenticated: true,
        user: payload,
      };
    }

    case UserActions.LOGOUT: {
      localStorageService.clear();

      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;

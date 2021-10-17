import { createContext, Dispatch } from 'react';

import { UserActionsType } from '@root/client/store/actions/actionsTypes';
import { UserReducerState } from '@root/client/store/reducers/userReducer';

type ContextType = {
  state: UserReducerState;
  dispatch: Dispatch<UserActionsType>;
};

export default createContext<ContextType>({
  state: {
    isAuthenticated: false,
    user: {
      id: 0,
      name: '',
      jwt: '',
    },
  },
  dispatch: () => undefined,
});

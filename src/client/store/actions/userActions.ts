import { UserActions } from "@root/client/enums";
import {
  LoginUserAction,
  LoginUserPayload,
  LogoutUserAction,
} from "@root/client/store/actions/actionsTypes";

export const loginUserAction = (payload: LoginUserPayload): LoginUserAction => ({
  type: UserActions.LOGIN,
  payload,
});

export const logoutUserAction = (): LogoutUserAction => ({
  type: UserActions.LOGOUT,
  payload: null,
});

import { UserActions } from "@root/client/enums";
import { UserType } from "@root/client/types/user";

export type LoginUserPayload = UserType;

export type LoginUserAction = {
  type: UserActions.LOGIN;
  payload: LoginUserPayload;
};

export type LogoutUserAction = {
  type: UserActions.LOGOUT;
  payload: null;
};

export type UserActionsType = LoginUserAction | LogoutUserAction;
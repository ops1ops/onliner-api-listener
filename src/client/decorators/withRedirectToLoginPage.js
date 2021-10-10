import { createBrowserHistory } from 'history';

import { LOGIN_PATH } from '../constants/paths';

const history = createBrowserHistory();

const UNAUTHORIZED_STATUS = 401;

const withRedirectToLoginPage = (callback) => async (...data) => {
  try {
    return await callback(...data);
  } catch (error) {
    if (error?.response.status === UNAUTHORIZED_STATUS) {
      history.push(LOGIN_PATH);
    }
  }
};

export default withRedirectToLoginPage;

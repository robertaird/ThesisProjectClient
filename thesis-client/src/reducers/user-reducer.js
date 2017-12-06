import { LOGIN, LOGOUT } from '../constants';

const userAction = (user = null, action) => {
  switch (action.type) {
    case LOGIN:
      return action.user;
    case LOGOUT:
      return null;
    default:
      return user;
  }
};

export default userAction;

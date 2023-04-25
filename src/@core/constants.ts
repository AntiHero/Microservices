export const USER_ENTITY = 'users';

export const API = {
  get ROOT() {
    return '/api';
  },
  get AUTH() {
    return `${API.ROOT}/auth`;
  },
  get AUTH_REGISTRATION() {
    return `/registration`;
  },
  get AUTH_LOGIN() {
    return `/login`;
  },
};

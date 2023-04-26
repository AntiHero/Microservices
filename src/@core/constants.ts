export const USER_ENTITY = 'users';

export const DEVICE_SESSION_ENTITY = 'device_sessions';

export const REFRESH_TOKEN = 'refreshToken';

export const USER_AGENT = 'user-agent';

export const DEVICE_SESSION = 'deviceSession';
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

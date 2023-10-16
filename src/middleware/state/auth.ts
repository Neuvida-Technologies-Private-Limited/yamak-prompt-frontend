import { atom } from 'recoil';

export const loginState = atom({
  key: 'login-state',
  default: {
    isLoading: false,
    isFormInvalid: false,
    username: '',
    usernameError: '',
    password: '',
    passwordError: '',
  },
});
export const currentUserState = atom({
  key: 'currentUser-state',
  default: {
    email: '',
    first_name: '',
    last_name: '',
  },
});

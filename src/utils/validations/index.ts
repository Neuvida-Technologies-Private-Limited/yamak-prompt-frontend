export const isInputValidated = (input: string, errorMessage: string) => {
  return input === '' ? errorMessage : '';
};

export const isUsernameValidated = (username: string) => {
  if (username === '') {
    return 'Username is required!';
  } else {
    return '';
  }
};
export const isPasswordValidated = (password: string) => {
  if (password === '') {
    return 'Password is required!';
  } else {
    return '';
  }
};
export const isLoginFormValidated = (username: string, password: string) => {
  if (
    isUsernameValidated(username) === '' &&
    isPasswordValidated(password) === ''
  ) {
    return true;
  } else {
    return false;
  }
};
export const isKeyTitleValidated = (title: string) => {
  if (title === '') {
    return 'Title is required!';
  } else {
    return '';
  }
};
export const isKeyDescriptionValidated = (description: string) => {
  if (description === '') {
    return 'Description is required!';
  } else {
    return '';
  }
};
export const isKeyValidated = (key: string) => {
  if (key === '') {
    return 'Valid key is required!';
  } else {
    return '';
  }
};
export const isLLMProviderValidated = (provider: string) => {
  if (provider === '') {
    return 'LLM Provider is required!';
  } else {
    return '';
  }
};
export const IsCreateKeyFormValidated = (
  title: string,
  description: string,
  key: string,
  provider: string
) => {
  if (
    isKeyDescriptionValidated(description) === '' &&
    isKeyTitleValidated(title) === '' &&
    isKeyValidated(key) === '' &&
    isLLMProviderValidated(provider) === ''
  ) {
    return true;
  } else {
    return false;
  }
};
export const IsCreateWorkspaceFormValidated = (
  title: string,
  model_key: string
) => {
  if (
    isKeyDescriptionValidated(model_key) === '' &&
    isKeyTitleValidated(title) === ''
  ) {
    return true;
  } else {
    return false;
  }
};
export const isWorkspaceTitleValidated = (title: string) => {
  if (title === '') {
    return 'Title of workspace is required!';
  } else {
    return '';
  }
};
export const isWorkspaceModalKeyValidated = (model_key: string) => {
  if (model_key === '') {
    return 'Model key is required!';
  } else {
    return '';
  }
};

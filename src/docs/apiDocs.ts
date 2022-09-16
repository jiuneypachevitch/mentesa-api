import { components, header } from './config';
import { resources } from './resources';
//import { components, header } from './config';
//import { refreshToken } from './refreshToken';
//import { sessions } from './sessions';
//import { users } from './users';

export const apiDocs = {
  ...header,
  paths: {
    ...resources
  },
  components,
};


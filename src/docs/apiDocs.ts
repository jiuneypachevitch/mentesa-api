import { components, header } from './config';
import { resources } from './resources';
//import { components, header } from './config';
//import { refreshToken } from './refreshToken';
//import { sessions } from './sessions';
//import { users } from './users';

console.log('resources', resources);

export const apiDocs = {
  ...header,
  paths: {
    ...resources
  },
  components,
};


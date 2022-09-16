import { components, header } from './config';
import { resources } from './resources';

export const apiDocs = {
  ...header,
  paths: {
    ...resources,
  },
  components,
};

import { create } from './create';
import { update } from './update';
import { listAll } from './listAll';
import { remove } from './remove';
import { getOne } from './getOne';
import { auth } from './auth';
import { users } from './users';
import { professionals } from './professionals';

export const resources = {
  ...listAll,
  ...getOne,
  ...create,
  ...update,
  ...remove,
  ...auth,
  ...users,
  ...professionals,
};

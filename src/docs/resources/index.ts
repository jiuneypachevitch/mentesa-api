import { create } from './create';
import { update } from './update';
import { listAll } from './listAll';
import { remove } from './remove';
import { getOne } from './getOne';

export const resources = { ...listAll, ...getOne, ...create, ...update, ...remove };


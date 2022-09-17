import { Request } from 'express';
import { Patient, Professional, User } from '@prisma/client';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  refresh_token: string;
}

export interface LoginData {
  id: number;
  name: string;
  email: string;
}

export interface RequestWithUser extends Request {
  user: User;
  professional: Professional;
  patient: Patient;
}

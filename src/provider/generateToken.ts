import { JWT_ACCESS_EXPIRATION_MINUTES, JWT_SECRET } from '@/config';
import { sign } from 'jsonwebtoken';

class GenerateToken {
  async execute(userId: number) {
    const expiresIn: number = Number(JWT_ACCESS_EXPIRATION_MINUTES) * 60;

    return {
      token: sign({ id: userId }, JWT_SECRET, { expiresIn }),
    };
  }
}

export { GenerateToken };

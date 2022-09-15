import { JWT_ACCESS_EXPIRATION_MINUTES } from '@/config';
import { client } from '@/prisma/client';

class GenerateRefreshToken {
  async execute(userId: number) {
    const expiresIn: number = Number(JWT_ACCESS_EXPIRATION_MINUTES) * 90;

    const findRefreshToken = await client.refreshToken.findUnique({
      where: {
        userId,
      },
    });

    if (findRefreshToken) {
      await client.refreshToken.delete({ where: { userId } });
    }

    const generateRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };

import jwt from 'jsonwebtoken';
import tokenModel from '@src/models/token-model';
import { ITokens } from '@src/interfaces';

class TokenService {
  static generateTokens(payload: any): ITokens {
    const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, { expiresIn: '15m' });
    const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  static async saveToken(userId: string, refreshToken: string): Promise<ITokens> {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token: ITokens = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

export default TokenService;

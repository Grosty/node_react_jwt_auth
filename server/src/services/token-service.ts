import jwt from 'jsonwebtoken';
import tokenModel from '@src/models/token-model';
import config from '@src/config';
import { ITokens, IUserDto } from '@src/interfaces';

class TokenService {
  static generateTokens(payload: IUserDto): ITokens {
    const accessToken: string = jwt.sign(payload, config.jwt_secrets.access, { expiresIn: '15m' });
    const refreshToken: string = jwt.sign(payload, config.jwt_secrets.refresh, { expiresIn: '30d' });
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

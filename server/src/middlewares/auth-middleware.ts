import { Request, Response, NextFunction } from 'express';
import ApiError from '@src/exceptions/api-error';
import TokenService from '@src/services/token-service';

interface IRequestWithUser extends Request {
  user: any;
}

function authMiddleware(req: IRequestWithUser, res: Response, next: NextFunction): void {
  try {
    const authorizationHeader: string | undefined = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return next(ApiError.UnauthorizedError());
    }

    const [, accessToken] = authorizationHeader.split(' ');
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    return next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
}

export default authMiddleware;

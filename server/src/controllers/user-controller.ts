import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import UserService from '@src/services/user-service';
import { IUserData } from '@src/interfaces';
import ApiError from '@src/exceptions/api-error';
import config from '@src/config';

interface IAuth {
  email: string;
  password: string;
}

class UserController {
  static async registration(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { email, password }: IAuth = req.body;
      const userData: IUserData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email, password }: IAuth = req.body;
      const userData = await UserService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      return next(e);
    }
  }

  static async activate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const activationLink: string = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(config.client.url);
    } catch (e) {
      return next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      res.json(['loh', 'dstr']);
    } catch (e) {
      return next(e);
    }
  }
}

export default UserController;

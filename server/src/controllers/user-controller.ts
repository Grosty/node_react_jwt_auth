import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import UserService from '@src/services/user-service';
import { IUserData } from '@src/interfaces';
import ApiError from '@src/exceptions/api-error';
import config from '@src/config';

class UserController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Ошибка при валидации', errors.array()));
      }
      const { email, password } = req.body;
      const userData: IUserData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      return next(e);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      return next(e);
    }
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      return next(e);
    }
  }

  static async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink: string = req.params.link;
      await UserService.activate(activationLink);
      return res.redirect(config.client.url);
    } catch (e) {
      return next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      return next(e);
    }
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['loh', 'dstr']);
    } catch (e) {
      return next(e);
    }
  }
}

export default UserController;

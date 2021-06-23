import { Request, Response, NextFunction } from 'express';
import UserService from '@src/services/user-service';
import { IUserData } from '@src/interfaces';

class UserController {
  static async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData: IUserData = await UserService.registration(email, password);
      res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
      return res.json(userData);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e.message);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  static async logout(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  static async activate(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {}
  }

  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      res.json(['loh', 'dstr']);
    } catch (e) {}
  }
}

export default UserController;

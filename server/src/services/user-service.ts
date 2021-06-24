import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import UserModel from '@src/models/user-model';
import mailService from '@src/services/mail-service';
import TokenService from '@src/services/token-service';
import UserDto from '@src/dtos/user-dto';
import config from '@src/config';
import { ITokens, IUserDto, IUserData } from '@src/interfaces';
import ApiError from '@src/exceptions/api-error';

class UserService {
  static async registration(email: string, password: string): Promise<IUserData> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, `${config.app.api_uri}/api/activate/${activationLink}`);

    const userDto: IUserDto = new UserDto(user);
    const tokens: ITokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  static async login(email: string, password: string): Promise<IUserData> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals: boolean = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto: IUserDto = new UserDto(user);
    const tokens: ITokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async logout(refreshToken: string) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  static async activate(activationLink: string): Promise<never | void> {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Некорректная ссылка активации');
    }
    user.isActivated = true;
    await user.save();
  }

  static async refresh(refreshToken: string): Promise<any> {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await TokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto: IUserDto = new UserDto(user);
    const tokens: ITokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  static async getAllUsers(): Promise<any[]> {
    const users = await UserModel.find();
    return users;
  }
}

export default UserService;

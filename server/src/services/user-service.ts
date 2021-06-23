import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import UserModel from '@src/models/user-model';
import mailService from '@src/services/mail-service';
import TokenService from '@src/services/token-service';
import UserDto from '@src/dtos/user-dto';
import { ITokens, IUserDto, IUserData } from '@src/interfaces';

class UserService {
  static async registration(email: string, password: string): Promise<IUserData> {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();
    const user = await UserModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto: IUserDto = new UserDto(user);
    const tokens: ITokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
}

export default UserService;

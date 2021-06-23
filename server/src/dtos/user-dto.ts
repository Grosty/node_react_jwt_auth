import { IUserDto } from '@src/interfaces';

export default class UserDto implements IUserDto {
  public email: string;

  public id: string;

  public isActivated: boolean;

  constructor(model: any) {
    const { email, _id: id, isActivated } = model;
    this.email = email;
    this.id = id;
    this.isActivated = isActivated;
  }
}

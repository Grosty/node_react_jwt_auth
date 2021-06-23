export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IUserDto {
  email: string;
  id: string;
  isActivated: boolean;
}

export interface IUserData extends ITokens {
  user: IUserDto;
}

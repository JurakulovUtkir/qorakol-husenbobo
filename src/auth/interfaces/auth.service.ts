import { UserEntity } from 'src/users/entities/user.entity';

export interface ILoginData {
    user: UserEntity;
    token: string;
}

export interface IRegisterData {
    user: UserEntity;
    token: string;
}

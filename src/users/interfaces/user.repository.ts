import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
    findOneById(id: string): Promise<UserEntity | undefined>;
    findOneByPhone(phone: string): Promise<UserEntity | undefined>;
    insert(dto: UserEntity): Promise<UserEntity>;
}

import { UserQueryDto } from '../dto/query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
    findOneById(id: string): Promise<UserEntity | undefined>;
    findOneByPhone(phone: string): Promise<UserEntity | undefined>;
    insert(dto: UserEntity): Promise<UserEntity>;
    update(id: string, dto: UpdateUserDto): Promise<UserEntity | undefined>;
    find(dto: UserQueryDto): Promise<UserEntity[]>;
    remove(id: string): Promise<UserEntity | undefined>;
}

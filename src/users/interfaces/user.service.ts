import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { ResData } from 'src/common/utils/resData';
import { UserQueryDto } from '../dto/query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export interface IUserService {
    findOneById(id: string): Promise<ResData<UserEntity | undefined>>;
    findOneByPhone(login: string): Promise<ResData<UserEntity | undefined>>;
    create(dto: CreateUserDto): Promise<ResData<UserEntity>>;
    find(dto: UserQueryDto): Promise<ResData<UserEntity[]>>;
    update(id: string, dto: UpdateUserDto): Promise<ResData<UserEntity>>;
    delete(id: string): Promise<ResData<UserEntity>>;
}

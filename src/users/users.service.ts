import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserNotFoundException } from './exception/user.exception';
import { ResData } from 'src/common/utils/resData';
import { UsersRepository } from './users.repository';
import { IUserService } from './interfaces/user.service';
import { UserQueryDto } from './dto/query.dto';

@Injectable()
export class UsersService implements IUserService {
    constructor(private readonly repository: UsersRepository) {}
    async find(dto: UserQueryDto): Promise<ResData<UserEntity[]>> {
        const foundData = await this.repository.find(dto);

        return new ResData('get all', 200, foundData);
    }

    async findOneById(id: string): Promise<ResData<UserEntity | undefined>> {
        const foundData = await this.repository.findOneById(id);

        if (!foundData) {
            throw new UserNotFoundException();
        }

        return new ResData('get by id', 200, foundData);
    }

    async findOneByPhone(phone: string) {
        const foundData = await this.repository.findOneByPhone(phone);

        const resData = new ResData('success', 200, foundData);

        if (!foundData) {
            resData.message = 'Not Found';
            resData.statusCode = 404;
        }

        return resData;
    }

    async create(dto: CreateUserDto): Promise<ResData<UserEntity>> {
        const newUser = new UserEntity();

        const newData = Object.assign(newUser, dto);

        const newUserEntity = await this.repository.insert(newData);

        return new ResData('success', 200, newUserEntity);
    }
}

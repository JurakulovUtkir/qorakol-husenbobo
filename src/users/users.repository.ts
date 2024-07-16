import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';

export class UsersRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
    ) {}
    async update(id: string, dto: UpdateUserDto): Promise<UserEntity> {
        await this.repository.update(id, dto);
        return await this.findOneById(id);
    }
    async findOneById(id: string): Promise<UserEntity | undefined> {
        return await this.repository.findOneBy({ id });
    }

    async findOneByPhone(phone: string): Promise<UserEntity | undefined> {
        return await this.repository.findOneBy({ phone });
    }

    async insert(entity: UserEntity): Promise<UserEntity> {
        const newUser = this.repository.create(entity);

        await this.repository.save(newUser);

        return newUser;
    }
}

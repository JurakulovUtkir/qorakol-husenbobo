import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IUserRepository } from './interfaces/user.repository';

export class UsersRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>,
    ) {}
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

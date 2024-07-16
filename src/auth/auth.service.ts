import { HttpStatus, Injectable } from '@nestjs/common';
import { ILoginData, IRegisterData } from './interfaces/auth.service';
import {
    LoginOrPasswordWrongException,
    LoginUserSuchException,
} from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { ResData } from 'src/common/utils/resData';
import { compar, hashed } from 'src/common/utils/bcrypt';
import { CompanyService } from 'src/companies/companies.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: CompanyService,
        private readonly jwtService: JwtService,
    ) {}

    async register(entity: RegisterDto): Promise<ResData<IRegisterData>> {
        const { data: foundUser } = await this.userService.findOneByPhone(
            entity.phone,
        );

        if (foundUser) {
            throw new LoginUserSuchException();
        }

        entity.password = await hashed(entity.password);

        const { data: newUser } = await this.userService.create(entity);

        const token = await this.jwtService.signAsync(
            { id: newUser.id },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
        );

        return new ResData<ILoginData>('success', HttpStatus.OK, {
            user: newUser,
            token,
        });
    }

    async login(dto: LoginDto): Promise<ResData<ILoginData>> {
        const { data: foundUser } = await this.userService.findOneByPhone(
            dto.phone,
        );

        if (!foundUser) {
            throw new LoginOrPasswordWrongException();
        }

        const checkPasswor = await compar(dto.password, foundUser.password);

        if (!checkPasswor) {
            throw new LoginOrPasswordWrongException();
        }

        const token = await this.jwtService.signAsync(
            { id: foundUser.id },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: process.env.JWT_EXPIRES_IN,
            },
        );

        return new ResData<ILoginData>('success', HttpStatus.OK, {
            user: foundUser,
            token,
        });
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

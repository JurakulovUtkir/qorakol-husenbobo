import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { Public } from './decorators/is-public.decorator';
import { YuridikDTOData } from './dto/yuridik.dto';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('yuridik')
    async getYuridik(@Body() data: YuridikDTOData) {
        return await this.authService.get_data_in_excel(data);
    }
}

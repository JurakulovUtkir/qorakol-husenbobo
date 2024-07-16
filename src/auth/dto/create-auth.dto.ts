import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { RoleEnum } from 'src/common/types/enums';

export class RegisterDto {
    @ApiProperty({
        type: String,
        example: '+998991853703',
    })
    @IsString()
    @Length(13, 13)
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: String,
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        enum: RoleEnum,
        example: RoleEnum.USER,
    })
    @IsEnum(RoleEnum)
    @IsNotEmpty()
    role: RoleEnum;
}

export class LoginDto {
    @ApiProperty({
        type: String,
        example: '+998991853703',
    })
    @IsString()
    @Length(13, 13)
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        type: String,
        example: '123456',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}

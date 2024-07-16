import { IsEnum, IsOptional } from 'class-validator';
import { UserType } from 'src/common/types/enums';

export class UserQueryDto {
    @IsOptional()
    @IsEnum(UserType)
    user_type: UserType;
}

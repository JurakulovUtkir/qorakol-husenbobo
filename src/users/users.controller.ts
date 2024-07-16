import {
    Body,
    Controller,
    Get,
    Post,
    // Get,
    // Post,
    // Body,
    // Patch,
    // Param,
    // Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserQueryDto } from './dto/query.dto';
import { Public } from 'src/auth/decorators/is-public.decorator';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('Users(pupils and teachers)')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Public()
    @Get()
    findAll(@Body() dto: UserQueryDto) {
        return this.usersService.find(dto);
    }

    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.usersService.update(+id, updateUserDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.usersService.remove(+id);
    // }
}

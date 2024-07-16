import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth-guard';
import { JwtStrategy } from './strategy/jwt.strategy';

import * as dotenv from 'dotenv';
import { Company } from 'src/companies/entities/company.entity';
import { CompanyService } from 'src/companies/companies.service';
import { CompanyRepository } from 'src/companies/repositories/companies.repository';
dotenv.config();

@Module({
    imports: [
        TypeOrmModule.forFeature([Company]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        CompanyRepository,
        CompanyService,
        JwtService,
        JwtStrategy,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
    ],
    exports: [JwtService],
})
export class AuthModule {}

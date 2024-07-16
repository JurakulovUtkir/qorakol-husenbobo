import { HttpStatus, Injectable } from '@nestjs/common';
import { ILoginData, IRegisterData } from './interfaces/auth.service';
import {
    LoginOrPasswordWrongException,
    LoginUserSuchException,
} from './exception/auth.exception';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './dto/create-auth.dto';
import { ResData } from 'src/common/utils/resData';
import { compar, hashed } from 'src/common/utils/bcrypt';
import { YuridikDTO, YuridikDTOData } from './dto/yuridik.dto';
import puppeteer from 'puppeteer';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
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

    async get_data_in_excel(dto: YuridikDTOData): Promise<string> {
        try {
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
            const page = await browser.newPage();
            const token = 'Bearer ' + dto.token;

            // Set up request interception to add the Authorization header
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                const headers = req.headers();
                headers['Authorization'] = token;
                req.continue({ headers });
            });

            // Navigate to a page to ensure the browser context is fully loaded
            await page.goto(
                'https://bank.birdarcha.uz/bank-application/legal-entity',
                {
                    waitUntil: 'networkidle0',
                },
            );

            // Assume that the API requires you to make a POST request with certain data.
            const response = await page.evaluate(async (token) => {
                const result = await fetch(
                    'https://api.birdarcha.uz/v1/application/bank-cabinet/legal-entity/view',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: token,
                        },
                        body: JSON.stringify({
                            per_page: 400,
                            page: 0,
                            search: [],
                        }),
                    },
                );
                return await result.json();
            }, token);
            await browser.close();

            const needed_data = await this.make_needed_data(response['data']);
            // const dataArray = this.transformDataToArrays(needed_data);

            const creds = {
                type: 'service_account',
                project_id: 'potent-comfort-424211-v4',
                private_key_id: 'e1b07ab61a9dc173a0b4cb2ae4d13a14923b049a',
                private_key:
                    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC3ZjXkTsTx+n+U\n2uTOocVSLhY/rYCdA4v+qZxzDwM+VIrQ4aS7mWe/esKJLTN6jzQ2lItWsFKuMQhv\nHVWX0kv1ArmaTVNZWpFUHA3uYPpFPJeGq2oO1takUs7P/Gu8t8Hci4//kzHgJ/Kv\nwQsUkJJ+RydLeMk7RpMJDLduZ1HuNy5dTBvwpjmB/SA1n9E0Pd86KEYb+dLnGjQR\nQKEbCJEhxeE69aVJ6a15ny4bvkSTKO0gFqjDpMx7pzDt5kCkSpdhfxeCV324aq1v\n9x8wKb1IUXhk3U1Fm2pk+Y8uADz3Vr6AKIOuUH72iuHuA2cPbcxyYmJujNz/dRPt\nKvMGL+dLAgMBAAECggEAMC0NyBD3BDeQzwnnI+5z1oAbwRNzHwvA+R8V5VWSvQtZ\nQcCcVNlZ2v9E3eL9TFsU1KeVqKp9tZtUw1d51f1cjZpvJfzdAbJcTbNm53EbHRfr\nF+msXQSLcrP79r+wj2zX5HbW10STy/XCdu+nWPoXOUu4o0cx2TvTQQPRpZNHfuMX\nChZeQOvP6HGYtKoryfXdZ79GiKq5VMcbjspESYPUQR1eLY5Bn+KIcOeTriNRIGj9\nyYgn4rq7Z2NeIq443LscLviEbAgJpwQMRNKN5yAg7h+5qw7tMqPhcNzCE5UyVDhv\nMybi6usffu3fAhq8Yx39dh4JsFAt1EV+L9yZptHodQKBgQDfp9hTnsei9LW8a+SJ\niKtW5MzGQdsP9jDd0nt46OuLm66ICPkOgXNabngLLFj5CRNTwfSPRreC06exoKJ1\nWtKS25tVmRH6aHSSzmr35BjbtZ0nN7E9SjmT9b3UjW2bpIbwflI2bJGQ8g2K1muO\ngJCl8/mAZs9gPJOXlOMnMeVi9QKBgQDR6/977Tnm3r7wAPoEvo87vBgBnH5kfgCB\n3mm/fVkX+ovaX/d4jpl1RqYVR+8BU1/s6o/Z53p6u+P26v8Vy6EPn1wLindmbvK3\nf/7HLDaXaTimsuoUOfheYf7q8XpmebVlbixt/UKMWTcZ5rIm0p9Pm87u8oPH7IzS\nedTAdGQ5PwKBgQC8KtjEMZhAr6WfKx8R31xYNRNb0dhea4Ddf9LF/SD/SjHi3bm8\nzIiiksKIk/0fONV76Hi7eoG2niA+P6mvFoSHbiAYOjp39R3uzaANg2iuoPPhJOgH\nasVaiKv3gi2vfxLQj1bX1yv5SMy//HptYBlSphtKPjVHAHAkXe1m8oHNaQKBgQDK\nq4eg9Rrm6/z6KGc6N2SALowa2iUpDoGc4MfF6dYfkXR+pBJ/4WUFVe05NJbq97zw\nNlIl9hdI8agZFy6ps0xPkfLC7a9zRQCu6zNmxif6rMrWHnxihMlnDkOYPwWGdFEO\nmXzpwA8FA4lwR0uOseC/clUqWxeh6J7ZAmjGWlj87wKBgQCbHhq6EgXAo9UlNvYM\n1mSkTKWo/cA1FhKCJrwspZNYiHPrzZMfCi3+TuZv6wVoVM0hRDG+Tf74yTPk75t/\nuOEtnmR8Cw6bQqAKfgaUMb0ch9N9lMWdlhc1QkF9pNb7RGdlQ+daZ82akIvoasMK\nkZ+SembfvU6cb5ad6V8kbanB5A==\n-----END PRIVATE KEY-----\n',
                client_email:
                    'googleapisutkir@potent-comfort-424211-v4.iam.gserviceaccount.com',
                client_id: '106298548747061995259',
                auth_uri: 'https://accounts.google.com/o/oauth2/auth',
                token_uri: 'https://oauth2.googleapis.com/token',
                auth_provider_x509_cert_url:
                    'https://www.googleapis.com/oauth2/v1/certs',
                client_x509_cert_url:
                    'https://www.googleapis.com/robot/v1/metadata/x509/googleapisutkir%40potent-comfort-424211-v4.iam.gserviceaccount.com',
                universe_domain: 'googleapis.com',
            };

            const SCOPES = [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file',
            ];

            const jwt = new JWT({
                email: creds.client_email,
                key: creds.private_key,
                scopes: SCOPES,
            });

            // Initialize the Google Spreadsheet
            const doc = new GoogleSpreadsheet(
                '1hJpG7PEvcQA8ZGSC2YM8JzIWQqjvtlJIA2gZHvHbyV4',
                jwt,
            );

            // Load the document properties and worksheets
            await doc.loadInfo();

            // Get today's date as a string
            const today = this.formatDate(new Date());

            // Add a new sheet with today's date as the sheet name
            const sheet = await doc.addSheet({
                title: today,
                headerValues: [
                    'created_at',
                    'name',
                    'tin',
                    'region_name',
                    'sub_region_name',
                    'business_type_name',
                    'phone',
                    'email',
                    'applicant_full_name',
                    'okpo',
                    'oked',
                ],
            });

            // Write data to the new sheet
            await sheet.addRows(needed_data);

            console.log('Data is successfully written to Google Sheets');

            return `https://docs.google.com/spreadsheets/d/${doc.spreadsheetId}/edit?usp=sharing`;
        } catch (error) {
            return error.message.toString();
        }
    }

    private transformDataToArrays(data: any[]): any[][] {
        const keys = Object.keys(data[0]);
        const dataArray: any[][] = [];

        // Add header row
        dataArray.push(keys);

        // Add data rows
        for (const item of data) {
            const row = keys.map((key) => item[key]);
            dataArray.push(row);
        }

        return dataArray;
    }

    private make_needed_data(data: YuridikDTO[]) {
        const needed_data = [];

        for (const one of data) {
            needed_data.push({
                created_at: one.created_at,
                name: one.name,
                tin: one.tin,
                region_name: one.registration_region.name,
                sub_region_name: one.registration_sub_region.name,
                business_type_name: one.business_type.name,
                phone: one.phone,
                email: one.email,
                applicant_full_name: one.applicant_full_name,
                okpo: one.okpo,
                oked: one.oked.id + '-' + one.oked.name,
            });
        }

        return needed_data;
    }

    private formatDate(date: Date): string {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
}

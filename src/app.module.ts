import { Module } from '@nestjs/common';
import { CoreModules } from './common/modules/core.module';
import { MediaFilesModule } from './media-files/media-files.module';
import { CategoriesModule } from './categories/categories.module';
import { NewsModule } from './news/news.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        AuthModule,
        CoreModules,
        MediaFilesModule,
        CategoriesModule,
        NewsModule,
        UsersModule,
    ],
})
export class AppModule {}

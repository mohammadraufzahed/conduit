import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ArticleModule } from './modules/article/article.module';

@Module({
  imports: [UsersModule, AuthModule, ArticleModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}

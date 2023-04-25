import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { databaseConfig } from './@core/config/config';
import { typeormFactory } from './@core/config/database.config';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormFactory,
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

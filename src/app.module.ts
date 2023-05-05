import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { jwtConfig } from './@core/config/jwt.config';
import { databaseConfig } from './@core/config/config';
import { typeormFactory } from './@core/config/database.config';
import { DeviceSessionsModule } from './device-sessions/device-sessions.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      load: [databaseConfig, jwtConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeormFactory,
      inject: [ConfigService],
    }),
    UsersModule,
    DeviceSessionsModule,
    ChatModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

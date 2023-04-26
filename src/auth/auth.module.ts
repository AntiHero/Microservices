import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { jwtConfig } from 'src/@core/config/jwt.config';
import { BcryptService } from './services/bcryt.service';
import { HashingService } from './services/hashing.service';
import { LoginCommadHandler } from './commands/login.handler';
import { TokensService } from 'src/@core/services/tokens.service';
import { RegistrationCommadHandler } from './commands/registration.handler';
import { DeviceSessionsModule } from 'src/device-sessions/device-sessions.module';

const commandHandlers = [LoginCommadHandler, RegistrationCommadHandler];

@Module({
  imports: [
    UsersModule,
    CqrsModule,
    DeviceSessionsModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    TokensService,
    JwtStrategy,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    ...commandHandlers,
  ],
})
export class AuthModule {}

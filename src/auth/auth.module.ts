import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { BcryptService } from './services/bcryt.service';
import { HashingService } from './services/hashing.service';
import { LoginCommadHandler } from './commands/login.handler';
import { RegistrationCommadHandler } from './commands/registration.handler';

const commandHandlers = [LoginCommadHandler, RegistrationCommadHandler];

@Module({
  imports: [UsersModule, CqrsModule],
  controllers: [AuthController],
  providers: [
    ...commandHandlers,
    { provide: HashingService, useClass: BcryptService },
  ],
})
export class AuthModule {}

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { API } from 'src/@core/constants';
import { LoginDto } from './dto/login.dto';
import { LoginCommand } from './commands/login.handler';
import { RegistrationDto } from './dto/registration.dto';
import { RegistrationCommand } from './commands/registration.handler';

@Controller(API.AUTH)
export class AuthController {
  public constructor(private readonly commandBus: CommandBus) {}

  @Post(API.AUTH_REGISTRATION)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async registraton(@Body() registrationDto: RegistrationDto) {
    return this.commandBus.execute<RegistrationCommand>(
      new RegistrationCommand(registrationDto),
    );
  }

  @Post(API.AUTH_LOGIN)
  @HttpCode(HttpStatus.OK)
  public async login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute<LoginCommand>(new LoginCommand(loginDto));
  }
}

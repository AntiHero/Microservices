import type { CookieSerializeOptions } from '@fastify/cookie';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { CommandBus } from '@nestjs/cqrs';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { LoginDto } from './dto/login.dto';
import { LoginCommand } from './commands/login.handler';
import { API, REFRESH_TOKEN } from 'src/@core/constants';
import { RegistrationDto } from './dto/registration.dto';
import { UserAgent } from 'src/@core/decorators/user-agent.decorator';
import { RegistrationCommand } from './commands/registration.handler';
import { DeviceSessionGuard } from 'src/@core/guards/device-session-jwt.guard';
import { ActiveDeviceSessionId } from 'src/@core/decorators/acitve-device.decorator';
import { DeviceSessionInterceptor } from 'src/@core/interceptors/device-session.interceptor';

@Controller(API.AUTH)
export class AuthController {
  public constructor(private readonly commandBus: CommandBus) {}

  private readonly cookieOptions: Partial<CookieSerializeOptions> = {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
  };

  @Post(API.AUTH_REGISTRATION)
  @HttpCode(HttpStatus.NO_CONTENT)
  public async registraton(@Body() registrationDto: RegistrationDto) {
    return this.commandBus.execute<RegistrationCommand>(
      new RegistrationCommand(registrationDto),
    );
  }

  @Post(API.AUTH_LOGIN)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(DeviceSessionInterceptor)
  public async login(
    @Body() loginDto: LoginDto,
    @UserAgent() userAgent: string,
    @ActiveDeviceSessionId() activeDeviceSessionId: string,
    @Res() response: FastifyReply,
  ) {
    const { email, password } = loginDto;

    const [accessToken, refreshToken] = await this.commandBus.execute<
      LoginCommand,
      [string, string]
    >(
      new LoginCommand({
        email,
        password,
        deviceId: activeDeviceSessionId,
        userAgent,
      })
    );

    response.cookie(REFRESH_TOKEN, refreshToken, this.cookieOptions);

    return response.send({ accessToken });
  }

  @Get('me')
  @UseGuards(DeviceSessionGuard)
  public async me(@Req() req: FastifyRequest) {
    console.log(req.user);
  }
}

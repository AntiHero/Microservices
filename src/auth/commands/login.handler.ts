import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { LoginDto } from '../dto/login.dto';
import { USER_ENTITY } from 'src/@core/constants';
import { User } from 'src/users/domain/entities/user.entity';
import { HashingService } from '../services/hashing.service';
import {
  DeviceSessionDto,
  DeviceSessionPayload,
} from 'src/device-sessions/types';
import { TokensService } from 'src/@core/services/tokens.service';
import { CreateOrUpdateDeviceSessionCommand } from 'src/device-sessions/commands/create-or-update-device-session.handler';

export class LoginCommand {
  public constructor(
    public readonly data: LoginDto &
      Omit<DeviceSessionDto, 'userId' | 'payload'>,
  ) {}
}

@CommandHandler(LoginCommand)
export class LoginCommadHandler implements ICommandHandler<LoginCommand> {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
    private readonly tokensService: TokensService,
    private readonly commandBus: CommandBus,
  ) {}
  public async execute(command: LoginCommand): Promise<[string, string]> {
    const { email, password, deviceId, userAgent } = command.data;

    const user = await this.dataSource
      .getRepository<User>(USER_ENTITY)
      .findOne({
        where: {
          email,
        },
      });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordCorrect = await this.hashingService.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    const { id: userId } = user;

    const payload: DeviceSessionPayload = {
      iat: Math.floor(Date.now() / 1000),
      email: user.email,
      sub: userId,
    };

    const updatedOrCreatedDeviceId = await this.commandBus.execute<
      CreateOrUpdateDeviceSessionCommand,
      string
    >(
      new CreateOrUpdateDeviceSessionCommand({
        userId,
        userAgent,
        payload,
        deviceId,
      }),
    );

    return this.tokensService.generateAcessAndRefreshTokens(user.id, {
      ...payload,
      deviceId: updatedOrCreatedDeviceId,
    });
  }
}


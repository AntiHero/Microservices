import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { LoginDto } from '../dto/login.dto';
import { USER_ENTITY } from 'src/@core/constants';
import { User } from 'src/users/domain/entities/user.entity';
import { HashingService } from '../services/hashing.service';

export class LoginCommand {
  public constructor(public readonly data: LoginDto) {}
}

@CommandHandler(LoginCommand)
export class LoginCommadHandler implements ICommandHandler<LoginCommand> {
  public constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {}
  public async execute(command: LoginCommand): Promise<void> {
    const { email, password } = command.data;

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
  }
}

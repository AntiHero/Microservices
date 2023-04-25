import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DataSource } from 'typeorm';

import { USER_ENTITY } from 'src/@core/constants';
import { RegistrationDto } from '../dto/registration.dto';
import { User } from 'src/users/domain/entities/user.entity';
import { HashingService } from '../services/hashing.service';

export class RegistrationCommand {
  public constructor(public readonly data: RegistrationDto) {}
}

@CommandHandler(RegistrationCommand)
export class RegistrationCommadHandler
  implements ICommandHandler<RegistrationCommand>
{
  public constructor(
    private readonly dataSource: DataSource,
    private readonly hashingService: HashingService,
  ) {}
  public async execute(command: RegistrationCommand): Promise<void> {
    const { email, password, username } = command.data;

    const hash = await this.hashingService.hash(password);

    const user = new User();

    user.email = email;
    user.password = hash;
    user.username = username;

    await this.dataSource.getRepository<User>(USER_ENTITY).save(user);
  }
}

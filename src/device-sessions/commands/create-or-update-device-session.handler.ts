import { DeviceSessionService } from '../app/services/device.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { DeviceSessionDto } from '../types';
import { DeviceSession } from '../domain/entities/device-session.entity';

export class CreateOrUpdateDeviceSessionCommand {
  public constructor(public readonly data: DeviceSessionDto) {}
}

@CommandHandler(CreateOrUpdateDeviceSessionCommand)
export class CreateOrUpdateDeviceSessionCommandHandler
  implements ICommandHandler<CreateOrUpdateDeviceSessionCommand>
{
  public constructor(private deviceSessionService: DeviceSessionService) {}
  public async execute(
    command: CreateOrUpdateDeviceSessionCommand,
  ): Promise<string> {
    const { deviceId, userAgent, userId, payload } = command.data;

    const deviceSession = new DeviceSession();
    deviceId && (deviceSession.id = deviceId);
    deviceSession.userAgent = userAgent;
    deviceSession.userId = userId;
    payload && (deviceSession.payload = payload);

    return this.deviceSessionService.createOrUpdateDeviceSession(deviceSession);
  }
}

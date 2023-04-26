import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { DeviceSessionService } from './app/services/device.service';
import { DeviceSession } from './domain/entities/device-session.entity';
import { CreateOrUpdateDeviceSessionCommandHandler } from './commands/create-or-update-device-session.handler';

const commandHandlers = [CreateOrUpdateDeviceSessionCommandHandler];

@Module({
  imports: [TypeOrmModule.forFeature([DeviceSession])],
  providers: [DeviceSessionService, ...commandHandlers],
  exports: [DeviceSessionService],
})
export class DeviceSessionsModule {}

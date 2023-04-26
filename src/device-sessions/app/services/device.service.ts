import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { DatabaseException } from 'src/@core/exceptions';
import { DEVICE_SESSION_ENTITY } from 'src/@core/constants';
import { DeviceSession } from 'src/device-sessions/domain/entities/device-session.entity';

@Injectable()
export class DeviceSessionService {
  public constructor(private readonly dataSource: DataSource) {}

  public async findDeviceSessionById(id: string) {
    try {
      return this.dataSource
        .getRepository<DeviceSession>(DEVICE_SESSION_ENTITY)
        .findOne({
          where: {
            id,
          },
        });
    } catch (error) {
      console.log(error);

      throw new DatabaseException();
    }
  }

  public async createOrUpdateDeviceSession(deviceSession: DeviceSession) {
    try {
      return this.dataSource
        .getRepository(DEVICE_SESSION_ENTITY)
        .save(deviceSession)
        .then((data) => data.id);
    } catch (error) {
      console.log(error);

      throw new DatabaseException();
    }
  }
}

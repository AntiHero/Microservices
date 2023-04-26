import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import assert from 'node:assert/strict';

import { DeviceSessionService } from 'src/device-sessions/app/services/device.service';

@Injectable()
export class DeviceSessionGuard extends AuthGuard('jwt') {
  public constructor(
    private readonly deviceSessionsService: DeviceSessionService,
  ) {
    super();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await (<Promise<boolean>>super.canActivate(context));

    const { user } = context.switchToHttp().getRequest();

    if (!user) return false;

    const { deviceId } = user;

    try {
      const device = await this.deviceSessionsService.findDeviceSessionById(
        deviceId,
      );

      assert.deepEqual(
        {
          iat: user.iat,
          sub: user.userId,
          email: user.email,
        },
        device?.payload,
      );

      if (!device) return false;

      return true;
    } catch (error) {
      return false;
    }
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { DEVICE_SESSION } from '../constants';

export const ActiveDeviceSessionId = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyReply>();

    return request[DEVICE_SESSION]?.id ?? null;
  },
);

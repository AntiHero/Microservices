import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { USER_AGENT } from '../constants';

export const UserAgent = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<FastifyReply>();

  return request.headers[USER_AGENT] || '<unknown>';
});

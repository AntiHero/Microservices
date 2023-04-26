import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

import { REFRESH_TOKEN } from '../constants';
import { jwtConfig } from '../config/jwt.config';

@Injectable()
export class DeviceSessionInterceptor implements NestInterceptor {
  public constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const refreshToken = request.cookies[REFRESH_TOKEN];

    if (!refreshToken) {
      request.deviceSession = null;
    } else {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.jwtConfiguration.secret,
      });

      request.deviceSession = { id: payload.deviceId };
    }

    return next.handle();
  }
}

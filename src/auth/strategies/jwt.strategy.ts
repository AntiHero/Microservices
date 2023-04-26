import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { Inject } from '@nestjs/common';

import { TokenPayload } from 'src/@core/types';
import { jwtConfig } from 'src/@core/config/jwt.config';

export class JwtStrategy extends PassportStrategy(Strategy) {
  public constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConfiguration.secret,
    });
  }

  public async validate(payload: TokenPayload & { sub: string; iat: number }) {
    return {
      userId: payload.sub,
      email: payload.email,
      deviceId: payload.deviceId,
      iat: payload.iat,
    };
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { TokenPayload } from '../types';
import { jwtConfig } from '../config/jwt.config';

@Injectable()
export class TokensService {
  public constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T extends TokenPayload>(
    id: string,
    expiresIn: number,
    payload?: T,
  ) {
    return this.jwtService.signAsync(
      {
        sub: id,
        iat: Math.floor(Date.now() / 1000),
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  public async generateAcessAndRefreshTokens(
    id: string,
    payload: TokenPayload,
  ): Promise<[string, string]> {
    const { email, deviceId } = payload;

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken(id, this.jwtConfiguration.accessTokenTtl, {
        email,
        deviceId,
      }),
      this.signToken(id, this.jwtConfiguration.refreshTokenTtl, {
        email,
        deviceId,
      }),
    ]);

    return [accessToken, refreshToken];
  }
}

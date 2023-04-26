import { TokenPayload } from 'src/@core/types';

export type DeviceSessionPayload = Omit<TokenPayload, 'exp' | 'deviceId'>;

export type DeviceSessionDto = {
  readonly deviceId: string | null;
  readonly userAgent: string;
  readonly userId: string;
  readonly payload: DeviceSessionPayload;
};

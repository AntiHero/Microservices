export type TokenPayload = {
  sub?: string;
  iat?: number;
  exp?: number;
  email: string;
  deviceId: string;
};

export type ActiveDeviceSessionType = {
  id: string;
} | null;

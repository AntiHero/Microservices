import 'fastify';
import { ActiveDeviceSession } from './@core/types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: {
      userId: string;
      email: string;
      deviceId: string;
    };
    deviceSession: ActiveDeviceSession;
  }
}

export {};

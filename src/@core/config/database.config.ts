import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeormFactory = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  const url = configService.get<string>('database.url');

  return { type: 'postgres', url, autoLoadEntities: true, synchronize: true };
};

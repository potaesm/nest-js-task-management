import { ConfigService } from '@nestjs/config';
import constants from './constants';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    inject: [ConfigService],
    provide: constants.DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [__dirname + '/*/*.entity{.ts,.js}'],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];

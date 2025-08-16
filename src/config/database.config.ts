import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'news_user',
    password: process.env.DB_PASSWORD || 'news_password',
    database: process.env.DB_DATABASE || 'news_db',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true',
    autoLoadEntities: true,
    dropSchema: false,
    migrationsRun: false,
    timezone: 'Z',
    charset: 'utf8mb4',
    extra: {
      charset: 'utf8mb4_unicode_ci',
    },
  }),
);
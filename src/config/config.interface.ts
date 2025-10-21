
export interface IAppConfig {
  PORT: number;
  NODE_ENV: 'development' | 'production' | 'test';

  // Documentation about the application
  APP_NAME: string;
  APP_VERSION: string;

  // Database configuration
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  // JWT configuration
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
}

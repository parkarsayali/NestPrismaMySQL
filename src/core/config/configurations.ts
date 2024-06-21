// export default () => ({
//   port: parseInt(process.env.PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET,
// });

// src/config/configuration.ts
import { EnvConfig, validateConfig } from './env.config';

export default () => {
  const config = {
    DB_PORT: process.env.DB_PORT,
    DB_USERNAME: process.env.DB_USERNAME,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_HOST: process.env.DB_HOST,
    DB_DATABASE: process.env.DB_DATABASE,
    NEST_DEBUG: process.env.NEST_DEBUG,
    RUST_BACKTRACE: process.env.RUST_BACKTRACE,
    DEVELOPMENT_API_URL: process.env.DEVELOPMENT_API_URL,
    PRODUCTION_API_URL: process.env.PRODUCTION_API_URL,
    STAGING_API_URL: process.env.STAGING_API_URL,
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
  };

  return validateConfig(config);
};

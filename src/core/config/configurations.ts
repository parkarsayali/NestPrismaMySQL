// export default () => ({
//   port: parseInt(process.env.PORT, 10) || 3000,
// jwtSecret: process.env.JWT_SECRET,
// });

import { validateConfig } from './env.config';

export default () => {
  const config = {
    DB_PORT: parseInt(process.env.DB_PORT, 10) || 3307,
    DB_USERNAME: process.env.DB_USERNAME || 'user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'user',
    DB_HOST: process.env.DB_HOST || '203.212.222.191',
    DB_DATABASE: process.env.DB_DATABASE || 'propvue360',
  };

  const newConfig = {
    DB_PORT: parseInt(process.env.DB_PORT, 10) || 3307,
    DB_USERNAME: process.env.DB_USERNAME || 'user',
    DB_PASSWORD: process.env.DB_PASSWORD || 'user',
    DB_HOST: process.env.DB_HOST || '203.212.222.191',
    DB_DATABASE: process.env.DB_DATABASE || 'propvue360',
    NEST_DEBUG: parseInt(process.env.NEST_DEBUG, 10) || 1,
    RUST_BACKTRACE: process.env.RUST_BACKTRACE || '1',
    DEVELOPMENT_API_URL:
      process.env.DEVELOPMENT_API_URL || 'http://localhost:3000',
    PRODUCTION_API_URL:
      process.env.PRODUCTION_API_URL || 'http://production.com:3000/',
    STAGING_API_URL: process.env.STAGING_API_URL || 'http://staging.com:3000/',
    NODE_ENV: process.env.NODE_ENV || 'development',
    DATABASE_URL:
      process.env.DATABASE_URL ||
      'mysql://user:user@203.212.222.191:3306/propvue360?schema=public',
    jwtSecret:
      process.env.JWT_SECRET ||
      '99cefbde81a7be3d3dac9647c328579f3d5f34a35a216a1529f2f567ad7b846a03bdd7cda5f6db5471180a1b32805316265852860aba607e8a7c0ce3727de125',
  };

  return validateConfig(newConfig);
  // return validateConfig(config);
};

import dotenv from 'dotenv-safe';

dotenv.config();

const config = {
  app: {
    port: process.env.PORT || 5001,
    api_uri: process.env.API_URL || 'http://localhost:5001',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'DB_name_auth',
  },
  jwt_secrets: {
    access: process.env.JWT_ACCESS_SECRET || 'jwt_access_secret_name',
    refresh: process.env.JWT_REFRESH_SECRET || 'jwt_refresh_secret_name',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.example.host',
    port: process.env.SMTP_PORT || 500,
    user: process.env.SMTP_USER || 'user@example.com',
    password: process.env.SMTP_PASSWORD || 'user_password',
  },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:3000',
  },
};

export default config;

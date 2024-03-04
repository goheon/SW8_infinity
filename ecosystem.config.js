module.exports = {
  apps: [
    {
      name: 'Infinity-dev',
      script: 'npm run start',
      instances: 1,
      autorestart: false,
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: process.env.PORT,
        DB_ID: process.env.DB_ID,
        DB_PW: process.env.DB_PW,
        SECRET: process.env.SECRET
      }
    }
  ]
};

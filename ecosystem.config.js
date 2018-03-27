require('dotenv').config({ path: './.env' })

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'yuefou-graphql-server',
      script: 'dist/index.js',
      "env_webhook": {
        "port": 23928,
        "path": "/webhook",
        "secret": "yuefouweb"
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'ubuntu',
      host : '212.83.163.1',
      ref  : 'origin/staging',
      repo : 'git@github.com:haoliangwu/yuefou.git',
      path : '/var/www/yuefou',
      'post-deploy' : 'yarn install && yarn prod:start'
    }
  }
};

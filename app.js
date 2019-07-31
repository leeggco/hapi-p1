'use strict';

require('env2')('./.env');
const Hapi = require('hapi');
const config = require('./config');

const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');
// 注册分页插件
const pluginHapiPagination = require('./plugins/hapi-pagination');
// 引入自定义的 hapi-swagger 插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
const init = async () => {
  const server = Hapi.Server({
    port: config.port,
    host: config.host,
  });
  // 使用插件
  // await server.register(require('good'));
  await server.register(require('inert'));
  await server.register({
    plugin: require('hapi-pino'),
    options: {
      prettyPrint: false,
      logEvents: ['response', 'onPostStart']
    }
  });
  // 注册插件
  await server.register([
    ...pluginHapiSwagger
  ]);
  // 注册路由
  server.route([
    ...routesHelloHapi,
    ...routesShops,
    ...routesOrders,
    ...routesUsers,
  ]);
  // 启动服务器
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
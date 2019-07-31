// routes/shops.js
const {
  paginationDefine
} = require('../utils/router-helper');
const GROUP_NAME = 'shops';
console.log(111111)
// 引入 models
const models = require("../models");
module.exports = [{
  method: 'GET',
  path: `/${GROUP_NAME}`,
  handler: async (request, reply) => {
    console.log(22222)
    const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
      attributes: [
        'id',
        'name',
      ],
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit,
    });
    console.log(33333, results)
    // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
    reply({ results, totalCount });
  },
  config: {
    tags: ['api', GROUP_NAME],
    auth: false,
    description: '获取店铺列表',
    validate: {
      query: {
        ...paginationDefine
      }
    }
  }
}, {
  method: 'GET',
  path: `/${GROUP_NAME}/{shopId}/goods`,
  handler: async (request, reply) => {
    // 增加带有 where 的条件查询
    const {
      rows: results,
      count: totalCount
    } = await models.goods.findAndCountAll({
      // 基于 shop_id 的条件查询
      where: {
        shop_id: request.params.shopId,
      },
      attributes: [
        'id',
        'name',
      ],
      limit: request.query.limit,
      offset: (request.query.page - 1) * request.query.limit,
    });
  },
}]



// const Joi = require('joi');
// const models = require("../models");
// const GROUP_NAME = 'shops';
// const {
//   paginationDefine
// } = require('../utils/router-helper');

// module.exports = [
//   {
//     method: 'GET',
//     path: '/shops',
//     handler: async (request, reply) => {
//       // 通过 await 来异步查取数据
//       const result = await models.shops.findAll({
//         // 排除查询字段
//         attributes: [
//           'id', 'name'
//         ]
//       });
//       reply(result)
//     }
//   },
//   {
//     method: 'GET',
//     path: `/${GROUP_NAME}`,
//     handler: async (request, reply) => {
//       const {
//         rows: results,
//         count: totalCount
//       } = await models.shops.findAndCountAll({
//         attributes: [
//           'id',
//           'name',
//         ],
//         limit: request.query.limit,
//         offset: (request.query.page - 1) * request.query.limit,
//       });
//       // 开启分页的插件，返回的数据结构里，需要带上 result 与 totalCount 两个字段
//       reply({
//         results,
//         totalCount
//       });
//     },
//     config: {
//       tags: ['api', GROUP_NAME],
//       auth: false,
//       description: '获取店铺列表',
//       validate: {
//         query: {
//           ...paginationDefine
//         }
//       }
//     }
//   },
//   {
//     method: 'GET',
//     path: `/${GROUP_NAME}/{shopId}/goods`,
//     handler: async (request, reply) => {
//       reply();
//     },
//     config: {
//       tags: ['api', GROUP_NAME],
//       description: '获取店铺的商品列表',
//     },
//   },
// ];
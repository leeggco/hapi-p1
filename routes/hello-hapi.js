module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello World!';
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试hello-hapi',
    },
  }, {
    method: 'GET',
    path: '/{name}',
    handler: (request, h) => {
      return ('Hello, ' + encodeURIComponent(request.params.name) + "!");
    }
  }, {
    method: 'GET',
    path: '/hello',
    handler: (request, h) => {
      return h.file('./hello.html')
    }
  }
]
const Eureka = require('eureka-js-client').Eureka;
const eurekaHost = 'nolmung.kr';
const eurekaPort = 8761;
const ipAddr = '172.0.0.1';

exports.registerWithEureka = function (appName, PORT) {
  const client = new Eureka({
    // application instance information
    instance: {
      app: appName,
      hostName: `${appName}:${Math.random().toString(36).substring(2)}`,
      ipAddr: ipAddr,
      port: {
        $: PORT,
        '@enabled': 'true',
      },
      vipAddress: appName,
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      // eureka server host / port
      host: eurekaHost,
      port: eurekaPort,
      servicePath: '/eureka/apps/',
    },
  });

  client.logger.level('debug');

  client.start(error => {
    console.log(error || 'user service registered');
  });

  function exitHandler(options, exitCode) {
    if (options.cleanup) {
    }
    if (exitCode || exitCode === 0) console.log(exitCode);
    if (options.exit) {
      client.stop();
    }
  }

  client.on('deregistered', () => {
    process.exit();
    console.log('after deregistered');
  });

  client.on('started', () => {
    console.log('eureka host  ' + eurekaHost);
  });

  process.on('SIGINT', exitHandler.bind(null, {exit: true}));
};

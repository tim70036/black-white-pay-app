const devMode = (process.env.NODE_ENV !== 'development');

const config = {
  // App Details
  appName: 'GainSword',

  // Network
  // apiUrl: 'http://ffdev.ap-northeast-1.elasticbeanstalk.com/api',
  apiUrl: 'http://localhost:8080/api',
  // apiUrl: 'http://192.168.1.106:8080/api',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,

  // Google Analytics - uses a 'dev' account while we're testing
  gaTrackingId: (devMode) ? 'UA-84284256-2' : 'UA-84284256-1',

  tokenStorageKey: 'expoPushToken',
};

export default config;


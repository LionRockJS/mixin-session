import Central from '@lionrockjs/central';

Central.initConfig(new Map([
  ['cookie', await import('./config/cookie')],
  ['session', await import('./config/session')],
]));
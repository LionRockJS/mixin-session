import Central from 'lionrockjs';

Central.initConfig(new Map([
  ['cookie', await import('./config/cookie')],
  ['session', await import('./config/session')],
]));
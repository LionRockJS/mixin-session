import Central from '@lionrockjs/central';

Central.initConfig(new Map([
  ['cookie', await import('./config/cookie.mjs')],
  ['session', await import('./config/session.mjs')],
]));
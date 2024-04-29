import * as url from 'node:url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');

import path from 'node:path';
import fs from 'node:fs';
import { Central, ControllerMixinDatabase } from '@lionrockjs/central';
import { DatabaseAdapterBetterSQLite3 } from '@lionrockjs/adapter-database-better-sqlite3';
ControllerMixinDatabase.defaultAdapter = DatabaseAdapterBetterSQLite3;
import { Controller } from '@lionrockjs/mvc';
import ControllerMixinSession from '../classes/controller-mixin/Session';
import Database from "better-sqlite3";

class ControllerSession extends Controller {
  static mixins = [...Controller.mixins, ControllerMixinDatabase, ControllerMixinSession];

  constructor(request, sessionOption) {
    super(request);
    this.state.get(ControllerMixinDatabase.DATABASE_MAP).set('session', `${__dirname}/db/session.sqlite`);
    this.state.set(ControllerMixinSession.SESSION_OPTIONS, sessionOption);
  }

  async action_setfoo() {
    const request = this.state.get(Controller.STATE_REQUEST);
    request.session.foo = request.body;
  }

  async action_readfoo() {
    const request = this.state.get(Controller.STATE_REQUEST);
    this.state.set(Controller.STATE_BODY, request.session.foo);
  }
}

class ControllerSessionNoDB extends Controller {
  static mixins = [ControllerMixinSession];

  constructor(request, sessionOption) {
    super(request);
    this.state.set(ControllerMixinSession.SESSION_OPTIONS, sessionOption);
  }
}

describe('Test Session', () => {
  const dbPath = path.normalize(`${__dirname}/db/session.sqlite`);
  if (fs.existsSync(dbPath))fs.unlinkSync(dbPath);
  fs.copyFileSync(`${__dirname}/defaultDB/session.sqlite`, dbPath);

  beforeEach(async () => {
    await Central.init({ EXE_PATH: `${__dirname}/test1` });
    await Central.initConfig(new Map([
      ['cookie', (await import('../config/cookie.mjs')).default],
      ['session', (await import('../config/session.mjs')).default],
    ]));
    Central.classPath.set('ControllerSession', path.normalize(`${__dirname}/../classes/ControllerSession.mjs`));
//    await Central.flushCache();
  });

  test('valid session signature, but session not in database', async () => {
    const data = Math.random();
    const c1 = new ControllerSession({ cookies: { 'lionrock-session': '5722ffcc-169a-4764-89f9-60045fe0d077.oZejsSIrAqd05PuxF/haV7aard2poAg8USR6+4TiYkQ=' }, body: data });
    const r1 = await c1.execute('setfoo');
    expect(r1.cookies.length).toBe(1);
  });
});

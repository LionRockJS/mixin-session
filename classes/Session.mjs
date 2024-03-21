import { Central, ORM } from '@lionrockjs/central';
import { randomUUID } from 'node:crypto';
import { HelperCrypto } from '@lionrockjs/mod-crypto';
import Session from '../classes/model/Session.mjs';

export default class HelperSession {
  static async read(request, database, options) {
    const config = { ...Central.config.session, ...options };

    const signedSessionID = request.cookies[config.name];
    if (!signedSessionID) {
      HelperSession.create(request);
      return;
    }

    const seg = signedSessionID.split('.');
    const sid = seg[0];
    const sign = seg[1];
    const verify = await HelperCrypto.verify(config.secret, sign, sid);

    if (!verify) {
      HelperSession.create(request);
      return;
    }

    const model = await ORM.readBy(Session, 'sid', [sid], { database });

    // sid not in database, create new session.
    if (!model?.id) {
      HelperSession.create(request);
      return;
    }

    request.session = { id: model.id, sid: model.sid, ...JSON.parse(model.sess) };
  }

  static create(request) {
    request.session = {
      id: null,
      sid: randomUUID(),
    };
  }

  static async write(request, cookies, database, options) {
    const config = { ...Central.config.session, ...options };

    const cookieConfig = Central.config.cookie;
    const { secret } = config;
    const model = new Session(request.session.id, { database });

    const data = { ...request.session };
    model.sid = data.sid;
    delete data.sid;
    delete data.id;

    model.expired = Date.now() + (cookieConfig.maxAge ?? 43200000);
    model.sess = JSON.stringify(data);
    await model.write();

    const sign = await HelperCrypto.sign(secret, model.sid);
    const cookieName = `${model.sid}.${sign}`;

    cookies.push({
      name: config.name,
      value: cookieName,
      options: cookieConfig,
    });
  }
}
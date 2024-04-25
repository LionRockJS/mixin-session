import { ControllerMixin, Controller } from '@lionrockjs/mvc';
import { Central, ControllerMixinDatabase } from '@lionrockjs/central';
import equal from 'fast-deep-equal';
import Session from '../Session.mjs';

export default class ControllerMixinSession extends ControllerMixin {
  static SESSION_DATABASE = 'session_database';
  static SESSION_DATABASE_KEY = 'session_database_key'
  static SESSION_OPTIONS = 'session_options';
  static OLD_SESSION = 'oldSession';

  static init(state) {
    if (!state.get(this.SESSION_DATABASE_KEY))state.set(this.SESSION_DATABASE_KEY, 'session');
    const request = state.get(Controller.STATE_REQUEST);
    if (!request.cookies) throw new Error('Session require cookies enabled');
  }

  static async setup(state) {
    const databases = state.get(ControllerMixinDatabase.DATABASES);
    if (databases) {
      state.set(this.SESSION_DATABASE, databases.get(state.get(this.SESSION_DATABASE_KEY)));
      if (!state.get(this.SESSION_DATABASE)) throw new Error('ControllerMixinSession require database');
    }
  }

  static async before(state) {
    const request = state.get(Controller.STATE_REQUEST);
    if (request.session) return;// session already created
    await Session.read(request, state.get(this.SESSION_DATABASE), state.get(this.SESSION_OPTIONS));
    state.set(this.OLD_SESSION, { ...request.session });
  }

  static async after(state) {
    const config = { ...Central.config.session, ...state.get(this.SESSION_OPTIONS) };
    const request  = state.get(Controller.STATE_REQUEST);
    const { session } = request;
    const cookies = state.get(Controller.STATE_COOKIES);

    if(!session)return;

    const save = config.resave || (!session.id && config.saveUninitialized) || !equal(state.get(this.OLD_SESSION), session);

    if (!save) return;
    await Session.write(request, cookies, state.get(this.SESSION_DATABASE), state.get(this.SESSION_OPTIONS));
  }

  static async exit(state) {
    // still try to save session if exit code is 302
    if (state.get(Controller.STATE_STATUS) === 302) await this.after(state);
  }
}

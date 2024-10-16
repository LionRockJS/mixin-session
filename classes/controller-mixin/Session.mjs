import { ControllerMixin, Controller } from '@lionrockjs/mvc';
import { Central } from '@lionrockjs/central';
import equal from 'fast-deep-equal';
import HelperSession from '../helper/Session.mjs';
import AbstractAdapterSession from '../adapter/Session.mjs';

export default class ControllerMixinSession extends ControllerMixin {
  static SESSION_OPTIONS = 'session_options';
  static OLD_SESSION = 'oldSession';
  static HELPER_SESSION = 'helper_session';
  static defaultAdapter = AbstractAdapterSession;

  static init(state) {
    const request = state.get(Controller.STATE_REQUEST);
    if (!request.cookies) throw new Error('Session require cookies enabled');

    state.set(this.HELPER_SESSION, new HelperSession(this.defaultAdapter));
    state.set(this.SESSION_OPTIONS, { state });
  }

  static async before(state) {
    const request = state.get(Controller.STATE_REQUEST);
    if (request.session) return;// session already created
    try{
      request.session = await state.get(this.HELPER_SESSION).read(request.cookies, state.get(this.SESSION_OPTIONS));
    }catch(e){
      //browser may send multiple session cookies, try to find the right one
      request.session = this.defaultAdapter.create(request);
      const cookieString = request.headers.cookie;
      const cookies = cookieString
        .split(';')
        .map(it => {
          const result = it.split('=').map(it => it.trim());
          if(result[0] !== Central.config.session.name)return null;
          return result;
        })
        .filter(it => it)
        .reverse();

      for( let i=0; i<cookies.length; i++){
        //use the last session cookie if no error
        try{
          const cookie = {};
          cookie[cookies[i][0]] = cookies[i][1];
          request.session = await state.get(this.HELPER_SESSION).read(cookie, state.get(this.SESSION_OPTIONS));
          break;
        }catch(e){}
      }
    }

    state.set(this.OLD_SESSION, { ...request.session });
  }

  static async after(state) {
    const config = { ...Central.config.session, ...state.get(this.SESSION_OPTIONS) };
    const request  = state.get(Controller.STATE_REQUEST);
    const cookies = state.get(Controller.STATE_COOKIES);
    if(!request.session)return;

    const save = config.resave || (!request.session.id && config.saveUninitialized) || !equal(state.get(this.OLD_SESSION), request.session);

    if (!save) return;
    await state.get(this.HELPER_SESSION).write(request.session, cookies, state.get(this.SESSION_OPTIONS));
  }

  static async exit(state) {
    // still try to save session if exit code is 302
    if (state.get(Controller.STATE_STATUS) === 302) await this.after(state);
  }
}

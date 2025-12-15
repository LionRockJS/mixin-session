import AbstractAdapterSession, { SessionData } from '../adapter/Session.mjs';

export default class HelperSession {
  adapter: typeof AbstractAdapterSession;

  constructor(adapter: typeof AbstractAdapterSession) {
    this.adapter = adapter;
  }

  async read(cookies: any, options: any): Promise<SessionData> {
    return await this.adapter.read(cookies, options);
  }

  async write(session: SessionData, cookies: any, options: any): Promise<void> {
    return await this.adapter.write(session, cookies, options);
  }
}

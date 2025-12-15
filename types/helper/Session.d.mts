import AbstractAdapterSession, { SessionData } from '../adapter/Session.mjs';
export default class HelperSession {
    adapter: typeof AbstractAdapterSession;
    constructor(adapter: typeof AbstractAdapterSession);
    read(cookies: any, options: any): Promise<SessionData>;
    write(session: SessionData, cookies: any, options: any): Promise<void>;
}

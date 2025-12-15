export interface SessionData {
    id: string | null;
    sid: string;
    creator: string;
    [key: string]: any;
}
export default class AbstractAdapterSession {
    static read(cookies: any, options: any): Promise<SessionData>;
    static write(session: SessionData, cookies: any, options: any): Promise<void>;
    static create(request?: any): SessionData;
}

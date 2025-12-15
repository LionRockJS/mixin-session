import { randomUUID } from "node:crypto";

export interface SessionData {
  id: string | null;
  sid: string;
  creator: string;
  [key: string]: any;
}

export default class AbstractAdapterSession {
  static async read(cookies: any, options: any): Promise<SessionData> {
    console.log('AbstractAdapterSession.read');
    return this.create();
  }

  static async write(session: SessionData, cookies: any, options: any): Promise<void> {
    console.log('AbstractAdapterSession.write');
  }

  static create(request?: any): SessionData {
    return {
      id: null,
      sid: randomUUID(),
      creator: this.name,
    };
  }
}

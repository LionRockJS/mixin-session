import {randomUUID} from "node:crypto";

export default class AbstractAdapterSession{
  static async read(cookies, options) {
    console.log('AbstractAdapterSession.read');
  }

  static async write(session, cookies, options) {
    console.log('AbstractAdapterSession.write');
  }

  static create(request) {
    return {
      id: null,
      sid: randomUUID(),
    };
  }
}
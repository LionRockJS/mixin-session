import {randomUUID} from "node:crypto";

export class AbstractHelperSessionAdapter{
  static async read(request, options) {
    console.log('AbstractHelperSession.read', request, options);
  }

  static async write(request, cookies, options) {
    console.log('AbstractHelperSession.write', request, options);
  }

  static create(request) {
    return {
      id: null,
      sid: randomUUID(),
    };
  }
}

export default class HelperSession {
  static defaultAdapter = AbstractHelperSessionAdapter;

  constructor(Adapter = null) {
    this.adapter = Adapter || HelperSession.defaultAdapter;
  }

  async read(request, options) {
    return await this.adapter.read(request, options);
  }

  async write(request, cookies, options) {
    return await this.adapter.write(request, cookies, options);
  }
}
export class AbstractHelperSession{
  static async read(request, options) {
  }

  static async write(request, cookies, options) {
  }
}

export default class HelperSession {
  static DefaultAdapter = AbstractHelperSession;

  constructor(Adapter = null) {
    this.adapter = Adapter || HelperSession.DefaultAdapter;
  }

  async read(request, options) {
    return await this.adapter.read(request, options);
  }

  async write(request, cookies, options) {
    return await this.adapter.write(request, cookies, options);
  }
}
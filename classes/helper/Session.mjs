export default class HelperSession {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async read(cookies, options) {
    return await this.adapter.read(cookies, options);
  }

  async write(session, cookies, options) {
    return await this.adapter.write(session, cookies, options);
  }
}
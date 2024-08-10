export default class HelperSession {
  constructor(adapter) {
    this.adapter = adapter;
  }

  async read(request, options) {
    return await this.adapter.read(request, options);
  }

  async write(request, cookies, options) {
    return await this.adapter.write(request, cookies, options);
  }
}
function randomUUID() {
    const cryptoApi = globalThis.crypto;
    if (cryptoApi?.randomUUID)
        return cryptoApi.randomUUID();
    if (!cryptoApi?.getRandomValues)
        throw new Error('Session ID generation requires crypto.getRandomValues');
    const bytes = new Uint8Array(16);
    cryptoApi.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));
    return `${hex.slice(0, 4).join('')}-${hex.slice(4, 6).join('')}-${hex.slice(6, 8).join('')}-${hex.slice(8, 10).join('')}-${hex.slice(10).join('')}`;
}
export default class AbstractAdapterSession {
    static async read(cookies, options) {
        console.log('AbstractAdapterSession.read');
        return this.create();
    }
    static async write(session, cookies, options) {
        console.log('AbstractAdapterSession.write');
    }
    static create(request) {
        return {
            id: null,
            sid: randomUUID(),
            creator: this.name,
        };
    }
}

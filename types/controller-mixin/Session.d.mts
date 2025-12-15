import { ControllerMixin } from '@lionrockjs/mvc';
import AbstractAdapterSession from '../adapter/Session.mjs';
export default class ControllerMixinSession extends ControllerMixin {
    static SESSION_OPTIONS: string;
    static OLD_SESSION: string;
    static HELPER_SESSION: string;
    static defaultAdapter: typeof AbstractAdapterSession;
    static init(state: Map<string, any>): void;
    static before(state: Map<string, any>): Promise<void>;
    static after(state: Map<string, any>): Promise<void>;
    static exit(state: Map<string, any>): Promise<void>;
}

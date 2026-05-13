import ControllerMixinSession from './controller-mixin/Session.mjs';
import AbstractAdapterSession from './adapter/Session.mjs';
import HelperSession from './helper/Session.mjs';
declare const _default: {
    configs: {
        cookie: {
            options: {
                secure: boolean;
                maxAge: number;
                httpOnly: boolean;
                sameSite: string;
                path: string;
            };
        };
        session: {
            saveUninitialized: boolean;
            resave: boolean;
            name: string;
            algorithm: string;
            expires: number;
        };
    };
};
export default _default;
export { ControllerMixinSession, AbstractAdapterSession, HelperSession };

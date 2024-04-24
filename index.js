import url from "node:url";
const dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
export default {dirname}

import ControllerMixinSession from './classes/controller-mixin/Session.mjs';
import Session from './classes/Session.mjs';
import ModelSession from './classes/model/Session.mjs';

export{
  ControllerMixinSession,
  Session,
  ModelSession
}
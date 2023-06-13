import url from "node:url";
const dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
export default {dirname}

import ControllerMixinSession from './classes/controller-mixin/Session';
import Session from './classes/Session';
import ModelSession from './classes/model/Session';

export{
  ControllerMixinSession,
  Session,
  ModelSession
}
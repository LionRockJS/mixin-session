import { Controller } from '@lionrockjs/mvc';
import ControllerMixinSession from '../../../../../classes/controller-mixin/Session';

export default class ControllerSession extends Controller{
  static mixins = [ControllerMixinSession];

  constructor(request){
    super(request);
  }
}
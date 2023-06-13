const {Controller} = require("kohanajs");
const {ControllerMixinDatabase} = require('@kohanajs/mixin-orm');
const ControllerMixinSession = require('../../../../../classes/controller-mixin/Session');

class ControllerSession extends Controller{
  constructor(request){
    super(request);

    const pathDB = KohanaJS.EXE_PATH + '/../db/';
    this.addMixin(new ControllerMixinDatabase(this, new Map([['session', pathDB + 'session.sqlite']])));
    this.addMixin(new ControllerMixinSession(this, this.cookies, this.databases.get('session')));
  }
}

module.exports = ControllerSession;
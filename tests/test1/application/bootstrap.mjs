import HelperSession from '../../../classes/helper/session.mjs';
import HelperSessionJWT from "../../../classes/helper/session/JWT.mjs";

HelperSession.DefaultAdapter = HelperSessionJWT;
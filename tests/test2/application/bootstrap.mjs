import HelperSession from '../../../classes/helper/session.mjs';
import HelperSessionSQLite from "../../../classes/helper/session/SQLite.mjs";

HelperSession.DefaultAdapter = HelperSessionSQLite;
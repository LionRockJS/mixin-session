import Central, {Model} from '@lionrockjs/central';
import ModDatabase, { ORMAdapterSQLite } from '@lionrockjs/adapter-database-better-sqlite3';
Central.addModules([ModDatabase]);

Model.defaultAdapter = ORMAdapterSQLite;


import HelperSession from '../../../classes/helper/session.mjs';
import HelperSessionSQLite from "../../../classes/helper/session/SQLite.mjs";

HelperSession.defaultAdapter = HelperSessionSQLite;
import Central, {ORM} from 'lionrockjs';
import DatabaseAdapterSQLite3, { DatabaseDriverBetterSQLite3, ORMAdapterSQLite } from '@lionrockjs/mod-database-adapter-better-sqlite3';
import Crypto from '@lionrockjs/mod-crypto';
Central.addNodeModules([DatabaseAdapterSQLite3, Crypto]);

ORM.defaultAdapter = ORMAdapterSQLite;
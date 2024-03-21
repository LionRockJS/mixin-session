import Central, {ORM} from '@lionrockjs/central';
import ModDatabase, { ORMAdapterSQLite } from '@lionrockjs/adapter-database-better-sqlite3';
import Crypto from '@lionrockjs/mod-crypto';
Central.addModules([ModDatabase, Crypto]);

ORM.defaultAdapter = ORMAdapterSQLite;
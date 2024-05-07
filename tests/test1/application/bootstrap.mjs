import Central, {ORM} from '@lionrockjs/central';
import ModDatabase, { ORMAdapterSQLite } from '@lionrockjs/adapter-database-better-sqlite3';
Central.addModules([ModDatabase]);

ORM.defaultAdapter = ORMAdapterSQLite;
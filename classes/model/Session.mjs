import { ORM } from 'lionrockjs';

export default class Session extends ORM {
  sid = null;

  expired = 0;

  sess = null;

  static joinTablePrefix = 'session';

  static tableName = 'sessions';

  static fields = new Map([
    ['sid', 'String!'],
    ['expired', 'Int!'],
    ['sess', 'String'],
  ]);
}
import makeUsersDb from './users-db';
import makeDb from '../../db'

const usersDb = makeUsersDb({ makeDb })

export default usersDb
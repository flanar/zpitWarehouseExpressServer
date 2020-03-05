import users from './migrations/users_migration'
import groups from './migrations/groups_migration'
import members from './migrations/members_migration'

(async () => {
    await users()
    await groups()
    await members()
})()
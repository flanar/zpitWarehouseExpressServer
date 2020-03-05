import users from './seeders/users_seeder'
import groups from './seeders/groups_seeder'
import members from './seeders/members_seeder'

(async () => {
    await users()
    await groups()
    await members()
})()
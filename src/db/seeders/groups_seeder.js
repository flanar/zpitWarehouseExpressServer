import db from '../'

const seedTable = async () => {
    await db.query(`INSERT INTO groups (group_name) VALUES ('taneczna');`)
    await db.query(`INSERT INTO groups (group_name) VALUES ('wokalna');`)
    await db.query(`INSERT INTO groups (group_name) VALUES ('mieszana');`)
    await db.query(`INSERT INTO groups (group_name) VALUES ('kapela');`)
    await db.query(`INSERT INTO groups (group_name) VALUES ('inni');`)
}

export default seedTable
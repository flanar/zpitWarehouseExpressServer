import db from '../'

const createTable = async () => {
    await db.query(`ALTER TABLE IF EXISTS "members"
      DROP CONSTRAINT IF EXISTS members_group_id_foreign;`)
    await db.query(`DROP TABLE IF EXISTS "groups"`)
    await db.query(`CREATE TABLE "groups" (
        group_id bigserial NOT NULL,
        group_name varchar(255) NOT NULL,
        CONSTRAINT groups_pkey PRIMARY KEY (group_id)
      );`)
}

export default createTable
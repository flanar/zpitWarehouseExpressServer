import db from '../'

const createTable = async () => {
    await db.query(`DROP TRIGGER IF EXISTS updated_at ON members;`)
    await db.query(`DROP FUNCTION IF EXISTS update_timestamp();`)
    await db.query(`DROP TABLE IF EXISTS "members"`)
    await db.query(`CREATE TABLE "members" (
        member_id bigserial NOT NULL,
        member_name varchar(255) NOT NULL,
        member_surname varchar(255) NOT NULL,
        member_email varchar(255) NULL,
        group_id int8 NOT NULL,
        created_at timestamp NOT NULL DEFAULT NOW(),
        updated_at timestamp NOT NULL DEFAULT NOW(),
        deleted_at timestamp NULL,
        CONSTRAINT members_pkey PRIMARY KEY (member_id)
      );`)
    await db.query(`ALTER TABLE members ADD CONSTRAINT members_group_id_foreign FOREIGN KEY (group_id) REFERENCES groups(group_id);`)
    await db.query(`CREATE FUNCTION update_timestamp() RETURNS trigger
        LANGUAGE plpgsql
        AS $$
        BEGIN
          NEW.updated_at = NOW();
          RETURN NEW;
        END;
      $$;`)
    await db.query(`CREATE TRIGGER updated_at
      BEFORE UPDATE ON members
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();`)
}

export default createTable
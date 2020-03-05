import db from '../'

const createTable = async () => {
    await db.query(`DROP TABLE IF EXISTS "users"`)
    await db.query(`CREATE TABLE "users" (
        id bigserial NOT NULL,
        "name" varchar(255) NOT NULL,
        surname varchar(255) NOT NULL,
        email varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL,
        CONSTRAINT users_email_unique UNIQUE (email),
        CONSTRAINT users_pkey PRIMARY KEY (id)
      );`)
}

export default createTable
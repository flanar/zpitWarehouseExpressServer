import db from '../'

const seedTable = async () => {
    await db.query(`INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ('Kamil', 'Taneczna', 'kamil@taneczna.pl', 1);`)
    await db.query(`INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ('Krystian', 'Wokalna', '', 2);`)
    await db.query(`INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ('Ada', 'Mieszana', '', 3);`)
    await db.query(`INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ('Adam', 'Kapela', 'adam@kapela.pl', 4);`)
    await db.query(`INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ('Piotr', 'Kapela', 'piotr@kapela.pl', 4);`)
    await db.query(`INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ('Józef', 'Inny', 'inny@inny.pl', 5);`)
}

export default seedTable
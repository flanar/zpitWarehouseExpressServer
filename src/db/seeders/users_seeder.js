import db from '../'

const seedTable = async () => {
    await db.query(`INSERT INTO users (name, surname, email, password) VALUES ('Admin', 'Admin', 'admin@admin.pl', '$2b$10$wn2IhWfndvfoyf5CzcS1j.S6hRGB02F40Sm6tCAPXmdOCBcIROxSO');`)
}

export default seedTable
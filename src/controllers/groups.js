import db from '../db'

export const getGroups = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM groups')
    res.send(rows)
}
import db from '../db'

export const getAllUsers = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM users')
    res.send(rows[0])
}

export const getUser = async (req, res) => {
    const { id } = req.params
    if(Number.isInteger(parseInt(id))) {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
        res.send(rows[0])
    } else {
        res.send(null)
    }
}
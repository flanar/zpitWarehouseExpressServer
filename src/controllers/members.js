import db from '../db'

export const getMembers = async (req, res) => {
    const { rows } = await db.query('SELECT * FROM members')
    res.send(rows)
}

export const createMember = async (req, res) => {
    await db.query('INSERT INTO members (member_name, member_surname, member_email, group_id) VALUES ($1, $2, $3, $4)', [req.body.name, req.body.surname, req.body.email, req.body.group])
    res.status(200)
    res.end()
}

export const editMember = async (req, res) => {
    const { id } = req.params
    await db.query('UPDATE members SET member_name = $1, member_surname = $2, member_email = $3, group_id = $4 WHERE member_id = $5', [req.body.name, req.body.surname, req.body.email, req.body.group, id])
    res.status(200)
    res.end()
}

export const deleteMember = async (req, res) => {
    const { id } = req.params
    await db.query('DELETE FROM  members WHERE member_id = $1', [id])
    res.status(200)
    res.end()
}
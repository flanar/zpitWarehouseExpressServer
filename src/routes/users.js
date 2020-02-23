import Router from 'express-promise-router'

import db from '../db'
import { createUser } from '../controllers/auth'

const router = new Router()

router.get('/', async (req, res) => {
    const { rows } = await db.query('SELECT * FROM users')
    res.send(rows[0])
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    if(Number.isInteger(parseInt(id))) {
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
        res.send(rows[0])
    } else {
        res.send(null)
    }
})

router.post('/register', createUser)

export default router
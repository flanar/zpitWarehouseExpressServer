import { Pool } from 'pg'

const pool = new Pool( {
    user: 'zpit',
    host: '127.0.0.1',
    database: 'zpit',
    password: 'zpit',
    port: 5432,
})

export default {
    query: (text, params) => pool.query(text, params)
}
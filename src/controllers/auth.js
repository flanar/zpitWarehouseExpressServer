import db from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET_JWT = 'xd'

const validateEmailAccessibility = async email => {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return !rows.length
}

const generateTokens = user => { 
    const ACCESS_TOKEN = jwt.sign({ 
            sub: user.id, 
            type: 'ACCESS_TOKEN' 
        }, 
        TOKEN_SECRET_JWT, { 
            expiresIn: 120 
        }); 
    const REFRESH_TOKEN = jwt.sign({ 
            sub: user.id, 
            type: 'REFRESH_TOKEN' 
        }, 
        TOKEN_SECRET_JWT, { 
            expiresIn: 480 
        }); 
    return { 
        accessToken: ACCESS_TOKEN, 
        refreshToken: REFRESH_TOKEN 
    } 
}

export const createUser = async (req, res) => { 
    const valid = await validateEmailAccessibility(req.body.email)

    if(valid) {
        try {
            await db.query(
                'INSERT INTO users(name, surname, email, password) VALUES($1, $2, $3, $4)',
                [req.body.name, req.body.surname, req.body.email, req.body.password]
            )
            res.json({ message: 'The user was created' }) 
        } catch (err) {
            res.status(400).send({ 
                message: "Incorrect body" 
            })
        }
    } else {
        res.status(409).send({ 
            message: "The request could not be completed due to a conflict" 
        })
    }
}
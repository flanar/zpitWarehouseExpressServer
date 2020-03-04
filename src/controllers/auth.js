import db from '../db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const TOKEN_SECRET_JWT = 'xd'

const validateEmailAccessibility = async email => {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email])
    return !rows.length
}

const generateTokens = (req, user) => {
    const ACCESS_TOKEN = jwt.sign({
            sub: user.id,
            type: 'ACCESS_TOKEN'
        },
        TOKEN_SECRET_JWT, {
            expiresIn: 120
        })
    const REFRESH_TOKEN = jwt.sign({
            sub: user.id,
            type: 'REFRESH_TOKEN'
        },
        TOKEN_SECRET_JWT, {
            expiresIn: 480
        })
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
                [req.body.name, req.body.surname, req.body.email, bcrypt.hashSync(req.body.password, 10)]
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

export const loginUser = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [req.body.email])

        if(rows.length) {
            const user = rows[0]
            if(bcrypt.compareSync(req.body.password, user.password)) {
                res.json(generateTokens(req, user))
            } else {
                res.status(401).send({ 
                    message: "Invalid email/password" 
                }) 
            }
        } else {
            res.status(401).send({ 
                message: "Unauthorized" 
            })
        }
    }  catch (err) {
        res.status(400).send({ 
            message: "Incorrect body" 
        })
    }  
}

export const accessTokenVerify = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            error: 'Token is missing'
        })
    }
    const BEARER = 'Bearer'
    const AUTHORIZATION_TOKEN = req.headers.authorization.split(' ')
    if (AUTHORIZATION_TOKEN[0] !== BEARER) {
        return res.status(401).send({
            error: "Token is not complete"
        })
    }
    jwt.verify(AUTHORIZATION_TOKEN[1], TOKEN_SECRET_JWT, err => {
        if(err) {
            return res.status(401).send({
                error: "Token is invalid"
            })
        }
        next()
    })
}

export const refreshTokenVerify = (req, res) => {
    if (!req.body.refreshToken) {
        return res.status(401).send({
            error: 'Token refresh is missing'
        })
    }
    const BEARER = 'Bearer'
    const REFRESH_TOKEN = req.body.refreshToken.split(' ')
    if (REFRESH_TOKEN[0] !== BEARER) {
        return res.status(401).send({
            error: "Token is not complete"
        })
    }
    jwt.verify(REFRESH_TOKEN[1], TOKEN_SECRET_JWT, async (err, payload) => {
        if(err) {
            return res.status(401).send({
                error: "Token refresh is invalid"
            })
        }
        const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [payload.sub])
        if(rows.length) {
            return res.json(generateTokens(req, person))
        } else {
            return res.status(401).send({
                error: 'Person not found'
            })
        }
    })
}
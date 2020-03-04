import Router from 'express-promise-router'

import { createUser, loginUser, refreshTokenVerify, accessTokenVerify } from '../controllers/auth'

const router = new Router()

router.post('/login', loginUser)
router.post('/refresh', refreshTokenVerify)

router.post('/register', accessTokenVerify, createUser)

export default router
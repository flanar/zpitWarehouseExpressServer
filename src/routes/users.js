import Router from 'express-promise-router'

import { accessTokenVerify } from '../controllers/auth'
import { getAllUsers, getUser } from '../controllers/users'

const router = new Router()

router.get('/', accessTokenVerify, getAllUsers)

router.get('/:id', accessTokenVerify, getUser)

export default router
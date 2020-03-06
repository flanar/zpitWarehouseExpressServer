import Router from 'express-promise-router'

import { accessTokenVerify } from '../controllers/auth'
import { getGroups } from '../controllers/groups'

const router = new Router()

router.get('/', accessTokenVerify, getGroups)

export default router
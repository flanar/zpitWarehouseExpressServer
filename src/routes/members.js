import Router from 'express-promise-router'

import { accessTokenVerify } from '../controllers/auth'
import { getMembers, createMember, editMember, deleteMember } from '../controllers/members'

const router = new Router()

router.get('/', accessTokenVerify, getMembers)
router.post('/', accessTokenVerify, createMember)
router.put('/:id', accessTokenVerify, editMember)
router.delete('/:id', accessTokenVerify, deleteMember)

export default router
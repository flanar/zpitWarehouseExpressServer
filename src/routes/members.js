import Router from 'express-promise-router'

import { accessTokenVerify } from '../controllers/auth'
import { getMembers, createMember, editMember, deleteMember } from '../controllers/members'

const router = new Router()

router.get('/', getMembers)
router.post('/', createMember)
router.put('/:id', editMember)
router.delete('/:id', deleteMember)

export default router
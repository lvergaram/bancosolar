import { Router } from 'express'
import { transferController } from './transfer.controller.js'

const router = Router()

router.get('/', transferController.getAllAndUserInfo)
router.get('/:id', transferController.getOneById)
router.post('/', transferController.create)
router.put('/:id', transferController.update)
router.delete('/:id', transferController.remove)

export default router

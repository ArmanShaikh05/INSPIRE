import * as controller from '../controllers/university.controller.js'
import express from 'express'

const router=express.Router()

router.route('/getAllName').get(controller.getAllUniversity)

export default router
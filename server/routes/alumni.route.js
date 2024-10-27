import * as controller from '../controllers/alumni.controller.js'
import express from 'express'

const router=express.Router()

router.route('/register').post(controller.registerAlumni)

export default router
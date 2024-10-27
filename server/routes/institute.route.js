import * as controller from '../controllers/institute.controller.js'
import express from 'express'

const router=express.Router()

router.route('/getAllInstitute').get(controller.getAllInstitutes)

export default router
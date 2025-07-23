import express from 'express'
const router = express.Router();

import getRouter from '../dataGet/userDataGet.js'
import matricRouter from "../matric/matric.js"
//user
router.use("/",getRouter)
//matric
router.use("/",matricRouter)
export default router;

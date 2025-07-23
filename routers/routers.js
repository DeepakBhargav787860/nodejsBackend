import express from 'express'
const router = express.Router();

import getRouter from '../dataGet/userDataGet.js'

router.use("/",getRouter)
export default router;

import express from "express"
const router = express.Router()
import config from "../config.js"
import {values} from "../utils/values.js"


router.post('/', function (req, res) {  
    values.paramJSON = 'data:application/json,' + JSON.stringify(req.body); 
    console.log(`@POST /htmlValues onClick Apply`.brightRed.bold)
    console.log(`${values.paramJSON}\n\n`.magenta)
    res.status(204).json(values.paramJSON);
});

export default router
import express from "express"
const router = express.Router()
import config from "../config.js"
import {signing} from "../services/api.js"
import downloadFile from "../utils/downloadFile.js"


// Log in and get access_token
router.post("/",async (req,res)=>{
    //Sign PDF & download file
    let url = await signing(resultPdfUrl);
    //Kalle
    downloadFile(url, pdfName);

    //////Sign DWG & download file
    url = await signing(resultDwgUrl);
    downloadFile(url, dwgName);


    //////Sign Info (dwg)  & download file
    url = await signing(resultInfoUrl);
    downloadFile(url, infoName);


    ////// Sign STEP  & download file
    url = await signing(resultStpUrl);
    downloadFile(url, stpName);


    ////// Sign SVF  & download file
    url = await signing(resultSvfUrl);
    downloadFile(url, downloadSvfZipName, true);

    io.emit('downloadsReady');

    console.log('Everything downloaded...');
    res.sendStatus(204);
})

router.get("/",(req,res)=>{
    res.send("404 not found")
})
export default router
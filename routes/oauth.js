import express from "express";
const router = express.Router();
import config from "../config.js";
import request from 'request';

import {
   oauth,
   createBucket,
   signandworkitemInventor,
   createWorkItem,
   getWorkItem,
   downloadWorkItemReport,
   downloadSignedresources,
   uploadObject,
   signZip,
   downloadZip,
   downloadPdf,
   signPdf,
   signDwg,
   downloadDwg,
   signSvf,
   downloadSvf,
   translateFile,
   checkTranslationProgress
} from "../services/api.js";
import { values, urls } from "../utils/values.js";




// Log in and get access_token
router.get("/", async (req, res) => {
   console.log(
      "1. @GET /api/forge/oauth => onClick createDownload \n\n".brightRed.bold
   );
   try {

      // 1
      let response = await oauth();
      values.access_token = response.access_token;
      console.log("2. @POST {{Autodesk}}/authentication/v1/authenticate => Axios /\n\treturn access_token".brightRed.bold);
      console.log(`access_token : ${values.access_token}\n\n`.magenta);

      // 2
      let { signedUrl } = await signandworkitemInventor();
      urls.inventorInputSignedUrl = signedUrl;
      console.log(
         "3. @POST {{Autodesk}}/oss/v2/buckets/:bucketKey/objects/:objectKey/signed => Axios /\n\treturn signedUrl"
            .brightRed.bold
      );
      console.log(`urls.inventorInputSignedUrl : ${urls.inventorInputSignedUrl}\n\n`.green);

         // 3
      let createWorkIte = await createWorkItem();
      console.log("4. @POST {{Autodesk}}/da/us-east/v3/workitems  => Axios /\n\treturn status:{pending,id,stats:{timeQueued}}".brightRed.bold);
      console.log(`createWorkItem : ${JSON.stringify(createWorkIte)}\n\n`.green );
      values.workItemId = createWorkIte.id 


      let statusWorkItem = ["pending", "cancelled", "failedLimitProcessingTime", "failedDownload", "failedInstructions", "failedUpload", "failedUploadOptional"]
      let getWorkIte;
       //Download Each Folder
      let intervalId = setInterval(async ()=>{
         if(typeof getWorkIte == "object"){
            if(getWorkIte?.status == "success"){
               clearInterval(intervalId)
               await downloadWorkItemReport(getWorkIte.reportUrl)
               await downloadSignedresources(urls.inventorInputSignedUrl)
               return;
            }else if(statusWorkItem.includes(getWorkIte?.status)){
               clearInterval(intervalId)
               // throw Error("Download Failed");
            }
         }
         getWorkIte = await getWorkItem()
         console.log("getWorkItem() ",getWorkIte) 
      },5000)



      // 4
      //@PUT https://developer.api.autodesk.com/oss/v2/buckets/basbrliyiahr1x9eyiai4atpmdcuz5pf_aoutput/objects/MasterDownload.zip
      console.log("5. @PUT {{Autodesk}}/oss/v2/buckets/:bucketKey/objects/:objectKey/signed => Axios /\n\treturn {bucketKey,objectId,location,objectKey}".brightRed.bold);
      let a = await uploadObject();
      console.log(`${a.objectId}\n`.bgCyan);
       let safeURN = await Buffer.from(a.objectId).toString('base64')
      console.log(`${safeURN.split("=")[0]}`.bgMagenta)
      let translated = translateFile(safeURN.split("=")[0])
      console.log("5. @PUT {{Autodesk}}/modelderivative/v2/designdata/job => Axios /\n\treturn {svf}".brightRed.bold);
      console.log(`translated: ${translated}`.bgMagenta)

      let dat = checkTranslationProgress(safeURN)
      console.log("checkTranslationProgress : ",dat)

      
      // 5
      //@POST https://developer.api.autodesk.com/oss/v2/buckets/basbrliyiahr1x9eyiai4atpmdcuz5pf_aoutput/objects/MasterDownload.zip
   
      let ZIPSignedUrl = await signZip();
      urls.ZIPSignedUrl = ZIPSignedUrl.signedUrl;
      console.log("6. @POST {{Autodesk}}/resultZipUrl + /signed  => Axios /\n\treturn {status:pending,id,stats:{timeQueued}}".brightRed.bold );
      console.log(`ZIPSignedUrl : ${JSON.stringify(urls.ZIPSignedUrl)}\n\n`.green);

      downloadZip();

      let pdfSignedUrl = await signPdf();
      urls.pdfSignedUrl = pdfSignedUrl.signedUrl;
      console.log("6. @POST {{Autodesk}}/pdfSignedUrl + /signed  => Axios /\n\treturn {status:pending,id,stats:{timeQueued}}".brightRed.bold);
      console.log( `pdfSignedUrl : ${JSON.stringify(urls.pdfSignedUrl)}\n\n`.green);

      downloadPdf();

      let dwgSignedUrl = await signDwg()
       urls.dwgSignedUrl = dwgSignedUrl.signedUrl
      console.log(`dwgSignedUrl`.brightRed.bold,dwgSignedUrl)
      downloadDwg()



      let svfSignedUrl= await signSvf()
       urls.svfSignedUrl = svfSignedUrl.signedUrl
      console.log(`svfSignedUrl`.brightRed.bold,svfSignedUrl)
      downloadSvf()




     

      res.json({ token: values.access_token }); 


   } catch (error) {
      console.log("@GET /api/forge/oauth => ereor  :", error);
      res.send("Failed to authenticate" + error);
   }
});

export default router;








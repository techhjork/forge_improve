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
   uploadObject,
   signZip,
   downloadZip,
   downloadPdf,
   signPdf,
   signDwg,
   downloadDwg,
   signSvf,
   downloadSvf,
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
      let intervalId = setInterval(async ()=>{
         if(typeof getWorkIte == "object"){
            if(getWorkIte?.status == "success"){
               clearInterval(intervalId)
               downloadWorkItemReport(getWorkIte.reportUrl)
               return;
            }else if(statusWorkItem.includes(getWorkIte?.status)){
               clearInterval(intervalId)
            }
         }
         getWorkIte = await getWorkItem()
         console.log("getWorkItem() ",getWorkIte) 
      },3000)


      





      // 4
      //@PUT https://developer.api.autodesk.com/oss/v2/buckets/basbrliyiahr1x9eyiai4atpmdcuz5pf_aoutput/objects/MasterDownload.zip
      let a = await uploadObject();
      console.log("5. @PUT {{Autodesk}}/oss/v2/buckets/:bucketKey/objects/:objectKey/signed => Axios /\n\treturn {bucketKey,objectId,location,objectKey}".brightRed.bold);
      console.log(`${JSON.stringify(a)}\n`.green);



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

      // let dwgSignedUrl = await signDwg()
      // downloadDwg()

      // let svfSignedUrl= await signSvf()
      // downloadSvf()

      res.json({ token: values.access_token });
   } catch (error) {
      console.log("@GET /api/forge/oauth => ereor  :", error);
      res.send("Failed to authenticate" + error);
   }
});

export default router;

import httpRequest from "./fetcher.js"
import stream from "./stream.js"
import config from "../config.js"
import querystring from "querystring"
import {fileName,urls,values} from "../utils/values.js"



const {
    alias,
    activityID ,
    inputBucketName ,
    outputBucketName ,
    topAssemblyName,
    uploadZipName ,
    pdfName ,
    zipName ,
    svfName,
    dwfName
} = fileName


const {
    qualifiedName,
    resultPdfUrl ,
    resultZipUrl ,
    resultDwgUrl,
    resultSvfUrl,
    inventorInputSignedUrl,
    pdfSignedUrl,
    ZIPSignedUrl,
    svfSignedUrl,
    dwgSignedUrl,
    workItemReportUrl    
} = urls 

const {access_token,} = values


export const oauth = ()=>httpRequest({
    method: 'POST',
    url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
    },
    data:querystring.stringify({
        client_id: config.credentials.client_id,
        client_secret: config.credentials.client_secret,
        grant_type: 'client_credentials',
        scope: config.scopes.internal
    })
})



/*
    POST - https://developer.api.autodesk.com/oss/v2/buckets/:bucketKey/objects/:objectKey/signed
    This endpoint creates a signed URL that can be used to download an object within the specified expiration time. Be aware that if the 
    object the signed URL points to is deleted or expires before the signed URL expires, then the signed URL will no longer be valid. You 
    can also set the URL to expire after it is used the first time, and you can set read or write access to the URL. A successful call to 
    this endpoint requires bucket owner access.

*/

export const signandworkitemInventor =()=>httpRequest({
    method : 'POST',
    url : 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(inputBucketName) + '/objects/' + encodeURIComponent(uploadZipName)  + '/signed',
    headers : {
        Authorization : 'Bearer ' + values.access_token,
        'content-type' : 'application/json'
    },
    data : {}
})



/*
    @param app.post('/htmlvalues') XML in webGL in ParamJSON
*/
export const createWorkItem = ()=>{
    const text={
    'activityId': urls.qualifiedName,
    'arguments': {
            'InventorDoc': {
                'url': urls.inventorInputSignedUrl, //'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(inputBucketName) + '/objects/' + encodeURIComponent(uploadZipName) + '/' + encodeURIComponent(topAssemblyName),
                'pathInZip': fileName.topAssemblyName
            },
            'InventorParams': {
                'url': values.paramJSON, 
                'OutputPDF': {
                    'url': fileName.resultZipUrl,
                    'headers': {
                        'Authorization': 'Bearer ' + values.access_token,
                        'Content-type': 'application/octet-stream'
                    },
                    'verb': 'put'
                },
                'onComplete': {
                    'verb': 'post',
                    'url': config.credentials.callback_url + '/api/forge/datamanagement/signanddownload'
                }
            }
        }
    }

    console.log("++++++++++++++++++++++\n",text)
    return httpRequest({
        method: 'POST',
        url: 'https://developer.api.autodesk.com/da/us-east/v3/workitems',
        headers: {
            'Authorization': 'Bearer ' + values.access_token,
            'content-type': 'application/json'
        },
        data: JSON.stringify(text)
    })
}



export const getWorkItem = ()=> httpRequest({
    method:"GET",
    url: "https://developer.api.autodesk.com/da/us-east/v3/workitems/" + values.workItemId,
    headers: {
        "Authorization": 'Bearer ' + values.access_token,
        'content-type': 'application/json'
    }
})



export const signing= (resultUrl)=> httpRequest({
    method: 'POST',
    url: resultUrl + '/signed',
    headers: {
        "Authorization": 'Bearer ' + values.access_token,
        'content-type': 'application/json'
    }
})





export const createBucket = ()=> httpRequest({
    url:"https://developer.api.autodesk.com/oss/v2/buckets",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + values.access_token,
    },
    data:{
        "bucketKey":outputBucketName,
        "policyKey":"transient"
    }
})




/*
----------------------------------------------------------
------------------------// Download //--------------------------
----------------------------------------------------------
**Upload Source File to OSS**

Create a Bucket to store the files.
Upload a file to the Bucket.
Obtain the URN of the uploaded file.
Convert the URN to a Base64-encoded URN.

*/




/*
==========// PUT {{AUTODESK}}/buckets/:bucketKey/objects/:objectName  //==========//
create Bucket object
*/

//https://developer.api.autodesk.com/oss/v2/buckets/basbrliyiahr1x9eyiai4atpmdcuz5pf_aoutput/objects/MasterDownload.zip
export const uploadObject = ()=> httpRequest({
    method:"PUT",
    url: `https://developer.api.autodesk.com/oss/v2/buckets/${encodeURIComponent(outputBucketName)}/objects/${encodeURIComponent(zipName)}`,
    headers:{
        Authorization: 'Bearer ' + values.access_token,
        'content-type': 'application/json' 
    }
}) 




//==========/ PDF /=========//
export const signPdf = ()=>httpRequest({
       method: 'POST',
       url: resultPdfUrl + '/signed',
       headers: {
           Authorization: 'Bearer ' + values.access_token,
           'content-type': 'application/json'
       },
       data:{}
})


export const downloadPdf = ()=>stream({
   method: 'GET',
   url: urls.pdfSignedUrl,
   responseType: 'stream'
},fileName.pdfName) 


 

//==========/ ZIP /=========//

export const signZip = ()=>httpRequest({
   method: 'POST',
   url: resultZipUrl + '/signed',
   headers: {
       Authorization: 'Bearer ' + values.access_token,
       'content-type': 'application/json'
   },
   data:{}
})


export const downloadZip = ()=>stream({
    method: 'GET',
    url: urls.ZIPSignedUrl,
    responseType: 'stream',
    headers: {
        "Accept-Encoding": 'gzip, deflate',
    }
},fileName.zipName)






//==========/ DWG /=========//



export const signDwg = ()=>httpRequest({
   method: 'POST',
   url: resultDwgUrl + '/signed',
   headers: {
       Authorization: 'Bearer ' + values.access_token,
       'content-type': 'application/json'
   },
   data:{}
})


export const downloadDwg = ()=>stream({
    method: 'GET',
    url: urls.dwgSignedUrl,
    responseType: 'stream',  
},fileName.dwgName)



//==========/ DWG /=========//



export const signSvf = ()=>httpRequest({
   method: 'POST',
   url: resultSvfUrl + '/signed',
   headers: {
       Authorization: 'Bearer ' + values.access_token,
       'content-type': 'application/json'
   },
   data:{}
})


export const downloadSvf= ()=>stream({
    method: 'GET',
    url: urls.svfSignedUrl,
    responseType: 'stream',  
},fileName.dwgName)





// ============== Report =============//
export const downloadWorkItemReport =(url)=>{
    console.log("+++++++++downloadWorkItemReport",url)
    return stream({
        method: 'GET',
        url,
        responseType: 'stream',  
},"report")}






export const downloadSignedresources = (url)=> stream({
    method:'GET',
    url,
    responseType: 'stream'
},fileName.zipName)









/*
const activityID = 'NamiliftActivity';
const alias = 'prod';
const alias = 'beta';
const qualifiedName = config.credentials.client_id + '.' + activityID + '+' + alias;
const inputBucketName = config.credentials.client_id.toLowerCase() + '_ainput';
const outputBucketName = config.credentials.client_id.toLowerCase() + '_aoutput';
const uploadZipName = 'MasterAssembly.zip';
const pdfName = 'Namilift.pdf'; 
const downloadZipName = 'MasterDownload.zip'; 

const resultPdfUrl = 'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(outputBucketName) + '/objects/' + encodeURIComponent(pdfName);
const resultZipUrl = 'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(outputBucketName) + '/objects/' + encodeURIComponent(downloadZipName);

const inventorInputSignedUrl = '';
var topAssemblyName = 'MasterAssembly.iam';


const text={
    'activityId': urls.qualifiedName,
    'arguments': {
            'InventorDoc': {
                'url': urls.inventorInputSignedUrl, //'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(inputBucketName) + '/objects/' + encodeURIComponent(uploadZipName) + '/' + encodeURIComponent(topAssemblyName),
                // 'pathInZip': fileName.topAssemblyName
            },
            'InventorParams': {
                'url': values.paramJSON, 
                'OutputPDF': {
                    'url': urls.resultPdfUrl,
                    'headers': {
                        'Authorization': 'Bearer ' + values.access_token,
                        'Content-type': 'application/octet-stream'
                    },
                    'verb': 'put'
                },
                // 'OutputSVF': {
                //     'url': urls.resultSvfUrl,
                //     'headers': {
                //         'Authorization': 'Bearer ' + values.access_token,
                //         'Content-type': 'application/octet-stream'
                //     },
                //     'verb': 'put'
                // },
                // 'OutputDWG': {
                //     'url': urls.resultDwgUrl,
                //     'headers': {
                //         'Authorization': 'Bearer ' + values.access_token,
                //         'Content-type': 'application/octet-stream'
                //     },
                //     'verb': 'put'
                // },
                // 'OutputIpt':{
                //     "url": "https://developer.api.autodesk.com/oss/v2/signedresources/2922c578-da22-4a35-a943-6cfeb4484009?region=US",
                //     "headers": {
                //       "Authorization": 'Authorization': 'Bearer ' + values.access_token,
                //       "Content-type": "application/octet-stream"
                //     },
                //     "verb": "put"
                // },
                // "OutputBmp": {
                //     "url": "https://developer.api.autodesk.com/oss/v2/signedresources/a4717873-88db-49c1-9f41-98705a199622?region=US",
                //     "headers": {
                //       "Authorization": "",
                //       "Content-type": "application/octet-stream"
                //     },
                //     "verb": "put"
                // },
                'onComplete': {
                    'verb': 'post',
                    'url': config.credentials.callback_url + '/api/forge/datamanagement/signanddownload'
                }
            }
        }
    }




*/
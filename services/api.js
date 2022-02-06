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
} = fileName


const {
    qualifiedName,
    resultPdfUrl ,
    resultZipUrl ,
    inventorInputSignedUrl,
    pdfSignedUrl,
    ZIPSignedUrl,
} = urls 

const {access_token} = values


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
                    'url': fileName.resultPdfUrl,
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


export const signing= (resultUrl)=> httpRequest({
    method: 'POST',
    url: resultUrl + '/signed',
    headers: {
        Authorization: 'Bearer ' + values.access_token,
        'content-type': 'application/json'
    }
})





/*
------------------------Download--------------------------
*/

// ==========// PUT {{AUTODESK}}/buckets/:bucketKey/objects/:objectName //==========//
//https://developer.api.autodesk.com/oss/v2/buckets/basbrliyiahr1x9eyiai4atpmdcuz5pf_aoutput/objects/MasterDownload.zip
export const uploadObject = ()=> httpRequest({
    method:"PUT",
    url: `https://developer.api.autodesk.com/oss/v2/buckets/${encodeURIComponent(outputBucketName)}/objects/${encodeURIComponent(zipName)}`,
    headers:{
        Authorization: 'Bearer ' + values.access_token,
        'content-type': 'application/json' 
    }
},zipName) 







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

//  response.data.pipe(fs.createWriteStream(pdfPath));
// io.emit('downloadsReady');

 













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


//  ZIPSignedUrl = response.data.signedUrl;
// // downloadPdf();
//  downloadZip();



export const downloadZip = ()=>stream({
    method: 'GET',
    url: urls.ZIPSignedUrl,
    responseType: 'stream'
},fileName.zipName)

// response.data.pipe(fs.createWriteStream(zipPath))
// io.emit('downloadsReady');



























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
*/
import config from "../config.js"



const values = {
	workItemId:"",
	paramJSON:"",
	access_token:""
}


const fileName ={
	alias:'beta',
	activityID : 'NamiliftActivity',	
	inputBucketName :config.credentials.client_id.toLowerCase() + '_ainput',
	outputBucketName :config.credentials.client_id.toLowerCase() + '_aoutput',
	topAssemblyName :'MasterAssembly.iam',
	uploadZipName :'MasterAssembly.zip',
	pdfName :'Namilift.pdf', 
	zipName :'MasterDownload.zip',
	svfName :'MasterDownload.svf', 
	dwgName :'MasterDownload.dwg', 
}

const urls={
	qualifiedName:config.credentials.client_id + '.' + fileName.activityID + '+' + fileName.alias,
	resultPdfUrl :'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(fileName.outputBucketName) + '/objects/' + encodeURIComponent(fileName.pdfName),
	resultZipUrl :'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(fileName.outputBucketName) + '/objects/' + encodeURIComponent(fileName.zipName),
	resultSvfUrl :'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(fileName.outputBucketName) + '/objects/' + encodeURIComponent(fileName.svfName),
	resultDwgUrl :'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(fileName.outputBucketName) + '/objects/' + encodeURIComponent(fileName.dwgName),
	inventorInputSignedUrl:'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(fileName.inputBucketName) + '/objects/' + encodeURIComponent(fileName.uploadZipName),
	pdfSignedUrl:"",
	ZIPSignedUrl:"",
	svfSignedUrl:"",
	dwgSignedUrl:"",
	workItemReportUrl:``
}


const text={
    'activityId':"Inventor.Configuration2019+prod",// urls.qualifiedName,
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

export {fileName,urls,values,text}
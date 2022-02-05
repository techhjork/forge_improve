import config from "../config.js"

const fileName ={
	alias:'beta',
	activityID : 'NamiliftActivity',	
	inputBucketName :config.credentials.client_id.toLowerCase() + '_ainput',
	outputBucketName :config.credentials.client_id.toLowerCase() + '_aoutput',
	topAssemblyName :'MasterAssembly.iam',
	uploadZipName :'MasterAssembly.zip',
	pdfName :'Namilift.pdf', 
	downloadZipName :'MasterDownload.zip', 
}

const urls={
	qualifiedName:config.credentials.client_id + '.' + fileName.activityID + '+' + fileName.alias,
	resultPdfUrl :'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(fileName.outputBucketName) + '/objects/' + encodeURIComponent(fileName.pdfName),
	resultZipUrl :'https://developer.api.autodesk.com/oss/v2/' + "buckets/" + encodeURIComponent(fileName.outputBucketName) + '/objects/' + encodeURIComponent(fileName.downloadZipName),
	inventorInputSignedUrl:"",
	pdfSignedUrl:"",
	ZIPSignedUrl:""
}

const values = {
	paramJSON:"",
	access_token:""
}

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

export {fileName,urls,values,text}
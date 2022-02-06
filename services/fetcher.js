import axios from "axios"


const httpRequest = (req)=>{
	return new Promise(async (resolve,reject)=>{
		try{
			const request =await axios(req) 
			resolve(request.data)
		}catch(error){
			// console.log(error)
			reject(error.response?.data || {})
		}
	})
}

export default httpRequest
import path from 'path'
import fs from "fs"

const downloadFile = async(currentReturnUrl, name, isLast = false)=> {
 
    let path = Path.resolve(__dirname, 'www/Downloads', name);
    let ax = await Axios({
        method: 'GET',
        url: currentReturnUrl,
        responseType: 'stream'
    });
 
    let f = fs.createWriteStream(path);

    if (isLast) {
        f.on('finish', function () {
            unZipSvf();
        });
    }

    console.log("-------- downloadFile() => Axios ",ax.data," => ",f)

    ax.data.pipe(f);
    return true;

}

export default downloadFile
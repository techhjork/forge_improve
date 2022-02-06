import Path from "path"
import fs from "fs"
import Axios from "axios"

const __dirname = Path.resolve()
export default async function stream(req, name){
  console.log(req,name)
  // const path = Path.resolve(Path.join(__dirname,'public/Downloads/'));
  const path = Path.resolve(name);

  const writer = fs.createWriteStream(path);

  return Axios(req).then(response => {
    return new Promise((resolve, reject) => {
      response.data.pipe(writer);
      let error = null;
      writer.on('error', err => {
        error = err;
        writer.close();
        reject(err);
      });
      writer.on('close', () => {
        if (!error) {
          resolve(true);
        }
        //no need to call the reject here, as it will have been called in the
        //'error' stream;
      });
    });
  });
} 



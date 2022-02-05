import express from "express"
import path from "path"
const __dirname = path.resolve();
import config from "./config.js"
import {Server} from "socket.io"
import cors from "cors"
import colors from 'colors'



const app = express()

const port = 3000;
const server = app.listen(port,()=>{
   console.log(`http://localhost:${port}`)
})

const io = new Server(server,{
   cors:"*"
})

app.use(express.static(__dirname + '/public/'));
app.use(express.json({limit:'50mb'}))


io.on('connection', function(socket) {
   console.log("socket connected",socket.id); 
});

app.use((req,res,next)=>{
   if(config.credentials.client_id == null || config.credentials.client_secret == null){
     console.error('Missing FORGE_CLIENT_ID or FORGE_CLIENT_SECRET env. variables.');
      return res.json({msg:"no credential"});
   }

   req.config = config
   next();
})

 

//==================/ ROUTES /===============// 
import oauth from './routes/oauth.js'
import signanddownload from "./routes/signanddownload.js"
import htmlvalues from "./routes/htmlValues.js"

app.use('/htmlvalues', htmlvalues);

app.use('/api/forge/oauth', oauth);

app.use('/api/forge/datamanagement/signanddownload',signanddownload);



// app.use('/api/forge/oss', require('./routes/oss'));
// app.use('/api/forge/modelderivative', require('./routes/modelderivative'));


app.use((err, req, res, next) => {
   res.locals.error = err;
  const status = err.status || 500;
  res.status(status);
  res.send({'error':err});
});




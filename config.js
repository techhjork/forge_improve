
// const config = {
//   // Forge Config parameters
//   credentials: {
//     client_id:"AxKpTedNAliBEA6LWLkvrMtSZBGKsKax",
//     client_secret:"MG4wc5rUKABQu8IH", 
//     callback_url:"https://3746-62-182-223-125.ngrok.io" //http://localhost:3000/api/forge/oauth/callback
//   },

//   scopes: {
//     // Required scopes for your application on server-side
//     // internal: ['data:read','data:write', 'data:create', 'bucket:create', 'bucket:read', 'code:all'],
//     internal: 'data:read data:write data:create bucket:create  bucket:read code:all',
//     // Required scope of the token sent to the client
//     public: ["viewables:read"]
//   },

//   sample: {
//     bucket_key: "-upload-sample",
//     file_path: "sample",
//     file_name: "sample.dwg"
//   }
// };




const config = {
  // Forge Config parameters
  credentials: {
    client_id:"BAsBRLiyiaHR1X9eYiAI4ATPmdcuZ5Pf",
    client_secret:"UcAONkQfhUksy6A4", 
    callback_url:"https://3746-62-182-223-125.ngrok.io" //http://localhost:3000/api/forge/oauth/callback
  },

  scopes: {
    // Required scopes for your application on server-side
    // internal: ['data:read','data:write', 'data:create', 'bucket:create', 'bucket:read', 'code:all'],
    internal: 'data:read data:write data:create bucket:create  bucket:read code:all',
    // Required scope of the token sent to the client
    public: ["viewables:read"]
  },

  sample: {
    bucket_key: "-upload-sample",
    file_path: "sample",
    file_name: "sample.dwg"
  }
};



export default config
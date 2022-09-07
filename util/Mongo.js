const MongoDb=require('mongodb').MongoClient;
const mongo =(callback)=>{MongoDb.connect(`mongodb+srv://ali:alib13@node-cluster.7grq5qe.mongodb.net/?retryWrites=true&w=majority`)
.then((client)=>{
  console.log('connected')
  callback(client)
}).catch((err)=>console.log(err))
}
module.exports=mongo
const express = require('express');
const cookieParser = require('cookie-parser');
const dbConnect = require('./database/index');
const {PORT} = require('./config/index');
const router = require('./routes/index')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors')
// * = commented for hosting purpose

//*  const CorsOptions = {
//     credentials:true,
//     origin:['http://localhost:3000']
//  }


const app = express(); 
//*app.use(cors(CorsOptions))

//for deployment purpose
app.use(
   cors({
origin:function(origin,callback){
return callback(null,true);
},
optionsSuccessStatus:200,
credentials:true,
   })
);


app.use(cookieParser());
app.use(express.json({limit:'50mb'}));
app.use(router);
dbConnect();
// for static availability of images from the server
//* app.use('/storage',express.static('storage'));
app.use(errorHandler);
app.listen(PORT,console.log(`Backend is running on the ${PORT}`))

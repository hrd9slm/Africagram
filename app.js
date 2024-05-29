const express=require("express");
require("dotenv").config();
// const routeUser=require('./routes/UserRoutes');
// const routeAuth=require('./routes/AuthRoutes');
 const routes=require('./routes');

const app=express();
app.use(express.json());

app.use('/api',routes.routeUser);
app.use('/',routes.routAuth);

const port=process.env.APP_PORT 
app.listen(port,()=>{
 console.log(`Server is running on PORT ${port}....`)
})
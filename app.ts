import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
// import cookieParser from 'cookie-parser'             
import authRouter from './routes/authRoutes'
import projectRouter from './routes/projectRoutes'
import notFoundMiddleware from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import { config as dotenvConfig } from 'dotenv';
import 'express-async-errors';

import fileUpload from "express-fileupload"
import {v2} from "cloudinary"

v2.config({ 
  cloud_name: 'dwhufzqgk', 
  api_key: '745926462158864', 
  api_secret: 'opEkQbssbuk7FCLwzn0yDSKT-uA' 
}); 

dotenvConfig();
const app = express()

app.use(helmet())
app.use(cors())

app.use(express.json());
app.use(fileUpload({useTempFiles:true}))


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/project', projectRouter);
  
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware) 

const port = process.env.PORT || 3000;
const start =  () => {
    try {
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };  
  
  start();
 
  
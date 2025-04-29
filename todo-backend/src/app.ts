require('dotenv').config();
import express from 'express';
import taskRoutes from './tasks/task.routes';
import authRoutes from './auth/auth.routes'
import AppDataSource from './configs/data-source';
import cors from 'cors';
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/task",taskRoutes);
app.use('/api/auth',authRoutes);

AppDataSource.initialize()
.then(()=>console.log("Database connected"))
.catch((error)=>console.log("Error during Data Source initialization",error));

app.listen(process.env.PORT,()=>console.log(`Server is running on port ${process.env.PORT}`));
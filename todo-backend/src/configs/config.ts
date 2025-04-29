require('dotenv').config();

interface Config{
    port:number;
    nodeEnv:String
    ACCESS_TOKEN_SECRET:string
}

const config:Config={
    port: Number(process.env.Port) || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'default_secret',
}

export default config;
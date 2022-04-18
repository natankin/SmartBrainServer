import express from "express";
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcrypt-nodejs'
import { handleSignIn } from "./Controlers/SignIn.js";
import { handleRegister } from "./Controlers/Register.js";
import { handleProfile } from "./Controlers/Profile.js";
import { handleImage, handleApiCall} from "./Controlers/image.js";

const db=knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl:true,
    }
  });

const app=express();
app.use(cors());
app.use(express.json())

app.get('/',(req,res)=>{res.send("it is WORKING")})
app.post('/signIn',(req,res)=>{handleSignIn(req,res,db,bcrypt)})
app.post('/register',(req,res)=>{handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{handleProfile(req,res,db)})
app.put('/image',(req,res)=>{handleImage(req,res,db)})
app.post('/imageURL',(req,res)=>{handleApiCall(req,res)})


app.listen(process.env.PORT || 3000);
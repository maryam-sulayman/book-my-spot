const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./models/User')
require('dotenv').config()
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'qwetyuciwdknjqbhdcjnksdwopeW'

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000', 
}));

app.use(express.json()); 
mongoose.connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('test ok');
});

app.post('/sign-up', async (req, res) => {
   const { name, email, password } = req.body;
   try{
    const userDetails = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt)
    })
    res.json(userDetails)
   }
   catch (e) {
    res.status(422).json(e)
   }
});

app.post('/sign-in', async (req, res)=> {
    const {email, password} = req.body
    const userDetails = await User.findOne({email})
    if (userDetails) {
       const passOk = bcrypt.compareSync(password, userDetails.password)
       if(passOk){
        jwt.sign({
            email: userDetails.email,
            id: userDetails._id},
            jwtSecret,
            {},
            (error, token) => {
                if (error) {
                    throw error
                }
                else {
                res.cookie('token', token).json('password matches')
                }
        })
     
       } else {
        res.status(422).json('password does not match')
       }
    }
    else {
        res.json('not found')
    }
})

app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000');
});

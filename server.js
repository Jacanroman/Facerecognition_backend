const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image')

    
const db = knex({
    client:'pg',
    connection:{
        host:'127.0.0.1',
        user:"javi",
        password:'Libertad1',
        database: 'smart'
    }
})


const app = express();

app.use(bodyParser.json());
app.use(cors());


// BCRYPT
const bcrypt = require('bcrypt');
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
//const someOtherPlaintextPassword = 'veggies';


//
app.get('/',(req,res)=>{
    res.send('it is working!')
})


/* IDEAS ABOUT THE API

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/


// SIGNIN ENDPOINT
/*
const database = {
    users:[
        {
            id:'123',
            name:'John',
            email:'john@gmail.com',
            password:'1',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'Sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined: new Date()
        }
    ]
}
*/


app.post('/signin',(req,res)=>{ signin.handleSignin(req,res, db,bcrypt)})

//REGISTER ENDPOINT

app.post('/register', (req, res) =>{register.handleRegister(req, res, db, bcrypt, saltRounds)});


//USER ENDPOINT

app.get('/profile/:id', (req, res)=>{msWriteProfilerMark.handleProfileGet(req, res, db)});

//IMAGE counter ENDPOINT 

app.put("/image", (req, res)=>{image.handleImage(req,res, db)})


app.listen(process.env.PORT || 3010,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
})
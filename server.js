const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const knex = require ('knex');

const app = express();

let initialPath = path.join(__dirname, "Foodyver");

app.use(bodyParser.json());
app.use(express.static(initialPath));

app.get('/', (req,res)=>{
    res.sendFile(path.join(initialPath, "index.html"));
})
app.get('/login', (req,res)=>{
    res.sendFile(path.join(initialPath, "login.html"));
})
app.get('/Sign Up', (req,res)=>{
    res.sendFile(path.join(initialPath, "signup.html"));
})
app.post('/register-user',(req,res)=>{
    const{name,email,password} = req.body;

    if(!name.length || !email.length || !password.length){
        res.json('fill all the fields');
    } else {
        db("loginformyvideo"),insert({
            name: name,
            email: email,
            password : password
        })
        .returning(["name","email"])
        .then(data=>{
            res.json(data[0])
        })
        .catch(err=>{
            if(err.detail.includes('already exists')){
                res.json('email already exists');
            }
        })
    }
})

app.post('/login-user'),(req,res)=>{
    const {email, password} = req.body;

    db.select('name', 'email')
    .from('users')
    .where({
        email: email,
        password: password
    })
    .then(data =>{
        if(data.length){
            res.json(data[0]);
        }else{
            res.json('Email or password is incorrect');
        }
    })
}

app.listen(3000, (req,res)=>{
    console.log('Dev opened the server on port 3000....')
})
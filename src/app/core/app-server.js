const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var mysql = require('mysql');
const { stringify } = require('querystring');

const app = express();
const router = express.Router();
const port = 3000;

let userId = 0;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: '',
    database: 'szachy'
})


db.connect(err => {
    if(err) throw err;
    console.log('connectedToDatabase')
})


app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM appuser'
    const respone = res;
    const request = req.body;

    db.query(sql, (err, res) => {
        if(err) throw err

        const data = {
            id: 1,
            name: ``
        }

        res.forEach(element => {
           if(element.name == request.name && element.password == request.password ){
                data.id = element.id;
                data.name = `${element.name}`;
            } 
        });
        
        respone.send(data)
        userId = data.id;
    })

})


app.post('/register', async (req, res, next) => {
    const response = res;
    const name = req.body.name;
    const password = req.body.password;
    let id;

    const getIdSql = `SELECT * FROM appuser ORDER BY id DESC LIMIT 1;`

    db.query(getIdSql, async (err, res) => {
        if(err) next(err);
        else {
            id = res[0].id; 
        }
    })

    const sql = `INSERT INTO appuser(name, password) Values('${name}','${password}')`

    db.query(sql, (err ,res) => {
        if(err) next(err);
        else response.send('');
    })

    const timeOut = setTimeout( async () => {
        const secondSql = `INSERT INTO lessondata(userId) Values(${id + 1})`;

        db.query(secondSql, (err, res) => {
            if(err) next(err);
        }, 100)
    })
})


app.get('/getData', (req, response, next) => {
    const id = userId;
    const sql = `SELECT * FROM lessondata WHERE userId = ${id}`; 

    db.query(sql, async (err, res) => {
        if(err) next(err);
        else {
            response.send(res);          
        }
    })
})


app.post('/postData', (req, res, next) => {
    res.send('postData')
})




app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})
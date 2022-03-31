const express = require('express');
const mysql = require('mySQL');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
let userId = 0;

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'chessgrow'
})

db.connect(err => {
    if(err) throw err
    console.log('connected to database')
})

app.listen('3000', () => {
    console.log("bruh moment epic fail family guy compilation")
})

app.get('/getrankings', (req, res) =>{
    let sql = "SELECT * from rankings ORDER BY score desc";
    db.query(sql, (err, result) =>{
        if(err) throw err;
        res.send(result);
    })
})

app.post('/rankings', (req, res) =>{
    db.query(`SELECT score from rankings WHERE nick = '${req.body.nick}' ORDER BY score desc LIMIT 1`, (err, result) => {
        if(err) throw err;
        if(result[0] || result[0].score < req.body.score)
        {
            db.query(`DELETE from rankings WHERE nick = '${req.body.nick}'`)
            let sql = `INSERT INTO rankings(nick, score) VALUES('${req.body.nick}', ${req.body.score})`;
            db.query(sql, (err) =>{
                if(err) throw err;
            })
        }
    })
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

    const sql = `INSERT INTO appuser(name, password) Values('${name}','${password}')`

    db.query(sql, (err ,res) => {
        if(err) next(err);
        else response.send('');
    })

    const getIdSql = `SELECT * FROM appuser ORDER BY id DESC LIMIT 1;`

    db.query(getIdSql, async (err, res) => {
        if(err) next(err);
        else {
            id = res[0].id; 
            const secondSql = `INSERT INTO lessondata(userId) Values(${id})`;

            db.query(secondSql, (err, res) => {
                if(err) next(err);
            })
        }
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
const express = require('express');
const mysql = require('mySQL');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
let userId = 0;

const serverCheppe = {
    host: "192.168.0.164",
    user: 'maslak',
    password: 'haslo',
    database: 'chessgrow'
}

const serverMaslaka = {
    host: "localhost",
    user: 'root',
    password: '',
    database: 'szachy'
}


app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
const db = mysql.createConnection(serverMaslaka)


db.connect(err => {
    if(err) throw err
    console.log('connected to database')
})

app.listen('3000', () => {
    console.log("bruh moment, epic fail russian tanks stolen by gypsies compilation")
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
            let sql = `INSERT INTO rankings(nick, score) VALUES('${req.body.nick}', ${req.body.score}, ${req.body.wrong}, ${req.body.completed}, ${req.body.highscore})`;
            db.query(sql, (err) =>{
                if(err) throw err;
            })
        }
    })
})
app.post('/login', (req, response) => {
    const sql = 'SELECT * FROM appuser'
    const request = req.body;

    db.query(sql, (err, result) => {
        if(err) throw err

        const data = {
            id: 1,
            name: ``
        }
        let notFound = true;
        result.forEach(element => {
           if(element.name == request.name && element.password == request.password ){
                data.id = element.id;
                data.name = `${element.name}`;

                notFound = false;
            } 
        });
        if(!notFound) {
            const id = data.id
            const sql = `SELECT * FROM lessondata WHERE userId = ${id}`; 

            db.query(sql, async (err, res) => {
                if(err) throw (err)
                else {
                    const finalData = [{res}, {data}]

                    response.send(finalData);          
                }
            })

        } else {
            response.send({name: "user not found"})
        }
        
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


app.post('/sendDataToServer', async (req, res) => {
    const chessLesson = req.body[0].lessonData.chessLessonsDone
    const id = req.body[1].id

    const sql1 = `UPDATE lessondata SET lessonsDone = ${chessLesson} WHERE userId = ${id}`
    db.query(sql1, async(err, result) => {
        if(err) next(err)
    })

    //sql2 = ''
})
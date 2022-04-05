//"Jakis_sekretnyKLUCZ"

require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const apiRouter = require('./apiRouter');



const app = express();


const PORT = process.env.PORT


app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
apiRouter.use(cookieParser())

app.use('/apiRouter', apiRouter)



app.listen(PORT, () => {
    console.log(`bruh moment, epic fail russian tanks stolen by gypsies compilation, ${PORT}`)
})



module.exports = app












// app.get('/getrankings', (req, res) =>{
//     let sql = "SELECT * from rankings ORDER BY score desc";
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         res.send(result);
//     })
// })

// app.post('/rankings', (req, res) =>{
//     db.query(`SELECT * from eater WHERE playerId = ${req.body.playerId}`, (err, result) => {
//         if(err) throw err;
//         if(result.length)
//         {
//             db.query(
//                 `UPDATE eater SET completed = ${req.body.completed + result[0].completed},
//                 selected = ${req.body.score + result[0].selected},
//                 highscore = ${req.body.highscore},
//                 mistakes = ${req.body.mistakes + result[0].mistakes}
//                 WHERE playerId = ${req.body.playerId}`, (err) =>{
//                 if(err) throw err;
//             })
//         }
//         else
//         {
//             db.query(
//                 `INSERT INTO eater(playerId, completed, selected, highscore, mistakes) 
//                 VALUES(${req.body.playerId}, ${req.body.completed}, ${req.body.score}, ${req.body.highscore}, ${req.body.mistakes})`, (err) =>{
//                 if(err) throw err;
//             })
//         }
//     })

//     db.query(`SELECT score from rankings WHERE nick = (SELECT name from appuser WHERE id = ${req.body.playerId}) ORDER BY score desc LIMIT 1`, (err, result) => {
//         if(err) throw err;
//         if(!result[0])
//         {
//             let sql = `INSERT INTO rankings(nick, score) VALUES((SELECT name from appuser WHERE id = ${req.body.playerId}), ${req.body.score})`;
//             db.query(sql, (err) =>{
//                 if(err) throw err;
//             })
//         }
//         if(result[0] && result[0].score < req.body.score)
//         {
//             db.query(`UPDATE rankings SET score = ${req.body.score} WHERE nick = (SELECT name from appuser WHERE id = ${req.body.playerId})`, (err) =>{
//                 if(err) throw err;
//             })
//         }
//     })
// })
// app.post('/login', (req, response) => {
//     const sql = 'SELECT * FROM appuser'
//     const request = req.body;

//     db.query(sql, (err, result) => {
//         if(err) throw err

//         const data = {
//             id: 1,
//             name: ``
//         }
//         let notFound = true;
//         result.forEach(element => {
//            if(element.name == request.name && element.password == request.password ){
//                 data.id = element.id;
//                 data.name = `${element.name}`;

//                 notFound = false;
//             } 
//         });
//         if(!notFound) {
//             const id = data.id
//             const sql = `SELECT * FROM lessondata WHERE userId = ${id}`; 

//             db.query(sql, async (err, res) => {
//                 if(err) throw (err)
//                 else {
//                     const finalData = [{res}, {data}]

//                     response.send(finalData);          
//                 }
//             })

//         } else {
//             response.send({name: "user not found"})
//         }
        
//     })
// })


// app.post('/register', async (req, res, next) => {
//     const response = res;
//     const name = req.body.name;
//     const password = req.body.password;
//     let id;

//     const sql = `INSERT INTO appuser(name, password) Values('${name}','${password}')`

//     db.query(sql, (err ,res) => {
//         if(err) next(err);
//         else response.send('');
//     })

//     const getIdSql = `SELECT * FROM appuser ORDER BY id DESC LIMIT 1;`

//     db.query(getIdSql, async (err, res) => {
//         if(err) next(err);
//         else {
//             id = res[0].id; 
//             const secondSql = `INSERT INTO lessondata(userId) Values(${id})`;

//             db.query(secondSql, (err, res) => {
//                 if(err) next(err);
//             })
//         }
//     })
// })


// app.post('/sendDataToServer', async (req, res) => {
//     const chessLesson = req.body[0].lessonData.chessLessonsDone
//     const id = req.body[1].id

//     const sql1 = `UPDATE lessondata SET lessonsDone = ${chessLesson} WHERE userId = ${id}`
//     db.query(sql1, async(err, result) => {
//         if(err) next(err)
//     })

//     //sql2 = ''
// })

// app.get('/geteater/:playerid', (req, res) =>{
//     let sql = `SELECT * from eater WHERE playerId = ${req.params.playerid}`;
//     db.query(sql, (err, result) =>{
//         if(err) throw err;
//         if(!result.length)
//         {
//             db.query(`INSERT INTO eater(playerId, completed, selected, highscore, mistakes) 
//             VALUES(${req.params.playerid}, 0, 0, 0, 0)`, (err) => {if(err) throw err;})
//             db.query(`SELECT * from eater WHERE playerId = '${req.params.playerid}'`, (err, result2) =>{
//                 if(err) throw err;
//                 res.send(result2);
//             })
//         }
//         else res.send(result);
//     })
// })
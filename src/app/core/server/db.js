require('dotenv').config()
const { resolve } = require('dns')
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    port: process.env.DB_PORT
})


let db = {}


db.allUser = () => {
    return new Promise( (resolve, reject) => {
        const sql = "SELECT * FROM appuser"

        connection.query(sql, async (err, res) => {
            if(err) return reject(err)

            return resolve(res)
        })
    }) 
}


db.getUserByName = (name) => {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT * FROM appuser WHERE name = '${name}'`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}

db.getUserById = (id) => {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT * FROM appuser WHERE id = ${id}`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}


db.insertUser = (name, password) => {
    return new Promise( (resolve, reject) => {
        const sql = `INSERT INTO appuser(name, password) VALUES('${name}', '${password}')`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}


db.updateUser = (id, role, name, password) => {
    return new Promise( (resolve, reject) => {
        const sql = `UPDATE appuser SET id=${id}, role='${role}', name='${name}', password='${password}' WHERE id=${id}`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}


db.deleteUser = (id) => {
    return new Promise( (resolve, reject) => {
        const sql = `DELETE FROM appuser WHERE id=${id}`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}


db.createLessonData = (id) => {
    return new Promise( (resolve, reject) => {
        const sql = `INSERT INTO lessondata(userId) VALUES(${id})`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}


db.getLessonData = (id) => {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT * FROM lessondata WHERE userId=${id}`

        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}



db.getRankings = () => {
    return new Promise( (resolve, reject) => {
        const sql = "SELECT * from rankings ORDER BY score desc";
        
        connection.query(sql, async (err, res) => {
            if (err) return reject(err)

            return resolve(res)
        })
    })
}


db.setRankings = (req) => {
    return new Promise( (resolve, reject) => {
        const sql1 = `SELECT * from eater WHERE playerId = ${req.body.playerId}` 

        connection.query(sql1, (err, result) => {
            if(err) return reject(err);

            if(result.length)
            {
                const sql2 = 
                `UPDATE eater SET completed = ${req.body.completed + result[0].completed},
                selected = ${req.body.score + result[0].selected},
                highscore = ${req.body.highscore},
                mistakes = ${req.body.mistakes + result[0].mistakes}
                WHERE playerId = ${req.body.playerId}`


                connection.query(sql2, (err) =>{
                    if(err) return reject(err);
                })
            }
            else
            {
                const sql3 = 
                `INSERT INTO eater(playerId, completed, selected, highscore, mistakes) 
                    VALUES(${req.body.playerId}, ${req.body.completed}, ${req.body.score},
                         ${req.body.highscore}, ${req.body.mistakes})`

                db.query(sql3, (err) =>{
                    if(err) return reject(err);
                })
            }
        })

        const sql4 = `SELECT score from rankings WHERE nick = 
        (SELECT name from appuser WHERE id = ${req.body.playerId}) ORDER BY score desc LIMIT 1`
    

        connection.query(sql4, (err, result) => {
            if(err) return reject(err);

            if(!result[0])
            {
                const sql = `INSERT INTO rankings(nick, score) VALUES
                ((SELECT name from appuser WHERE id = ${req.body.playerId}),
                 ${req.body.score})`;


                db.query(sql, (err) =>{
                    if(err) return reject(err);
                })
            }
            if(result[0] && result[0].score < req.body.score)
            {
                const sql = `UPDATE rankings SET score = ${req.body.score}
                 WHERE nick = (SELECT name from appuser WHERE id = ${req.body.playerId})`

                db.query(sql, (err) =>{
                    if(err) return reject(err);
                })
            }
        })
    })
}

db.sendDataToServer = (req) => {
    return new Promise( (resolve, reject) => {
        const chessLesson = req.body[0].lessonData.chessLessonsDone
        const id = req.body[1].id

        const sql = `UPDATE lessondata SET lessonsDone = ${chessLesson} WHERE userId = ${id}`

        db.query(sql, async(err, result) => {
            if(err) return reject(err)
        })
    })
}


db.getEater = (req) => {
    return new Promise( (resolve, reject) => {
        const sql = `SELECT * from eater WHERE playerId = ${req.params.playerid}`;
    
        db.query(sql, (err, result) =>{
            if(err) return reject(err);

            if(!result.length)
            {
                const sql1 = `INSERT INTO eater(playerId, completed, selected, highscore, mistakes) 
                VALUES(${req.params.playerid}, 0, 0, 0, 0)`
                
                
                db.query(sql1, (err) => {
                    if(err) return reject(err);
                })

                const sql2 = `SELECT * from eater WHERE playerId = '${req.params.playerid}'`

                db.query(sql2, (err, result2) =>{
                    if(err) throw err;
                    
                    return resolve(result2);
                })
            }
            else return resolve(result);
        })
    })
}

module.exports = db
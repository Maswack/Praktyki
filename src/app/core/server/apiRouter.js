const express = require('express')
const apiRouter = express.Router()
const userRouter = require('./user')

const { hashSync, compareSync, genSaltSync, genSalt } = require("bcrypt");
const cookieParser = require('cookie-parser')
const jsonwebtoken = require('jsonwebtoken')
const db = require('./db');



apiRouter.use(cookieParser())



apiRouter.post('/register', async (req, res, next) => {
    try {
        const name = req.body.name
        let password = req.body.password

            if( !name || !password) {
                res.sendStatus(400)
            }

            const salt = await genSaltSync(10)
            password = hashSync(password, salt)


        const user = await db.insertUser(name, password)
        const jsonToken = jsonwebtoken.sign({user:user}, process.env.SECRET_KEY, {expiresIn:'30m'})

        await db.createLessonData(user.insertId)

        res.cookie('token', jsonToken, {httpOnly: true, secure: false, sameSite: 'strict', 
            expires: new Date(Date.now() + 30 * 60 * 1000)})
    }
    catch(e) {
        console.log(e)
        res.sendStatus(400)
    }
})


apiRouter.post('/login', async (req, res, next) => {
    try {
        const name = req.body.name
        const password = req.body.password
        
        const user = (await db.getUserByName(name))[0]


        if(!user) {
            return res.send(
                "Invalid Name or Pasword"
            )
        }

        const isValidPassword = compareSync(password, user.password)
        if(isValidPassword) {
            user.password = undefined

            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            const lessonData = await db.getLessonData(user.id)
        
            const jsonToken = jsonwebtoken.sign({user:user}, process.env.SECRET_KEY, {expiresIn: '30m'})
            res.cookie('token', jsonToken, {httpOnly:false, secure:true, sameSite:'strict', 
                expires: new Date(Number(new Date()) + 30 * 60 * 1000)
            }).
            json([user, lessonData])

            //res.header('Access-Control-Allow-Origin', 'http://localhost:3000/');
            
        }
    } 
    catch (e) {
        console.log(e)
        res.sendStatus(400)
    }
})



async function verifyToken (req, res, next) {
    const token = req.cookies.token

    if(token === undefined) {

        return res.json({message: "Acces Denied! Unauthorized User"})
    }
    else {
        jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, authData) => {
            if(err) {
                res.json({
                    message: "Invalid Token..."
                })
            }
            else {
                const role = authData.user.role;

                if(role === "admin" || role === "user") {
                    next()
                }
                else {
                    return res.json({message: "Acces Denied! You are not an Admin!"})
                }
            }
        })
    }
}


apiRouter.use('/user', verifyToken, userRouter)


module.exports = apiRouter
const express = require('express')
const db = require('./db')
const userRouter = express.Router();

const { hashSync, genSaltSync, compareSync } = require('bcrypt')



module.exports = userRouter


userRouter.get('/getrankings', async (req, res) =>{
    const rankings = await db.getRankings()

    res.json(rankings)
})

userRouter.post('/setrankings', async (req, res) =>{
    const setAllRankings = await db.setRankings(req)

    res.json(setAllRankings)
})

userRouter.post('/sendDataToServer', async (req, res) => {
    const sendresult = await db.sendDataToServer(req)

    //sql2 = ''
})

userRouter.get('/geteater/:playerid', async (req, res) =>{
    const eaterResult = await db.getEater(req)

    res.send(eaterResult)
})
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')

const app = express()
const PORT = 4400

const router = require('./routes/index')

app.use(express.urlencoded({extended : true}))

app.use(router)

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`)
})
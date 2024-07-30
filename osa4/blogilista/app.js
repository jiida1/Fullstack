const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config=require('./utils/config')
const logger=require('./utils/logger')
const middleware=require('./utils/middleware')
const blogsRouter=require('./käsittelijät/blogs')

const app=express()

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI).then(()=>{logger.info('Yhteys MongoDB')})
.catch(error=>{logger.error('Error yhteydessä MongoDB:',error.message)})


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs',blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app










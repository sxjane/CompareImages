const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const util = require('util')
const { createProxyMiddleware } = require('http-proxy-middleware')

const app = express()
const port = 3000
const indexFile = path.join(__dirname, '../build/index.html')
const PUBLIC_DIR = path.join(__dirname, '../build')
const imageFilePath = path.join(__dirname, '../images/grapefruit.jpg')

app.use(morgan('dev'))
app.use(express.static(PUBLIC_DIR))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/next', createProxyMiddleware({ target: 'http://192.168.178.41:5000', changeOrigin: true }))
app.use('/result/:id1/:id2/:result', createProxyMiddleware({ target: 'http://192.168.178.41:5000', changeOrigin: true }))

app.get('/', (req, res) => {
    res.sendFile(indexFile)
})

app.get('/images', (req, res)=>{
    res.sendFile(imageFilePath, (err)=>{
        if(err){
            console.log('failed transfering the file')
        }else{
            console.log('successed transfering the file')
        }
    })
})

app.get('/base64_data', (req,res)=>{
    const data = fs.readFileSync(imageFilePath)
    const base64_data = Buffer.from(data).toString('base64')
    const twoImgs = {
        first:base64_data,
        second:base64_data
    }
    res.send(twoImgs)
}) 

app.post('/result/:id1/:id2/:result', (req, res)=>{
    console.log(req.params)
    res.send('OK')
})

app.post('/result', (req,res)=>{
    console.log('result')
    res.send('ok')
})

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})





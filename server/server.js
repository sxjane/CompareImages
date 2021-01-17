const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const util = require('util')

const app = express()
const port = 3000
const indexFile = path.join(__dirname, '../build/index.html')
const PUBLIC_DIR = path.join(__dirname, '../build')
const imageFilePath = path.join(__dirname, '../images/grapefruit.jpg')

app.use(morgan('dev'))
app.use(express.static(PUBLIC_DIR))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.sendFile(indexFile)
})

app.get('/get_images', (req, res)=>{

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
    const base64_obj = {
        img:base64_data
    }
    res.send(base64_obj)
}) 

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})





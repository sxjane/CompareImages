const express = require('express')
const path = require('path')
const morgan = require('morgan')
const fs = require('fs')
const util = require('util')

const app = express()
const port = 3000
const indexFile = path.join(__dirname, '../build/index.html')
const PUBLIC_DIR = path.join(__dirname, '../build')
const jsonFile = path.join(__dirname, '/data.json')

app.use(morgan('dev'))
app.use(express.static(PUBLIC_DIR))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/', (req, res) => {
    res.sendFile(indexFile)
})

app.post('/test-page', (req, res) =>{
    var name = req.body.name
    var color = req.body.color
    var params = req.params
    res.send('hello ' + name + ', hello ' + color + '!\n')
    console.log('test-page:',params)
})

app.get('/products', (req, res)=>{
    fs.readFile(jsonFile, (err,data)=>{
        if(err) throw err
        let obj = JSON.parse(data)
        res.send(obj)
    })
})

app.listen(port, ()=>{
    console.log(`App listening at http://localhost:${port}`)
})
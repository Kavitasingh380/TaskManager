const express = require('express')
const mongoose = require('mongoose')
const userRouter = require('./router/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true

})

const app = express()

const port = process.env.PORT || 8180
app.use((req,res,next)=>{
    console.log(req.method,req.path)
    next()

})
app.use(express.json())
app.use(userRouter)
app.listen(port, () => {
    console.log("Server is on port " + port)

})

const myFunction = async ()=>{
    // const password = "Red12345!"
    // const hashedPassword = await bcrypt.hash(password,8)
    // console.log(password)
    // console.log(hashedPassword)
    // const isMatch = await bcrypt.compare('red73687',hashedPassword)
    // console.log(isMatch)

const token = jwt.sign({_id:'abc123'},'password',{expiresIn:'7 days'})
console.log(token)
let data = jwt.verify(token,'password')
console.log(data)
// var key = "mykey";
// var mydata = "some long text here";
// var output = '';

// for (var i = 0, len = mydata.length; i < len; i++) {
//    output += String.fromCharCode(mydata.charCodeAt(i) ^ key.charCodeAt(i % key.length));
// }
// console.log(output)

}

myFunction()

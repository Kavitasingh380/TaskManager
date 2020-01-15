
const {MongoClient,ObjectID } = require("mongodb")

const id = new ObjectID()

// console.log(id)
// console.log(id.getTimestamp())
// console.log(id.toHexString().length)    

const connectionURL = "mongodb://127.0.0.1:27017"

const databaseName = "task-manager"

MongoClient.connect(connectionURL,{"userNewUrlParser":true},(error,client)=>{

if(error)
{
    return console.log('Unable to connect to database !')
}
const db  = client.db(databaseName)
//Insert One

// db.collection('users').insertOne({
//     "name":"Andrew",
//     "age":27
// },(error,result)=>{
//     if(error){
//         return console.log('Unable to insert user')

//     }
//     console.log(result.ops)

// })
//Insert Many
// db.collection('users').insertMany([{

//     "name":"Andrew",
//     "age":27

// },{
//     "name":"mary",
//     "age":27
// }],(error,result)=>{
//     if(error){
//         return console.log('Unable to insert user')

//     }
//     console.log(result.ops)

// })

//FInd (get All)
// db.collection('users').find({"age":27}).toArray((error,user)=>{
//     if(error){
//         return console.log("Unable to fetch")
//     }
//   console.log(user)



// })

// db.collection('users').find({'age':27}).count((error,count)=>{
//     if(error){
//         return console.log("Unable to fetch")
//     }

//     console.log(count)

// })

//update one

//  db.collection('users').updateOne({
//     '_id':new ObjectID("5dc7dd79c1468516bb6556a4")
// },{
//     '$set':{
//         name:'mike'
//     }
// }
// ).then((result)=>{
//    console.log(result)
// }).catch((error)=>{
//   console.log(error)
// })


//updateMany

//  db.collection('users').updateMany({
//    age:27
// },{
//     '$set':{
//         age:30
//     }
// }
// ).then((result)=>{
//    console.log(result)
// }).catch((error)=>{
//   console.log(error)
// })

//Deleting one
// db.collection('users').deleteOne({
//     age:30

// }).then((result)=>{
//     console.log(result)
// }).catch((error)=>{
// console.log(error)
// })

//delete Many
db.collection('users').deleteMany({
    age:30

}).then((result)=>{
    console.log(result)
}).catch((error)=>{
console.log(error)
})

})
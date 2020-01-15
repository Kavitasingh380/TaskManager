    const mongoose = require('mongoose')

const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify:false

})

const user = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    },
       password :{
        type:String,
        required:true,
        minLength:7,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot contain "Passward"')
            }
        }
       },
       completed:{
           type:Boolean,
           default :false

       }


})
const me = new user({
    name: "Manoj",
    age: "29",
    password:"768rgtrgt7"
})
me.save().then(() => {
    console.log(me)

}).catch((error) => {
    console.log("Error!", error)
})

// const task = mongoose.model('Task', {
//     description: {
//         type: String
//     },
//     completed: {
//         type: Boolean
//     }
// })

// const tasks = new task({
//     description: "Learn the mongoose library",
//     completed: false
// })

// tasks.save().then(() => {
//     console.log(tasks)

// }).catch((error) => {
//     console.log("Error!", error)
// })


// var breakfastSchema = new mongoose.Schema({
//     eggs: {
//         type: Number,
//         min: [6, 'Too few eggs'],
//         max: 12
//     },
//     bacon: {
//         type: Number,
//         required: [true, 'Why no bacon?']
//     },
//     drink: {
//         type: String,
//         enum: ['Coffee', 'Tea'],
//         required: function () {
//             return this.bacon > 3;
//         }
//     },
//     email:{
//         type:String,
//         required:true,
//         validate(value){
//             if(validator.isEmail(value)){
//                 throw new Error('Email is Invalid')
//             }

//         }
//     }
// });

// var Breakfast = mongoose.model('Breakfast', breakfastSchema);

// var badBreakfast = new Breakfast({
//     eggs: 2,
//     bacon: 0,
//     drink: 'Milk',
//     email:'kjdhfj,mdjfnk'
// });
// var error = badBreakfast.validateSync();
// assert.equal(error.errors['eggs'].message,
//     'Too few eggs');
// assert.ok(!error.errors['bacon']);
// assert.equal(error.errors['drink'].message,
//     '`Milk` is not a valid enum value for path `drink`.');

// badBreakfast.bacon = 5;
// badBreakfast.drink = null;

// error = badBreakfast.validateSync();
// assert.equal(error.errors['drink'].message, 'Path `drink` is required.');

// badBreakfast.bacon = null;
// error = badBreakfast.validateSync();
// assert.equal(error.errors['bacon'].message, 'Why no bacon?');
const mongoose = require('mongoose')

const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is valid')

            }
        }

    },

    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Password cannot contain "Password"')
            }
        }
    },
    tokens:[{
        token:{
             type:String,
             required:true

        }
    }]


})
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ '_id': user._id.toString() ,'name':user.name,'email':user.email,'password':user.password}, "hello")
    user.tokens = user.tokens.concat({token}) 
   await user.save()
    console.log(token)
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    console.log("aaaaaaaaaaaaaaaaaaaaa")
    if (!user) {
        console.log("cccccccccccccccccccccccccccccccc")
        throw new Error('Unable to login ,user not found')
    } else {
        console.log("bbbbbbbbbbbbbbbbbbbb")
        const isMatch = await bcrypt.compare(password, user.password)
        console.log(isMatch)
        if (!isMatch) {
            console.log("kkkkkkkkkkkkkkk")
            throw new Error("Unable to login,Password not found")
        }
           
        console.log(user)
        return user
    }

}



userSchema.pre('save', async function (next) {
    const user = this
    console.log("just before saving")
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()

})


// userSchema.post('save',async function (next) {
//     const user = this
//     console.log("just after saving")
//     next()

// })   
const User = mongoose.model('users', userSchema)
module.exports = User
const express = require('express')
const router = new express.Router()
const User = require('../model/user')
const auth = require('../middleware/auth')

router.post('/user', (req, res) => {


    const data = new User(req.body)
    console.log(data)
    data.save().then(() => {
        let responsePayload = {
            "status": 2000,
            "data": {
                "message": "Request Completed Successfully",
                "resource": data
            }

        }
        res.send(responsePayload)
        console.log("vrvvrvr")
    }).catch((e) => {
        let errorpayload = {
            "status": 4000,
            "data": {
                message: e.message
            }
        }
        res.send(errorpayload)
        console.log("Test")
    })
    // console.log(req.body)
    // res.send('testing!!')
})
router.get("/get/users",auth,async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    }
    catch (e) {

        res.status(500).send(e)
    }

})
router.post("/user/login", async (req, res) => {
    try {

        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        //   res.send(user)
        console.log(token)
        res.send({ user, token })

    } catch (e) {
        res.status(404).send()
    }
})
router.post("/user/logout", async (req, res) => {
    try {
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token !==req.token
    })  
     await req.user.save()
     res.send()

    } catch (e) { 
        res.status(500).send()
    }
})
router.get("/get/usersById/:id", (req, res) => {
    const _id = req.params.id
    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch((e) => {
        res.status(500).send()
    })

})


router.patch("/users/:id", async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ["name", "email", "password", "age"]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({
            'error': 'invalid updates'
        })

    }
    try {
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            return res.status(404).send(user)
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)

    }

})

router.delete("/users/delete/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)

    } catch (e) {
        res.status(500).send(e)

    }
})


module.exports = router
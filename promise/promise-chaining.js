require('../src/db/mongoose')
const User = require('../src/model/user')

User.findByIdAndUpdate('5ddf6035863083143aa1d0b7',{password:"7657ghfwhgfhf"}).then((user)=>{
 console.log(user)
 return User.countDocuments({password:"7657ghfwhgfhf"})
}).then((result)=>{
       console.log(result)
}).catch((e)=>{
  console.log(e)
})


User.findByIdAndDelete('5ddf6035863083143aa1d0b7',{password:"7657ghfwhgfhf"}).then((user)=>{
 console.log(user)
 return User.countDocuments({password:"7657ghfwhgfhf"})
}).then((result)=>{
       console.log(result)
}).catch((e)=>{
  console.log(e)
})


const updateAgeAndCount = async(id,age)=>{
  const user = await User.findByIdAndUpdate(id,{age})
  const count = await User.countDocuments({age})
  return count
}
updateAgeAndCount("5ddf6035863083143aa1d0b7",2).then((count)=>{

  console.log(count)
}).catch((e)=>{
  console.log(e)
})
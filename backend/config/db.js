const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
//Connecting to Mongoose Database
const MOGO_DB_URL =
  'mongodb+srv://drbenzene:Ayomideh1.@cluster0.unxwkon.mongodb.net/?retryWrites=true&w=majority'

const db = async () => {
  try {
    const conn = await mongoose.connect(MOGO_DB_URL, {
      useNewUrlParser: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.error(`Error: ${error.message} from Database`.red.underline.bold)
  }
}

module.exports = db

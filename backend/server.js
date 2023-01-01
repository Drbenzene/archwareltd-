const express = require('express')
const db = require('./config/db.js')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const Colors = require('colors')
const campaignRoutes = require('./routes/campaignRoutes.js')

const app = express()

app.use(morgan('dev'))

const corsOption = {
  origin: '*',
}
app.use(cors(corsOption))
app.use(express.json({ limit: '40mb' }))
app.use(express.urlencoded({ limit: '40mb', extended: true }))

//USING THE SERVER ROUTES
app.use('/api/campaign', campaignRoutes)

app.get('/', (req, res) => {
  res.send('WELCOME TO CAMPAIGN ADVERTISEMENT BACKEND')
})

app.get('*', (req, res) => {
  res.send('NOT A VALID ROUTE')
})

const start = async (PORT) => {
  try {
    await db()
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`.yellow.bold)
    })
  } catch (error) {
    console.log(error)
  }
}
start(process.env.PORT || 5000)

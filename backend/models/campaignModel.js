const mongoose = require('mongoose')

//Creatig Campaign Model

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Provide Your Name'],
  },
  totalBudget: {
    type: Number,
    required: [true, 'Please Provide Your Total Budget'],
  },
  dailyBudget: {
    type: Number,
    required: [true, 'Please Provide Your Daily Budget'],
  },
  startDate: {
    type: String,
    required: [true, 'Please Provide Your Start Date'],
  },
  endDate: {
    type: String,
    required: [true, 'Please Provide Your End Date'],
  },
  campaignImages: {
    type: Array,
    required: [true, 'Please Provide Your Campaign Images'],
  },
})

const Campaign = mongoose.model('Campaign', campaignSchema)

module.exports = Campaign

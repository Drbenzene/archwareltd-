const express = require('express')
const {
  createCampaign,
  editCampaign,
  getAllCampaigns,
} = require('../controllers/campaignControllers.js')

const campaignRouter = express.Router()

campaignRouter.post('/create', createCampaign)
campaignRouter.put('/edit', editCampaign)
campaignRouter.get('/all', getAllCampaigns)

module.exports = campaignRouter

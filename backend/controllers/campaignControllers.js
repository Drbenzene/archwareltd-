const Campaign = require('../models/campaignModel.js')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

/*
 * @DESC    Create a new campaign campaign
 * @ROUTE   POST /api/campaign/create
 * @ACCESS  PUBLIC
 * @PARAMS {name, totalBudget, dailyBudget, startDate, endDate, campaignImages}
 */

const createCampaign = async (req, res) => {
  try {
    const {
      name,
      totalBudget,
      dailyBudget,
      campaignStartDate,
      campaignEndDate,
      imageList,
    } = req.body

    const campaign = await Campaign.create({
      name,
      totalBudget,
      dailyBudget,
      startDate: campaignStartDate,
      endDate: campaignEndDate,
      campaignImages: imageList,
    })

    res.status(201).json({
      status: 'success',
      campaign,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    })
  }
}

/*
 * @DESC    Get all campaigns from Database
 * @ROUTE   POST /api/campaign/edit
 * @ACCESS  PUBLIC
 * @PARAMS {*}
 */

const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()

    res.status(200).json({
      status: 'success',
      campaigns,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    })
  }
}

/*
 * @DESC    Edit a new campaign campaign
 * @ROUTE   POST /api/campaign/edit
 * @ACCESS  PUBLIC
 * @PARAMS {_id, name, totalBudget, dailyBudget, startDate, endDate, campaignImages}
 */

const editCampaign = async (req, res) => {
  try {
    const {
      _id,
      name,
      totalBudget,
      dailyBudget,
      campaignStartDate,
      campaignEndDate,
      imageList,
    } = req.body

    // check if the ID Exists
    const theCampaign = await Campaign.findById(_id)
    if (!theCampaign) {
      return res.status(400).json({
        status: 'fail',
        error: 'Campaign does not exist',
      })
    }

    //Update the Database With the New Details
    let imageBase64 = []
    imageList.map((image) => {
      imageBase64.push(image.data_url)
    })

    const campaign = await Campaign.findByIdAndUpdate(
      _id,
      {
        name,
        totalBudget,
        dailyBudget,
        startDate: campaignStartDate,
        endDate: campaignEndDate,
        campaignImages: imageBase64,
      },
      { new: true, runValidators: true },
    )

    res.status(201).json({
      status: 'success',
      campaign,
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error: error.message,
    })
  }
}

module.exports = {
  createCampaign,
  editCampaign,
  getAllCampaigns,
}

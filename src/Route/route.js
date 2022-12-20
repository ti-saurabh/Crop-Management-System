const express = require("express")
const router = express.Router()

const {createcrop,getCrop}= require("../Controller/CropController")
const {createOrganisation, loginOrg}= require("../Controller/OrganisationController")
const {createUser, loginUser, getCropForUser} = require("../Controller/userController")
const {authentication} = require("../auth/auth")




router.post("/CreateOrganisation", createOrganisation)
router.post("/loginOrg", loginOrg)
router.post("/CreateCrop", authentication, createcrop)
router.get("/GetCrop", getCrop)

router.post("/UserCreate", createUser )
router.post("/loginUser", loginUser)
router.get("/GetCropForUser", getCropForUser)




module.exports=router
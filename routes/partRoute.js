const {addPart, searchPart, viewPart, upload, deletePart, findPart} = require('../controllers/partController')
const jwt = require('jsonwebtoken');
const decode = require("jsonwebtoken/decode");
const partRouter = require("express").Router();
const {isUser,isAdmin} = require('../authentication')

partRouter.post("/create",isUser, isAdmin, upload.array("file"), addPart)
partRouter.delete("/delete-part:id",isUser, isAdmin, deletePart)
partRouter.get("/search-part",isUser, searchPart)
partRouter.get("/view-parts",isUser, viewPart)
partRouter.get("/find-part:id",isUser, findPart)


module.exports = partRouter
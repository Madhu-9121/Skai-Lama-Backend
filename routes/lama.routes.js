const express = require("express");
const router = express.Router();
const {getVideos,addUser,updateContent,getVideoByPerson} = require('../controller/lama.controller')

router.get("/user",getVideos);
router.get('/:email',getVideoByPerson)
router.post('/user', addUser);
router.patch('/user/:email',updateContent)

 

module.exports = router;

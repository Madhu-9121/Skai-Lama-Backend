const express = require("express");
const router = express.Router();
const {getUsers,addUser,updateContent,getUserByPerson,addNewProject,addNewTask,removeItem} = require('../controller/lama.controller');
const { route } = require("../app");

router.get("/user",getUsers);
router.get('/:email',getUserByPerson)
router.post('/user', addUser);
router.post("/user/:email/projects",addNewProject)
router.post('/user/:email/newtask',addNewTask)
router.patch('/user/:email',updateContent)
router.delete('/user/:email/delete', removeItem);

 

module.exports = router;

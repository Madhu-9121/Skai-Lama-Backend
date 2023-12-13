const { triggerAsyncId } = require("async_hooks");
 
const userServices = require("../services/lama.services");
const getVideos = async (req, res) => {
  //   res.status(200).json({ success: true, data: { user1: { email: "wgeg@getMaxListeners.com", projects: ['sample1', 'sample2'] } } })
  const users = await userServices.getVideos();
  res.status(200).json({ data: { users } });
};

const addUser = async (req, res) => {
  // console.log("ccc called")
  try {
    const data = req.body;
    const newUser = await userServices.addVideo(data);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const updateContent = async (req, res) => {
  try {
    const email = req.params.email;
    const { content, pname } = req.body;
    console.log(email, content, pname);
    await userServices.updateContent({ content, email, pname });
    res.status(204).end();
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getVideoByPerson = async (req, res) => {
  const { email } = req.params;
  // console.log("called cont", email)
  try {
    const data = await userServices.getPersonData(email);
    res.status(200).send(data);
  } catch (e) {
    res.status(404).json({ message: "Video not found" });
  }
};

module.exports = { getVideos, addUser, updateContent, getVideoByPerson };

// const sampleUser = new Video({
//     email: "example@email.com",
//     projects: [
//       {
//         name: "Project 1",
//         content: "Description of Project 1",
//       },
//       {
//         name: "Project 2",
//         content: "Description of Project 2",
//       },
//     ],
//   });
//   console.log(sampleUser)

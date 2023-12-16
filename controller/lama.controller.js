const { triggerAsyncId } = require("async_hooks");
const { User } = require("../model/lama.model");

const userServices = require("../services/lama.services");
const getUsers = async (req, res) => {
  //   res.status(200).json({ success: true, data: { user1: { email: "wgeg@getMaxListeners.com", projects: ['sample1', 'sample2'] } } })
  const users = await userServices.getUser();
  res.status(200).json({ data: { users } });
};

const addUser = async (req, res) => {
  // console.log("ccc called")
  try {
    const data = req.body;
    const newUser = await userServices.addUser(data);
    res.status(201).json(newUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const updateContent = async (req, res) => {
  try {
    const email = req.params.email;
    const { content, pname,ItemName } = req.body;
    console.log(email, content, pname);
    await userServices.updateContent({ content, email, pname,ItemName });
    res.status(204).end();
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserByPerson = async (req, res) => {
  const { email } = req.params;
  // console.log("called cont", email)
  try {
    const data = await userServices.getPersonData(email);
    res.status(200).send(data);
  } catch (e) {
    res.status(404).json({ message: "User not found" });
  }
};

// no service file used 
const addNewProject =async(req,res)=>{
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newProject = {
      name: req.body.name,
      items: req.body.items || [],
    };

    user.projects.push(newProject);
    await user.save();

    res.status(201).json({ message: "Project added successfully", user });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

}
const addNewTask = async (req, res) => {
  const email = req.params.email;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    // console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const projectName = req.body.projectName;
    // console.log(projectName)
    const newItem = {
      ItemName: req.body.itemName,
      content: req.body.content,
    };

    // Find the project 
    const project = user.projects.find((proj) => proj.name === projectName);
    console.log(project)

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Add new task to the items 
    project.items.push(newItem);

    await user.save();

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const removeItem = async (req, res) => {
  const email = req.params.email;
  const projectName = req.body.projectName
  const itemName = req.body.itemName
  console.log(email,projectName,itemName)
  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find the project
    const project = user.projects.find((proj) => proj.name === projectName);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Find item in the project's items array
    const itemIndex = project.items.findIndex((item) => item.ItemName === itemName);

    if (itemIndex === -1) {
      return res.status(404).json({ error: 'Item not found' });
    }

    // Remove item from the project's items array
    project.items.splice(itemIndex, 1);

    await user.save();

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = { getUsers, addUser, updateContent, getUserByPerson,addNewProject,addNewTask,removeItem };

// {"email": "sampleuser@example.com",
//   "projects": [
//     {
//       "name": "Project 1",
//       "items": [
//         { "name": "Item 1", "content": "Content for Item 1" },
//         { "name": "Item 2", "content": "Content for Item 2" }
//       ]
//     },
//     {
//       "name": "Project 2",
//       "items": [
//         { "name": "Item 3", "content": "Content for Item 3" },
//         { "name": "Item 4", "content": "Content for Item 4" }
//       ]
//     }
//   ]
// }
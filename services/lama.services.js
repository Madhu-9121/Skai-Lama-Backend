const { User } = require("../model/lama.model");

const addVideo = async (userData) => {
  try { 
    const newUser = await User.create(userData);
    return newUser;
  } catch (err) {
    return err
  }
};
const getVideos = async () => {
  try {
    const newUser = await User.find();
    return newUser;
  } catch (e) {
    console.log(e);
  }
};
const updateContent = async ({ content, email, pname }) => {
  try {
    const person = await User.findOne({ email });
    if (!person) {
      throw new Error("User not found");
    }
    const projectToUpdate = person.projects.find(
      (project) => project.name === pname
    );
    if (!projectToUpdate) {
      throw new Error(`Project not found with name: ${pname}`);
    }
    projectToUpdate.content = content;

    await person.save();
    return person;
  } catch (e) {
    console.log(e);
  }
};
const getPersonData = async (email) => {
  const data = await User.findOne({ email });

  // if  User doesnot exists
  if (!data) {
    throw new Error("Video not found");
  }

  return data;
};

module.exports = { addVideo, getVideos, updateContent, getPersonData };

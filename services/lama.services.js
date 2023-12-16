const { User } = require("../model/lama.model");

const addUser = async (userData) => {
  try { 
    const newUser = await User.create(userData);
    return newUser;
  } catch (err) {
    return err
  }
};
const getUser = async () => {
  try {
    const newUser = await User.find();
    return newUser;
  } catch (e) {
    console.log(e);
  }
};
const updateContent = async ({ content, email, pname, ItemName }) => {
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

    const itemToUpdate = projectToUpdate.items.find(
      (item) => item.ItemName === ItemName
    );

    if (!itemToUpdate) {
      throw new Error(`Item not found with name: ${ItemName}`);
    }

    itemToUpdate.content = content;

    await person.save();
    return person;
  } catch (e) {
    console.log(e);
    throw e; // Re-throw the error to propagate it to the caller
  }
};

const getPersonData = async (email) => {
  const data = await User.findOne({ email });

  // if  User doesnot exists
  if (!data) {
    throw new Error("User not found");
  }

  return data;
};

module.exports = { addUser, getUser, updateContent, getPersonData };

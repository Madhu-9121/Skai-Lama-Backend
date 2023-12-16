const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const projectItemSchema = mongoose.Schema({
  ItemName: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    trim: true,
  },
});
const projectSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  items: [projectItemSchema], 
});

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
          return /^\S+@\S+\.\S+$/.test(value)
        },
      },
    projects: [projectSchema],
});



userSchema.plugin(validator, { message: "must be unique" });

const User = mongoose.model("lama", userSchema);
module.exports = {User}


const mongoose = require("mongoose");
const { z } = require("zod");

//creating zod schema
const userSchemaZod = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6).max(1024),
});

// Mongoose schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
    validate: {
      validator: (value) => userSchemaZod.shape.name.safeParse(value).success,
      message: "Name must be between 3 and 255 characters",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => userSchemaZod.shape.email.safeParse(value).success,
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024,
    validate: {
      validator: (value) =>
        userSchemaZod.shape.password.safeParse(value).success,
      message: "Password must be between 6 and 1024 characters",
    },
  },
});

module.exports = mongoose.model("User", userSchema);

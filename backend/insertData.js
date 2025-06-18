const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./models/Student");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    return createStudent(); // Call after connection established
  })
  .catch((err) => console.log(err));

async function createStudent() {
  const newStudent = new Student({
    RegisterNo: "12345",
    RollNo: "6789",
  });

  try {
    await newStudent.save();
    console.log("Student created");
  } catch (err) {
    console.error("Error creating student:", err);
  } finally {
    mongoose.connection.close(); // Important to close connection after operation
  }
}

createStudent().catch((err) => console.log(err));

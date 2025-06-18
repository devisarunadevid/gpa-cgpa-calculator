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
    return createStudents();
  })
  .catch((err) => console.log(err));

async function createStudents() {
  const students = [{ RegisterNo: "12347", RollNo: "6791" }];

  try {
    await Student.insertMany(students);
    console.log("Students created");
  } catch (err) {
    console.error("Error creating students:", err);
  } finally {
    mongoose.connection.close();
  }
}

createStudents().catch((err) => console.log(err));

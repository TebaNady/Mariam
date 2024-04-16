import mongoose from "mongoose";
mongoose.set("debug", true); // Enable Mongoose debugging
export const initConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://tebanady795:teba2020@cluster0.dhvjzfi.mongodb.net/`
    )
    //! Here we specify the name of the online database within the cluster's connection code, if it's not found it will create the database. 2. How does it know the collection to add in or delete from? => it uses the specified in the controller.js file
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection Error: ", err));
};
const bcrypt = require("bcryptjs"); //Is used for hashing

class UserDAL {
  //constructor for create a user model class
  constructor(mongoose) {
    this.mongoose = mongoose;
    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      isAdmin: Boolean,
      hash: String
    });
    this.userModel = mongoose.model("user", userSchema);
  }

  async createUser(user) {
    let newUser = new this.userModel(user);
    return newUser.save();
  }

  async getUsers() {
    try {
      return await this.userModel.find({});
    } catch (error) {
      console.error("getUsers:", error.message);
      return {};
    }
  }

  //Test users
  async testUsers() {
    let l = (await this.getUsers()).length;
    console.log("Users in system:", l);

    //if the lengt is over 0, it means that users exsist
    if (l !== 0) return;

    const users = [
      // These are just some test users with passwords.
      // The passwords are in clear text for testing purposes. (don't do this in production)
      { username: "rdh", password: "12" },
      { username: "mm", password: "13" }
    ];
  }
}

module.exports = mongoose => new UserDAL(mongoose);

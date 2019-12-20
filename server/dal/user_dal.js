const bcrypt = require("bcryptjs"); //Is used for hashing

class UserDAL {
  //constructor for create a user model class
  constructor(mongoose) {
    this.mongoose = mongoose;
    const userSchema = new mongoose.Schema({
      username: String,
      password: String,
      role: String,
      hash: String
    });
    this.userModel = mongoose.model("user", userSchema);
  }

  async createUser(user) {
    let newUser = new this.userModel(user);
    return newUser.save();
  }

  async getUser(username) {
    try {
      return await this.userModel.findOne({ username: username });
    } catch (error) {
      console.error("getUser:", error.message);
      return {};
    }
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
      { username: "rdh", password: "12", role: "0" },
      { username: "mm", password: "13", role: "1" }
    ];

    let promises = [];

    users.forEach(user => {
      bcrypt.hash(user.password, 10, (err, hash) => {
        user.hash = hash; // The hash has been made, and is stored on the user object.
        delete user.password; // The clear text password is no longer needed

        let newUser = new this.userModel(user);
        promises.push(newUser.save());
      });
    });

    return Promise.all(promises);
  }
}

module.exports = mongoose => new UserDAL(mongoose);

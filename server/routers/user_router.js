module.exports = (dal, secret) => {
  let express = require("express");
  let router = express.Router();

  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs");

  router.post("/createUser", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const isAdmin = false;

    if (username === "" || password === "") {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return null;
    } else {
      console.log(username);
      const user = { username: username, password: password, isAdmin: isAdmin };
      bcrypt.hash(user.password, 10, async (err, hash) => {
        user.hash = hash; // The hash has been made, and is stored on the user object.
        delete user.password; // The clear text password is no longer needed
        const newUser = await dal.createUser(user);
        res.json({ msg: "New user created!", username: newUser.username });
      });
    }
  });

  router.post("/authenticate", async (req, res) => {});

  //RETURN the router content
  return router;
};

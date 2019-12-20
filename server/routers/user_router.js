module.exports = (dal, secret) => {
  let express = require("express");
  let router = express.Router();

  const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs");

  router.get("/", (req, res) => {
    dal.getUsers().then(book => res.json(book));
  });

  router.post("/createUser", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //Check if the username and password is empty, if it will print console log.
    if (username === "" || password === "") {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return null;
    } else {
      console.log(username);
      const user = { username: username, password: password, role: "1" };
      bcrypt.hash(user.password, 10, async (err, hash) => {
        user.hash = hash; // The hash has been made, and is stored on the user object.
        delete user.password; // The clear text password is no longer needed

        //access the createUser in the data access layer
        const newUser = await dal.createUser(user);
        res.json({ msg: "New user created!", username: newUser.username });
      });
    }
  });

  router.post("/authenticate", async (req, res) => {
    //authenticate the user thats login
    const username = req.body.username;
    const password = req.body.password;

    if (username === "" || password === "") {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return;
    }

    const user = await dal.getUser(username);
    if (user) {
      // If the user is found
      bcrypt.compare(password, user.hash, (err, result) => {
        if (result) {
          // If the password matched
          const payload = { username: username };
          const token = jwt.sign(payload, secret, { expiresIn: "1h" });

          res.json({
            msg: `User '${username}' authenticated successfully`,
            token: token
          });
        } else {
          console.error(err);
          res.status(401).json({ msg: "Password mismatch!" });
        }
      });
    } else {
      res.status(404).json({ msg: "User not found!" });
    }

    console.log(user);
  });

  //RETURN the router content
  return router;
};

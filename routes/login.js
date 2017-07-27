const express = require('express');
const router = express.Router();
const session = require('express-session')



router.get('/', function (req, res) {
    req.session.loggedIn = true
  res.render("login", {});
});

module.exports = router;
const express = require('express');
const router = express.Router();
const session = require
    ('express-session')
const bodyParser = require('body-parser')

const usersList = {
    users: [
        { userName: "admin", password: "admin" },
        { userName: "user", password: "1234" },
        { userName: "password", password: "password" }
    ]
}
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/', function (req, res) {
    req.session.loggedIn = true
    checkUsername("admi")
    res.render("login", {});
});

router.post('/register', function (req, res, next) {
    let user = checkUsername(req.body.userName)
    console.log(user)
    if (user) {
        if (req.body.password == user.password) {
            req.session.userName = user.userName;
            res.redirect("/")
        } else {
            res.send("Bad password!")
        }
    } else {
        res.send("Bad username")
    }
})

function checkUsername(name) {
    return usersList.users.filter(function (user) {
        return user.userName == name;
    })[0]
}
module.exports = router;
const { User } = require("../models");

const userData = [
    new User({
        email: "johndoe@mail.com",
        username: "johnny123"
    }),
    new User({
        email: "janedoe@mail.net",
        username: "janey456"
    }),
    new User({
        email: "joeychestnut@yahoo.org",
        username: "hotdogeater400"
    }),
    new User({
        email: "stevebrule14@timanderic.gov",
        username: "doctordoc000"
    })
];

module.exports = userData;
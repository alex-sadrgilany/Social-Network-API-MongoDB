const { Thought } = require("../models");

const thoughtData = [
    new Thought({
        thoughtText: "This is a thought from John Doe!",
        username: "johnny123"
    }),
    new Thought({
        thoughtText: "For your health!!!",
        username: "doctordoc000"
    }),
    new Thought({
        thoughtText: "yummy yummy hot dogs!",
        username: "hotdogeater400"
    }),
    new Thought({
        thoughtText: "I wonder if this will work?",
        username: "janey456"
    })
];

module.exports = thoughtData;
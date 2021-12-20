const userData = require("./user-seeds");
const thoughtData = require("./thought-seeds");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

userData.map(async (u, index) => {
    await u.save((err, result) => {
        if (index === userData.length - 1) {
            console.log('\n----- USERS SEEDED -----\n');
        }
    })
});

thoughtData.map(async (t, index) => {
    await t.save((err, result) => {
        if (index === thoughtData.length - 1) {
            console.log('\n----- THOUGHTS SEEDED -----\n');
            mongoose.disconnect();
        }
    });
});
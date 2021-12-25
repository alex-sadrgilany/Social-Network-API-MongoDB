const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// attempting to access any other route will return this error
router.use((req, res) => {
    res.status(404).send("<h1>404 Error! Please use a valid route!</h1>");
});

module.exports = router;
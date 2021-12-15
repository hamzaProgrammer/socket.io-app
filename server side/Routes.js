const express = require("express")
const router = express.Router()


router.get("/", (req,res) => {
    console.log("routes found")
    res.send("Server is up and running")
})


module.exports = router;
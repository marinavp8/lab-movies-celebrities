const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

router.get("/add-celebrity", (req, res) => {
    res.render("celebrities/add-celebrity")
})

router.post("/add-celebrity", (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name: name, occupation: occupation, catchPhrase: catchPhrase })
        .then(() => res.redirect("/"))
        .catch(() => res.redirect("/add-celebrity"))
})


router.get("/", (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render("celebrities/celebrities", { celebrities }))
        .catch(err => console.log("no funciono", err))
})


module.exports = router;
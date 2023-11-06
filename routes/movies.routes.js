const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get("/add-movie", (req, res) => {

    Celebrity
        .find()
        .then((celebrities) => res.render("movies/add-movie", { celebrities: celebrities }))
        .catch((err) => console.log("ey", err))
})
router.post("/add-movie", (req, res) => {
    const { title, genre, plot, cast } = req.body

    Movie
        .create({ title, genre, plot, cast: cast })
        .then(() => res.redirect("/"))
        .catch(() => res.redirect("add-movie"))

})

router.get("/movies", (req, res) => {
    Movie
        .find()
        .then(movies => res.render('movies/movies', { movies }))
        .catch((err) => console.log("ey", err))
})

router.get("/movies/details/:id", (req, res) => {
    const { id } = req.params

    Movie
        .findById(id)
        .populate("cast")
        .then(movie => {
            res.render("movies/movie-details", movie)
        })
        .catch(err => console.log(err))
})


router.post("/:id/delete", (req, res) => {

    const { id } = req.params

    Movie
        .findByIdAndRemove(id)
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))

})

router.get("/:id/edit", (req, res) => {

    const { id } = req.params

    Movie
        .findById(id)
        .then(movie => res.render("movies/edit-movie", movie))
        .catch(err => console.log(err))

})



router.post("/:id/edit", (req, res) => {

    const { id } = req.params
    const { title, genre, plot } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot })
        .then(() => res.redirect("/movies"))
        .catch(err => console.log(err))

})

module.exports = router;





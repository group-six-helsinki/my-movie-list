const router = require("express").Router();
const ControllerUser = require("../controllers/userController");
const ControllerMovie = require("../controllers/movieController");

// routes user
router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.post("/loginGoogle", ControllerUser.loginGoogle);

// routes movies
router.get("/movies", ControllerMovie.showAll);
router.post("/movies/movie", ControllerMovie.createMovie);
router.post("/movies/anime", ControllerMovie.createAnime);
router.put("/movies/:id", ControllerMovie.editMovieList);
router.patch("/movies/:id", ControllerMovie.doneWatching);
router.delete("/movies/:id", ControllerMovie.deleteMovie);

module.exports = router;

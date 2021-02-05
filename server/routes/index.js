const router = require("express").Router();
const ControllerUser = require("../controllers/userController");
const ControllerMovie = require("../controllers/movieController");
const authenticate = require("../middlewares/authenticate");
const authorize = require("../middlewares/authorize");

// routes user
router.post("/register", ControllerUser.register);
router.post("/login", ControllerUser.login);
router.post("/loginGoogle", ControllerUser.loginGoogle);

router.use(authenticate);
router.use(authorize);

// routes movies
router.get("/movies", ControllerMovie.showAll);
router.post("/movies/movie", ControllerMovie.createMovie);
router.post("/movies/anime", ControllerMovie.createAnime);
router.patch("/movies/:id", ControllerMovie.doneWatching);
router.delete("/movies/:id", ControllerMovie.deleteMovie);

router.post("/movies", ControllerMovie.addMovieToDB)

// route test
// router.get("/test", ControllerMovie.movie);

module.exports = router;

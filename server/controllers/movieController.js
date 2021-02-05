const { Movie } = require("../models");
const axios = require("axios");

class ControllerMovie {
  static showAll(req, res, next) {
    Movie.findAll({
      where: {
        UserID: +req.decoded.id,
      },
    })
      .then((movies) => {
        console.log(movies);
        if (movies.length <= 0) {
          throw { message: "Data not found", status: 404, name: "Custom" };
        }
        res.status(200).json(movies);
      })
      .catch((err) => {
        next(err);
      });
  }

  static createMovie(req, res, next) {
    const input = {
      title: req.body.title_search
    };

    const api_key = "c2dcee8f08e877d5fb3559af163b7e36";
    const queryTitle = input.title.split(" ").join("+");

    axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${queryTitle}`,
    })
      .then((response) => {
        let output = [];
        // let moviesOutput = {}
        response.data.results.forEach((movies) => {
          output.push({
            movie_id: movies.id,
            title: movies.original_title,
            synopsis: movies.overview,
            poster: movies.poster_path,
            rating: movies.vote_average,
            release_year: movies.release_date,
          });
        });
        res.status(200).json(output);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static createAnime(req, res, next) {
    const input = {
      title: req.body.title_search
    };
    // const userId = +req.decoded.id;
    // let output = {};
    axios
      .get(`https://api.jikan.moe/v3/search/anime?q=${input.title}&limit=5`)

      .then((response) => {
        const dataAnime = response.data.results;
        let output = [];
        dataAnime.forEach((el) => {
          output.push({
            anime_id: el.mal_id,
            title: el.title,
            synopsis: el.synopsis,
            rating: el.score,
            poster: el.image_url,
            release_year: el.start_date,
          });
          // output.title = el.title;
          // output.sinopsis = el.synopsis;
          // output.rating = el.score;
          // output.poster_path = el.image_url;
          // output.release_year = el.start_date;
        });
        res.status(200).json(output);
      })
      .catch((err) => {
        next(err);
      });
  }

  static doneWatching(req, res, next) {
    const movieId = +req.params.id;

    Movie.update({ status: true }, { where: { id: movieId }, returning: true })
      .then((response) => {
        res.status(200).json(response[1]);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteMovie(req, res, next) {
    const id = +req.params.id;

    Movie.destroy({
      where: { id },
    })
      .then((response) => {
        if (response) {
          res.status(200).json({
            message: "Movie watchlist deleted successfully",
          });
        } else {
          throw {
            message: "Data not found",
            status: 404,
            name: "Custom",
          };
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  static addMovieToDB(req, res, next) {
    console.log('masuk controlerr');
    const input = {
      title: req.body.title_search,
      status: req.body.status || false,
      UserID: req.decoded.id,
      synopsis: req.body.synopsis,
      poster: req.body.poster,
      rating: req.body.rating,
      release_year: req.body.release_year
    }

    Movie.create(input)
      .then(movies => {
        console.log(movies, 'dari controllerrrrrrrrrrrrrrrr');
        res.status(201).json(movies)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ControllerMovie;

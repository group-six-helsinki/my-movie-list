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
        if (!movies) {
          throw { message: "Data not found", status: 404 };
        }
        res.status(200).json(movies);
      })
      .catch((err) => {
        const status = err.status || 500;
        res.status(status).json(err);
      });
  }

  static createMovie(req, res, next) {
    const input = {
      title: req.body.title_search,
      status: req.body.status || false,
      UserID: +req.decoded.id,
    };

    const api_key = 'c2dcee8f08e877d5fb3559af163b7e36'
    const queryTitle = input.title.split(' ').join('+')

    axios({
      method: 'GET',
      url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${queryTitle}`
    })
      .then(response => {
        let output = []
        // let moviesOutput = {}
        response.data.results.forEach(movies => {
          output.push({
            movie_id: movies.id,
            title: movies.original_title,
            synopsis: movies.overview,
            poster: movies.poster_path,
            rating: movies.vote_average,
            release_year: movies.release_date
          })
        })
        res.status(200).json(output)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createAnime(req, res, next) {
    const input = {
      title: req.body.title,
      status: req.body.status || false,
    };
    const userId = +req.decoded.id;
    axios
      .get(`https://api.jikan.moe/v3/search/anime?q=${input.title}&limit=1`)

      .then((response) => {
        let output = {};
        // let output = []
        const data = response.data.results;
        console.log(data);
        data.forEach((el) => {
          // output.push({
          //   title: el.title,
          //   sinopsis: el.synopsis,
          //   score: el.score,
          //   poster_path: el.image_url,
          //   release_year: el.start_date,
          // });
          output.title = el.title;
          output.sinopsis = el.synopsis;
          output.rating = el.score;
          output.poster_path = el.image_url;
          output.release_year = el.start_date;
        });
        return Movie.create({
          title: output.title,
          status: input.status,
          UserID: userId,
        });
      })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }

  static editMovieList(req, res, next) {}

  static doneWatching(req, res, next) {
    const movieId = +req.params.id;

    Movie.update({ status: true }, { where: { id: movieId }, returning: true })
      .then((response) => {
        res.status(200).json(response[1]);
      })
      .catch((err) => {
        res.status(500).json(err);
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
          res.status(404).json({
            message: "Data not found",
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = ControllerMovie;

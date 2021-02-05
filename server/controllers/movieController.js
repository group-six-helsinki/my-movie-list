const { Movie } = require("../models");
const axios = require("axios");

class ControllerMovie {
  static showAll(req, res, next) {
    Movie.findAll({
      where: {
        userID: req.decoded.id,
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
      title: req.body.title,
      status: req.body.status || false,
      userID: req.decoded.id,
    };

    Movie.create(input)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
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

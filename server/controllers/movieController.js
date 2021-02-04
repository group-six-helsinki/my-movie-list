const { Movie } = require('../models')

class ControllerMovie {
  static showAll(req, res, next) {
    Movie.findAll({
      where: {
        userID: req.decoded.id
      }
    })
      .then(movies => {

      })
      .catch(err => {

      })
  }

  static createMovie(req, res, next) {
    const input = {
      title: req.body.title,
      status: req.body.status || false,
      userID: req.decoded.id
    }

    Movie.create(input)
      .then(response => {
        res.status(201).json(response)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createAnime(req, res, next) {}

  static editMovieList(req, res, next) {}

  static doneWatching(req, res, next) {
    const id = +req.params.id

    const input = {
      status: req.body.status
    }

    Movie.update(input, {
      where: { id },
      returning: true
    })
      .then(response => {
        res.status(200).json(response[1])
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteMovie(req, res, next) {
    const id = +req.params.id

    Movie.destroy({
      where: { id }
    })
      .then(response => {
        if (response) {
          res.status(200).json({
            message: 'Movie watchlist deleted successfully'
          })
        } else {
          res.status(404).json({
            message: 'Data not found'
          })
        }
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }
}

module.exports = ControllerMovie;

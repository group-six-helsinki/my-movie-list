const axios = require('axios')
const api_key = 'c2dcee8f08e877d5fb3559af163b7e36'

function getMovie(title) {
  const queryTitle = title.split(' ').join('+')
  let output = []
  axios({
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${queryTitle}`
  })
    .then(response => {
      console.log(response.data, 'response')
      output.push(response.data)
    })
    .catch(err => {
      console.log(err, 'error')
    })

  return output
}

const title = 'death race'
console.log(getMovie(title))

module.exports = getMovie;
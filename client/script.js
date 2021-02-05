//const { response } = require("express");

const base_url = "http://localhost:3000/"

function toggleResetPswd(e){
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle() // display:block or none
  $('#logreg-forms .form-reset').toggle() // display:block or none
}

function toggleSignUp(e){
  e.preventDefault();
  $('#logreg-forms .form-signin').toggle(); // display:block or none
  $('#logreg-forms .form-signup').toggle(); // display:block or none
}


function auchtenticate() {
  if (!localStorage.getItem("access_token")) {
    //show login only
    $('#logreg-forms').show()
    $('#navbar').hide()
    $('#main-page-cards').hide()
    $('#addMovie').hide()
  } else {
    $('#navbar').show()
    $('#main-page-cards').show()
    $('#logreg-forms').hide()
    $('#addMovie').hide()
    getMyMovie()
    // $('#logreg-forms #cancel_reset').hide()
    // $('#logreg-forms #btn-signup').hide()
    // $('#logreg-forms #cancel_signup').hide()
  }
}



function register() {
  const email = $('#user-email').val()
  const password = $('#user-pass').val()
  console.log(email, password);
  $.ajax({
    url: base_url + 'register',
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done((data)=>{
    console.log(data);
    $('#logreg-forms .form-signin').show()
    $('#logreg-forms .form-signup').hide()
  })
  .fail((xhr, text)=>{
    alert(xhr.responseJSON.name)
    console.log(xhr, text);
  })
  .always(()=>{
    $('#user-email').val("")
    $('#user-pass').val("")
  })

}

function login() {
  const email = $('#inputEmail').val()
  const password = $('#inputPassword').val()
  //console.log(email, password);
  $.ajax({
    url: base_url + 'login',
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(response=>{
    //console.log(response);
    localStorage.setItem('access_token', response.access_token)
    auchtenticate()
  })
  .fail((xhr, text)=> {
    console.log(xhr, text);
  })
  .always(()=>{
    $('#inputEmail').val("")
    $('#inputPassword').val("")
  })
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    url: base_url + 'user/googleLogin',
    method: "POST",
    data: {
      googleToken: id_token
    }
  })
  .done(response=>{
    localStorage.setItem('token', response.token)
    authenticate()
  })
  .fail(err => {
    console.log(err);
  })
}

function formatYear(date) {
  let splittedDate= date.split('-');
  return splittedDate[0]
}

function getMyMovie() {
  $.ajax({
    url: base_url + 'movies',
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(movies => {
    $('#main-page-cards').empty();
    //akan looping semua movies punya dia
    movies.forEach(movie => {
      let status;
      if (movie.status){
        status = 'watched'
      } else {
        status = 'watch later'
      }
      let year = formatYear(movie.date);
      $('#main-page-cards').append(`
      <div id="cards-${movie.id}">
      <div class="card p-3" style="width: 18rem;">
        <img class="card-img-top" src="${movie.poster_path}" alt="movie poster">
        <div class="card-body">
          <h5 class="card-title">${movie.original_title}</h5>
          <p class="card-text">${movie.overview}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${movie.vote_average}</li>
          <li class="list-group-item">${year}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link" onclick="patchMyMovie(${movie.id, movie.status})">${status}</a>
          <a href="#" class="card-link" onclick="deleteMyMovie(${movie.id})">Delete</a>
        </div>
      </div>
    </div>
      `)
    })
  })
  .fail((xhr, text)=>{ 
    console.log(xhr, text);
  })
  
}


function searchMovie() {
  const title_search = $('#title_search').val()
  $.ajax({
    url: base_url + 'movies/movie',
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data : {
      title_search
    }
  })
  .done(movies => {
    $('#recommended-page-cards').empty();
    //console.log(movies);
    //akan looping semua movies punya dia
    movies.forEach(movie => {
      $('#recommended-page-cards').append(`
      <div class="recommended-movie">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="https://image.tmdb.org/t/p/w500${movie.poster}" alt="movie poster">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.synopsis}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${movie.rating}</li>
          <li class="list-group-item">${formatYear(movie.release_year)}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link" onclick="addToMyMovie(${movie.title})">Add to My List</a>
        </div>
      </div>
    </div>
      `)
    })
  })
  .fail((xhr, text)=>{ 
    console.log(xhr, text);
  })
  
}


function searchAnime() {
  const title_search = $('#title_search').val()
  $.ajax({
    url: base_url + 'movies/anime',
    method: "POST",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data : {
      title_search
    }
  })
  .done(movies => {
    $('#recommended-page-cards').empty();
    console.log(movies);
    //akan looping semua movies punya dia
    movies.forEach(movie => {
      $('#recommended-page-cards').append(`
      <div class="recommended-movie">
      <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${movie.poster_path}" alt="movie poster">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.sinopsis}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${movie.score}</li>
          <li class="list-group-item">${formatYear(movie.release_year)}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link" onclick="addToMyMovie(${movie.title})">Add to My List</a>
        </div>
      </div>
    </div>
      `)
    })
  })
  .fail((xhr, text)=>{ 
    console.log(xhr, text);
  })
  
}


function addToMyMovie(movie_title) {
 //const movie_title = $('').val()
  $.ajax({
    url: base_url+"movies/movie",
    method: "POST",
    headers: {
      access_token: localStorage.getItem('access_token')
    },
    data: {
      title: movie_title,
      status: false
    }
  })
  .done(res => {
    auchtenticate();
  })
  .fail((xhr,text)=>{
    alert(xhr.responseJSON.error)
    console.log(xhr, text);
  })
}

function patchMyMovie(id, status) {
  $.ajax({
    url: base_url + `movies/${id}`,
    method: "PATCH",
    headers: {
      access_token: localStorage.getItem("access_token")
    },
    data: {
      status
    }
  })
  .done(response=> {
    getMyMovie()
  })
  .fail((xhr,text)=>{
    console.log(xhr, text);
  })

}

function deleteMyMovie(id) {
  $.ajax({
    url: base_url + "movies/" + id,
    method: "DELETE",
    headers: {
      token: localStorage.getItem('access_token')
    }
  })
  .done(()=>{
    $(`#card-${id}`).remove()
  })
  .fail((xhr,text)=>{
    alert(xhr.responseJSON.error)
    console.log(xhr, text);
  })
}

function logout() {
  localStorage.clear()
    var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(()=>{
      console.log('User singed out');
    })
  auchtenticate()
}


$(document).ready(()=>{
  //cek apakah login atau belum
  auchtenticate()
  //untuk tombol di login dan register page
  $('#logreg-forms #cancel_reset').click(toggleResetPswd);
  $('#logreg-forms #btn-signup').click(toggleSignUp);
  $('#logreg-forms #cancel_signup').click(toggleSignUp);

  $('#loginbtn').on('click', (e)=> {
    e.preventDefault()
    login()
  })

  $('#registerbtn').on('click', (e)=> {
    e.preventDefault()
    register()
  })

  $("#homeBtn").on('click', ()=> {
    getMyMovie()
    $('#recommended-page-cards').hide()
  })

  $('#searchMovieBtn').on('click', ()=> {
    $("#main-page-cards").hide()
    $('#logreg-forms').hide()
    $('#recommended-page-cards').show()
    searchMovie()
  })
  $('#searchAnimeBtn').on('click', ()=>{
    $("#main-page-cards").hide()
    $('#logreg-forms').hide()
    $('#recommended-page-cards').show()
    searchAnime()
  })
  
  $('#addMovieBtn').on('click', ()=> {
    $('#addMovie').toggle()
    $("#main-page-cards").hide()
    $('#logreg-forms').hide()
    getMyMovie()
  })

  //tombol logout
  $('#logoutbtn').on('click', (e)=>{
    e.preventDefault()
    logout()
    
  })
})


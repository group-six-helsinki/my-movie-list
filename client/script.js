
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
  } else {
    $('#navbar').show()
    $('#main-page-cards').show()
    $('#logreg-forms').hide()
    getMyMovie()
    $('#logreg-forms #cancel_reset').hide()
    $('#logreg-forms #btn-signup').hide()
    $('#logreg-forms #cancel_signup').hide()
  }
}



function register() {
  const email = $('user-email').val()
  const password = $('user-pass').val()
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
    $('#logreg-forms').show()
  })
  .fail((xhr, text)=>{
    alert(xhr.responseJSON)
    console.log(xhr, text);
  })

}

function login() {
  const email = $('inputEmail').val()
  const password = $('inputPassword').val()
  $.ajax({
    url: base_url + '/login',
    method: "POST",
    data: {
      email,
      password
    }
  })
  .done(response=>{
    localStorage.setItem('acces_token', response.access_token)
  })
  .fail((xhr, text)=> {
    console.log(xhr, text);
  })
}

function getMyMovie() {
  $.ajax({
    url: base_url + 'movies',
    method: "GET",
    headers: {
      access_token: localStorage.getItem("access_token")
    }
  })
  .done(response => {
    //akan looping semua movies punya dia
  })
  .fail((xhr, text)=>{ 
    alert(xhr.responseJSON)
    console.log(xhr, text);
  })
}

function addToMyMovie() {
  
}

function patchMyMovie() {
  
}

function deleteMyMovie() {
  
}

function logout() {
  localStorage.clear()
  authenticate()
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

  $('#registerbtn').on('submit', (e)=> {
    e.preventDefault()
    register()
  })




  //tombol logout
  $('#logoutbtn').on('click', (e)=>{
    e.preventDefault()
    logout()
  })
})


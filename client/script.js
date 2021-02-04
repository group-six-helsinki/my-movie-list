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
    $('#logreg-forms #cancel_reset').hide()
    $('#logreg-forms #btn-signup').hide()
    $('#logreg-forms #cancel_signup').hide()
  }
}


//auchtenticate()
$(document).ready(()=>{
  // Login Register Form
  auchtenticate()
  $('#logreg-forms #cancel_reset').click(toggleResetPswd);
  $('#logreg-forms #btn-signup').click(toggleSignUp);
  $('#logreg-forms #cancel_signup').click(toggleSignUp);
  // end of login register form
})
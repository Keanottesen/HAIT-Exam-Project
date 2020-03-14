/**
 * Class to create a User object
  * @class
 */
class User{
  /**
   *
   * @param {Object} UserInfo Information about the User
   */
  constructor(id, firstName, userName, lastName, email, password, active) {
    /**
    * @property {integer} id playlist id
    * @property {string} firstName playlist firstName
    * @property {string} userName playlist userName
    * @property {string} lastName playlist lastName
    * @property {string} email playlist email
    * @property {string} password playlist password
    * @property {boolean} active playlist active
    */
    this.id = id;
    this.firstName = firstName;
    this.userName = userName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.active = active;
  }

}

let activeUser, user;

/**
 * @function
 * @name validateLogin
 * @returns {void}
 * @description this function is handling the logic when a user wants to login
 */
function validateLogin(){

  axios.post('http://localhost:8000/api/validateUser', {
    email: document.forms['loginForm']['loginEmail'].value,
    password: document.forms['loginForm']['loginPassword'].value
  })
  .then(response => {

    user = response.data

    activeUser = new User(
      user.id,
      user.first_name,
      user.username,
      user.last_name,
      user.email,
      user.password,
      user.active
    );
    //eventuelt ændre til state
    pushToLocalStorage(activeUser, 'activeUser')
      window.location = 'browse.html';
  })
  .catch(error => {
    console.log(error);
      alert('Dit email eller kodeord er forkert');
  })


}

function createUser(){
  axios.post('http://localhost:8000/api/createUser', {
    first_name: document.forms['registerForm']['firstName'].value,
    last_name: document.forms['registerForm']['username'].value,
    username: document.forms['registerForm']['lastName'].value,
    email: document.forms['registerForm']['email'].value,
    password: document.forms['registerForm']['password'].value
  })
  .then(response => {
    user = response.data
    activeUser = new User(
      user.id,
      user.first_name,
      user.username,
      user.last_name,
      user.email,
      user.password,
      user.active
    );

    pushToLocalStorage(activeUser, 'activeUser')
      window.location = 'browse.html';
  })
  .catch(error => {
    // TODO: Catch error
    console.log(error);
  })

 }


 /**
  * @function
  * @name updateEmail
  * @returns {void}
  * @description this function is handling the logic when a user wants to update his or her email
  */
 function update(action) {

   let body = {}
   switch (action) {
     case 'email':
      body = {email: document.querySelectorAll('.updatedEmail')[0].value}
       break;
     case 'password':
      body = {password: document.querySelectorAll('.newPassword1')[0].value}
       break;
     case 'logout':
      body = {active: 0}
       break;
   }

   axios.put('http://localhost:8000/api/updateUser/' + userLoggedIn.id, body)
   .then(response => {
     console.log(response);
       localStorage.clear()
       window.location = 'index.html';
   })
   .catch(error => {
     // TODO: Catch error
     console.log(error);
   })


 /** @function
  * @name renderingloginOrRegister
  * @returns void
  * @description This function is controlling whether the login or register form is shown
  */
$(document).ready(function() {
$(".loginForm").hide();
$("#registerForm").show();

$(".loginForm").show();
$("#registerForm").hide();


$("#hideLogin").click(function() {
	$(".loginForm").hide();
	$("#registerForm").show();
});

$("#hideRegister").click(function() {
	$(".loginForm").show();
	$("#registerForm").hide();
});

});

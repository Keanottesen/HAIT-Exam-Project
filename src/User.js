import axios from 'axios';
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

/**
 * @function
 * @name validateLogin
 * @returns {void}
 * @description this function is handling the logic when a user wants to login
 */
function validateLogin(){

  const allEmails = users.map(user => (user.email));
  const allPasswords = users.map(user => (user.password));

  var email = document.forms['loginForm']['loginEmail'].value;
  var password = document.forms['loginForm']['loginPassword'].value;

  if (!allEmails.includes(email) || !allPasswords.includes(password)) {
      alert('Dit email eller kodeord er forkert');
      return false;
  }

  const userLoggedIn = users.find(x => x.email == email);

  for (var i = 0; i < users.length; i++) {
    if (users[i].id == userLoggedIn.id) {
        users.splice(i, 1);
    }
  }

  let authUser = new User(
    userLoggedIn.id,
    userLoggedIn.firstName,
    userLoggedIn.userName,
    userLoggedIn.lastName,
    userLoggedIn.email,
    userLoggedIn.password,
    true
  )

  users.push(authUser);

  const storageObject = JSON.stringify(users);
  localStorage.setItem('users', storageObject);
  window.location = 'browse.html';
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
      console.log(response);
  })
  .catch(error => {
    // TODO: Catch error
    console.log(error);
  })

  // let newUser = new User(
  //   users.length + 1,
  //   document.forms['registerForm']['firstName'].value,
  //   document.forms['registerForm']['username'].value,
  //   document.forms['registerForm']['lastName'].value,
  //   document.forms['registerForm']['email'].value,
  //   document.forms['registerForm']['password'].value,
  //   true);
  //
  //    users.push(newUser);
  //    const storgaeUsers = JSON.stringify(users);
  //    localStorage.setItem('users', storgaeUsers);
 }


 /**
  * @function
  * @name updateEmail
  * @returns {void}
  * @description this function is handling the logic when a user wants to update his or her email
  */
 function updateEmail() {
   const newEmail = document.querySelectorAll('.updatedEmail')[0].value;

   let userLoggedIn = users.find(x => x.active === true);
   let usersArray = users

   for (var i = 0; i < usersArray.length; i++) {
     if (usersArray[i].id == userLoggedIn.id) {
         usersArray.splice(i, 1);
     }
   }

   let authUser = new User(
     userLoggedIn.id,
     userLoggedIn.firstName,
     userLoggedIn.userName,
     userLoggedIn.lastName,
     newEmail,
     userLoggedIn.password,
     userLoggedIn.active
   )

   usersArray.push(authUser)
   const storgaeUsers = JSON.stringify(usersArray);
   localStorage.setItem('users', storgaeUsers);
 }


 /**
  * @function
  * @name updatePassword
  * @returns {void}
  * @description this function is handling the logic when a user wants to update his or her password
  */
 function updatePassword() {
   const oldPassword = document.querySelectorAll('.oldPassword')[0].value;
   const new1Password = document.querySelectorAll('.newPassword1')[0].value;
   const new2Password = document.querySelectorAll('.newPassword2')[0].value;
   let userLoggedIn = users.find(x => x.active === true);

   if (new1Password == new2Password) {
     let usersArray = users

     for (var i = 0; i < usersArray.length; i++) {
       if (usersArray[i].id == userLoggedIn.id) {
           usersArray.splice(i, 1);
       }
     }
     let authUser = new User(
       userLoggedIn.id,
       userLoggedIn.firstName,
       userLoggedIn.userName,
       userLoggedIn.lastName,
       userLoggedIn.email,
       new1Password,
       userLoggedIn.active
     )

     usersArray.push(authUser)
     const storgaeUsers = JSON.stringify(usersArray);
     localStorage.setItem('users', storgaeUsers);
   } else {
     alert('Kodeord matcher ikke')
   }
 }


 /**
  * @function
  * @name logout
  * @returns {void}
  * @description this function is handling the logic when a user wants to logout
  */
 function logout() {
   let userLoggedIn = users.find(x => x.active === true);
   for (var i = 0; i < users.length; i++) {
     if (users[i].id == userLoggedIn.id) {
         users.splice(i, 1);
     }
   }

   let authUser = new User(
     userLoggedIn.id,
     userLoggedIn.firstName,
     userLoggedIn.userName,
     userLoggedIn.lastName,
     userLoggedIn.email,
     userLoggedIn.password,
     false
   )

   users.push(authUser);

   const storgaeUsers = JSON.stringify(users);
   localStorage.setItem('users', storgaeUsers);
   window.location = 'index.html';
 }

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

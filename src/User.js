
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

  /**
   * @property {Function} greet A greeting with the name and age
   * @returns void
   */

}

function validateLogin(){
  //retrieves all usernames

  const allEmails = users.map(user => (user.email));
  const allPasswords = users.map(user => (user.password));

  var email = document.forms['loginForm']['loginEmail'].value;
  var password = document.forms['loginForm']['loginPassword'].value;

  if (!allEmails.includes(email) || !allPasswords.includes(password)) {
      alert('Dit brugernavn eller kodeord er forkert');
      return false;
  }

  const userLoggedIn = users.find(x => x.email == email);

  for (var i = 0; i < users.length; i++) {
    if (users[i].id == userLoggedIn.id) {
        users.splice(i, 1);
    }
  }

  users.push({
        'active': true,
        'email': userLoggedIn.email,
        'firstName': userLoggedIn.firstName,
        'id': userLoggedIn.id,
        'lastName': userLoggedIn.lastName,
        'passWord': userLoggedIn.passWord,
        'userName': userLoggedIn.userName
      })

      const storageObject = JSON.stringify(users);
      localStorage.setItem('users', storageObject);
      window.location = 'browse.html';
}


function createUser(){
  let newUser = new User(
    users.length + 1,
    document.forms['registerForm']['firstName'].value,
    document.forms['registerForm']['username'].value,
    document.forms['registerForm']['lastName'].value,
    document.forms['registerForm']['email'].value,
    document.forms['registerForm']['password'].value,
    true);

     const currentUsers = JSON.parse(localStorage.getItem('users'));

     currentUsers.push(newUser);
     const storgaeUsers = JSON.stringify(currentUsers);
     localStorage.setItem('users', storgaeUsers);
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

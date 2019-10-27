//This is hardcoded data, which is made in order to substitute for a
//backend with a database where users could be stored and posted to.
var users =[
{    'id': 1,
    'firstName': 'Kean',
    'userName': 'Kean1234',
    'lastName': 'Ottesen',
    'email': 'kean_ottesen@hotmail.com',
    'password': '123456789',
    'active': true
},
{    'id': 2,
    'firstName': 'Mikkel',
    'userName': 'Mikkel1234',
    'lastName': 'Svensson',
    'email': 'mikkel_svensson@hotmail.com',
    'password': '123456789',
    'active': true
},
{    'id': 3,
    'firstName': 'Oliver',
    'userName': 'Oliver1234',
    'lastName': 'Larsen',
    'email': 'oliver_larsen@hotmail.com',
    'password': '123456789',
    'active': false
},
{    'id': 4,
    'firstName': 'Svend',
    'userName': 'Svend1234',
    'lastName': 'Sørensen',
    'email': 'Svend_Sørensen@hotmail.com',
    'password': '123456789',
    'active': true
},
{    'id': 5,
    'firstName': 'Lars',
    'userName': 'Lard1234',
    'lastName': 'Larsen',
    'email': 'lars_larsen@hotmail.com',
    'password': '123456789',
    'active': true
}
]


function validateLogin(){
  //retrieves all usernames
  const usernames = users.map(user => (user.userName));
  const passwords = users.map(user => (user.password));

  var username = document.forms['loginForm']['loginUsername'].value;
  var password = document.forms['loginForm']['loginPassword'].value;

    if (!usernames.includes(username) && !passwords.includes(password)) {
        alert('Dit brugernavn eller kodeord er forkert');
        return false;
    }
}


function createUser(){
    users.push(
      {
        'id': users.length + 1,
        'firstName': document.forms['registerForm']['firstName'].value,
        'userName': document.forms['registerForm']['username'].value,
        'lastName': document.forms['registerForm']['lastName'].value,
        'email': document.forms['registerForm']['email'].value,
        'password': document.forms['registerForm']['password'].value,
        'active': true
      }
    )
}

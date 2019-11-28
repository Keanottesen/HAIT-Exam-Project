import Utility from './Utility.js';
/**
 * Class to create a User object
  * @class
 */
class User extends Utility {
  /**
   *
   * @param {Object} UserInfo Information about the User
   */
  constructor(id, name, firstName, userName, lastName, email, password, active) {
    /**
    * @property {integer} id playlist id
    * @property {string} firstName playlist firstName
    * @property {string} userName playlist userName
    * @property {string} lastName playlist lastName
    * @property {string} email playlist email
    * @property {string} password playlist password
    * @property {boolean} active playlist active
    */
    super('User');
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

const o = new User();

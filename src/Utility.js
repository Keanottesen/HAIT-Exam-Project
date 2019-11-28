/**
 * Class to instantiate all other classes
  * @class
 */
class Utility {
  /**
   *
   * @param {Object} Utility Information about the Utility
   */
    constructor(classtype) {
      this.classtype = classtype;
    }

    /**
     * @property {Function} pushToLocalStorage A function that pushes data to local storage
     * @returns void
     */
    pushToLocalStorage(object, name) {
       let storageObject = JSON.stringify(object);
       localStorage.setItem(name, storageObject);
     }
     
    get state() {
      return JSON.parse(localStorage.state);
    }

}


/**
 * A module that enables all other modules to push to local storage
 * @module Utility
 */
export default Utility;

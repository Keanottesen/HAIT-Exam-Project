import Utility from './Utility.js';

/**
 * Class to create a Song object
  * @class
 */
class Song extends Utility {
  /**
   *
   * @param {Object} SongInfo Information about the Song
   */
  constructor(id, name, artistId, albumId, genreId, duration, plays) {
    /**
    * @property {integer} id song id
    * @property {string} title song title
    * @property {integer} artistId song artistId
    * @property {integer} albumId song albumId
    * @property {integer} genreId song genreId
    * @property {string} duration song duration
    * @property {integer} plays song plays
    */
    super('Song');
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.albumId = albumId;
    this.genreId = genreId;
    this.duration = duration;
    this.plays = plays;
  }

  /**
   * @property {Function} greet A greeting with the name and age
   * @returns void
   */

}

const o = new Song();

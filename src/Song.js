/**
 * Class to create a Song object
  * @class
 */
class Song {
  /**
   *
   * @param {Object} SongInfo Information about the Song
   */
  constructor(id, name, artistId, albumId, duration, plays) {
    /**
    * @property {integer} id song id
    * @property {string} title song title
    * @property {integer} artistId song artistId
    * @property {integer} albumId song albumId
    * @property {string} duration song duration
    * @property {integer} plays song plays
    */
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
    this.plays = plays;
  }

}

function getAlbumSong(id) {
  axios.get('http://localhost:8000/api/albumSongs/?album_id=' + id)
    .then(response => {
      console.log(response);
      const data = response.data
      pushToLocalStorage(data, 'choosenAlbumSongs')
    })
    .catch(error => {
      console.log(error);
    })
}

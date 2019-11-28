import Utility from './Utility.js';

/**
 * Class to create a Playlist object
  * @class
 */
class Playlist extends Utility {
  /**
   *
   * @param {Object} PlaylistInfo Information about the Playlist
   */
  constructor(id, name, ownerUserId, dateCreated) {
    /**
    * @property {integer} id playlist id
    * @property {string} name playlist name
    * @property {integer} ownerUserId playlist ownerUserId
    * @property {DateTime} dateCreated playlist dateCreated
    */
    super('Playlist');
    this.id = id;
    this.name = name;
    this.ownerUserId = ownerUserId;
    this.dateCreated = dateCreated;
  }

}

/**
 * Artist id
 * @type {integer}
 */
const playlistId = JSON.parse(localStorage.getItem("state")).playlist_id
/**
 * object containing an array of alubums
* @typedef {Object} Playlist
 */
const playlistProperty = playlists.find(x => x.id == playlistId)
/**
 * Array of songids
 * @type {Array<number>}
 */
const songIds = playlistSongs.filter(x => x.playlistId == playlistId).map(item => item.songId)
/**
 * See {@link Song}
 */
const songsInPlaylist = songs.filter(x => songIds.includes(x.id))


/** @function
 * @name playlistRendering
 * @returns void
 * @description This function is populating the view with all song in the playlist
 */
$(document).ready(function() {
document.getElementById('playlistName').innerHTML = playlistProperty.name;
document.getElementById('playlistOwner').innerHTML = playlistProperty.owner;
document.getElementById('playlistSongs').innerHTML = songIds.length + ' songs';

document.querySelector('.tracklist').innerHTML = songsInPlaylist.map((song, index) =>
  `            <li class='tracklistRow'>
                    <div class='trackCount'>
                      <img class='play' src='assets/images/icons/play-white.png' onclick=''>
                      <span class='trackNumber'>${index + 1}</span>
                    </div>


                    <div class='trackInfo'>
                      <span class='trackName'>${song.title}</span>
                      <span class='artistName'>${artist.find(x => x.id == song.artistId).name}</span>
                    </div>

                    <div class='trackOptions'>
                      <input type='hidden' class='songId' value='" . $playlistSong->getId() . "'>
                      <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.id})'>
                    </div>

                    <div class='trackDuration'>
                      <span class='duration'>${song.duration}</span>
                    </div>


                  </li>`
).join('')
})

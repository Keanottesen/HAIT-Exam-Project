/**
 * Class to create a Playlist object
  * @class
 */
class Playlist {
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
    this.id = id;
    this.name = name;
    this.ownerUserId = ownerUserId;
    this.dateCreated = dateCreated;
  }

}


/**
 * @async
 * @function
 * @name createPlaylist
 * @returns {void}
 * @description this function is handling the logic when a user wants to create a playlist
 */
function createPlaylist() {
  (async () => {
    var {value: newPlaylist} = await Swal.fire({
    title: 'Hvad skal din playlist hedde?',
    input: 'text',
    inputPlaceholder: 'Min playliste',
    background: '#181818',
    icon: 'question',
    confirmButtonText: 'Skab din playliste',
    confirmButtonColor: '#2FBD5A',
    inputAttributes: {
    maxlength: 15,
    autocapitalize: 'on',
    autocorrect: 'off'
  }
  })

  	let userLoggedIn = users.find(x => x.active === true);
    if (newPlaylist != null) {

      const newPlaylistObject = new Playlist(
  			    JSON.parse(localStorage.playlists).length,
  			    newPlaylist,
  			    userLoggedIn.id,
  			    new Date()
  			  )

  		playlists.push(newPlaylistObject)
  				this.pushToLocalStorage(playlists, 'playlists');
          location.reload();
        };
})()
  }

  /**
   * @async
   * @function
   * @name deletePlaylist
   * @returns {void}
   * @description this function is handling the logic when a user wants to delete a playlist
   */
function deletePlaylist() {

    (async () => {

      var deletedPlaylist = await Swal.fire({
      title: 'Er du sikker?',
      background: '#181818',
      icon: 'info',
      confirmButtonText: 'Slet min playliste',
      confirmButtonColor: '#2FBD5A',
    }).then(() => {

      const deletedPlaylistId = JSON.parse(localStorage.getItem("state")).playlist_id
      for (var i = 0; i < playlists.length; i++) {

        if (playlists[i].id == deletedPlaylistId) {
          console.log(playlists[i]);
            playlists.splice(i, 1);
        }
      }
      const storageObject = JSON.stringify(playlists);
      localStorage.setItem('playlists', storageObject);
      window.location = 'yourMusic.html';
    })
  })()
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
if (window.location.pathname == '/playlist') {
  document.getElementById('playlistName').innerHTML = playlistProperty.name;
  document.getElementById('playlistOwner').innerHTML = playlistProperty.owner;
  document.getElementById('playlistSongs').innerHTML = songIds.length + ' songs';

  document.querySelector('.tracklist').innerHTML = songsInPlaylist.map((song, index) =>
    `            <li class='tracklistRow'>
                      <div class='trackCount'>
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

}
})

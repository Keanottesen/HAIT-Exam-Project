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
 * @function
 * @name getAllPlaylist
 * @returns {void}
 * @description this function is getting all the playlist for the user
 */
function getAllPlaylist() {
  axios.get('http://localhost:8000/api/userPlaylists?user_id=' + userLoggedIn.id)
    .then(response => {
      console.log(response);
      const data = response.data
      pushToLocalStorage(data, 'userPlaylists')
    })
    .catch(error => {
      console.log(error);
    })
}

function getPlaylistById(id) {
  axios.get('http://localhost:8000/api/playlist/?playlist_id=' + id)
    .then(response => {
      const data = response.data
      pushToLocalStorage(data, 'songsInPlaylist')
    })
    .catch(error => {
      if (error.response.status == 400) {
        (async () => {
          const alert = await Swal.fire({
          title: 'Hov hvis du ønsker at fjerne den sidste sang skal du fjerne hele playlisten',
          background: '#181818',
          icon: 'question',
          confirmButtonColor: '#2FBD5A',
        })
      })()
      }
    })
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

    if (newPlaylist != null) {
      axios.post('http://localhost:8000/api/createPlaylist', {
        name: newPlaylist,
        owner_user_id: userLoggedIn.id,
      })
      .then(response => {
        const playlist = response.data
        console.log(playlist);
        getAllPlaylist()
        location.reload()
      })
      .catch(error => {
        // TODO: Catch error
        console.log(error);
      })
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
      const deletedPlaylist = await Swal.fire({
      title: 'Er du sikker?',
      background: '#181818',
      icon: 'info',
      confirmButtonText: 'Slet min playliste',
      confirmButtonColor: '#2FBD5A',
    }).then(() => {

      axios.put('http://localhost:8000/api/updatePlaylist/' + state.playlist_id, {
        deleted_at: new Date()
      })
      .then(response => {
        console.log(response);
        getAllPlaylist()
        window.location = 'yourMusic.html';
      })
      .catch(error => {
        // TODO: Catch error
        console.log(error);
      })

    })
  })()
}


/**
 * @function
 * @name removeFromPlaylist
 * @returns {void}
 * @description this function is handling the logic when a user want to remove a playlist from his collection on /yourMusic
 */
function removeFromPlaylist() {

  axios.put('http://localhost:8000/api/deletePlaylistSong', {
    song_id: state.song_id,
    playlist_id: state.playlist_id,
    deleted_at: new Date()
  })
  .then(response => {
    getPlaylistById(state.playlist_id)
    // location.reload();
  })
  .catch(error => {
    // TODO: Catch error
    console.log(error);
  })

}

/**
 * object containing an array of alubums
* @typedef {Object} Playlist
 */
 const playlistProperty = JSON.parse(localStorage.getItem('songsInPlaylist'))

/** @function
 * @name playlistRendering
 * @returns void
 * @description This function is populating the view with all song in the playlist
 */
$(document).ready(function() {
if (window.location.pathname == '/playlist') {
  document.getElementById('playlistName').innerHTML = playlistProperty.playlistName;
  document.getElementById('playlistOwner').innerHTML = userLoggedIn.firstName + ' ' + userLoggedIn.lastName;
  document.getElementById('playlistSongs').innerHTML = playlistProperty.nbTracks + ' songs';

  document.querySelector('.tracklist').innerHTML = playlistProperty.songs.map((song, index) =>
    `            <li class='tracklistRow'>
                      <div class='trackCount'>
                      <img class='play' src='assets/images/icons/play-white.png' onclick=''>
                        <span class='trackNumber'>${index + 1}</span>
                      </div>


                      <div class='trackInfo'>
                        <span class='trackName'>${song.songTitle}</span>
                        <span class='artistName'>${song.artists.join(' ')}</span>
                      </div>

                      <div class='trackOptions'>
                        <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.songId})'>
                      </div>

                      <div class='trackDuration'>
                        <span class='duration'>${(song.duration / 60).toFixed(2)}</span>
                      </div>


                    </li>`
  ).join('')
} else if (window.location.pathname == '/yourMusic') {
  getAllPlaylist()
  const userPlaylists = JSON.parse(localStorage.getItem('userPlaylists'))

    document.querySelector('.playlistsGridContainer').innerHTML = userPlaylists.map(playlist =>
      `      <div id='${playlist.id}'class='gridViewItem' role='link' tabindex='0'
                  onclick='playlistOnclickHandler(this)'>
                <div class='playlistImage'>
                  <img src='assets/images/icons/playlist.png'>
                </div>
                <div class='gridViewInfo'>
                ${playlist.name}
                </div>
              </div>`).join('')
}
})

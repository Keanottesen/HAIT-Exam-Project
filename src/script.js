/**
 * Array of objects
 * @type {Object}
 */
let state = null;

/**
 * Array of objects
 * @type {Array<objects>}
 * @description global variables
 */
let playlists = JSON.parse(localStorage.playlists);
let albums = JSON.parse(localStorage.albums);
let artist = JSON.parse(localStorage.artist);
let songs = JSON.parse(localStorage.songs);
let users = JSON.parse(localStorage.users);
let playlistSongs = JSON.parse(localStorage.playlistSongs);


if (users.find(x => x.active === true) === undefined) {
  window.location = 'index.html';
}


if (localStorage.getItem("state") === null) {
  state = {
    album_id: null,
    artist_id: null,
    playlist_id: null,
    song_id: null
  }
  const storageState = JSON.stringify(state);
  localStorage.setItem('state', storageState);
} else {
  var retrievedObject = localStorage.getItem('state');

  state = JSON.parse(retrievedObject);
}

$(function(){
  $("#nav-placeholder").load("navBarContainer.html");
});


/**
 * @function
 * @name setState
 * @returns {void}
 * @description this function is emulating the setState function of react
 */
function setState(key, value) {
  state[key] = value;

  const storageState = JSON.stringify(state);
  localStorage.setItem('state', storageState);
}

/**
 * @function
 * @name playlistOnclickHandler
 * @returns {void}
 * @description this function calling the setState function in order to globally know what playlist that has been clicked, and thus render the correct view without routing
 */
const playlistOnclickHandler = (clicked) => {
  setState('playlist_id', clicked.id);
  window.location = 'playlist.html';
}

/**
 * @function
 * @name songOnclickHandler
 * @returns {void}
 * @description this function calling the setState function in order to globally know what song that has been clicked, and thus render the correct view without routing
 */
const songOnclickHandler = (song) => {
  setState('song_id', song);
}

/**
 * @function
 * @name onAlbumClickHandler
 * @returns {void}
 * @description this function calling the setState function in order to globally know what album that has been clicked, and thus render the correct view without routing
 */
const onAlbumClickHandler = (clicked) => {
  setState('album_id', clicked.id);
  window.location = 'album.html';
}

/**
 * @function
 * @name onArtistClickHandler
 * @returns {void}
 * @description this function calling the setState function in order to globally know what artist that has been clicked, and thus render the correct view without routing
 */
const onArtistClickHandler = (clicked) => {
  setState('artist_id', clicked.id);
  window.location = 'artist.html';
}

/**
 * @function
 * @name pushToLocalStorage
 * @returns {void}
 * @description this function pushes and item to locale state
 */
function pushToLocalStorage(object, name) {
  const storageObject = JSON.stringify(object);
  localStorage.setItem(name, storageObject);
}

/**
 * @function
 * @name toObject
 * @param {Array} arr
 * @returns {Object} array converted to an object
 * @description this function converts an array to an object. This function is found on https://stackoverflow.com/questions/4215737/convert-array-to-object
 */
function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}


/**
 * @function
 * @name removeFromPlaylist
 * @returns {void}
 * @description this function is handling the logic when a user want to remove a playlist from his collection on /yourMusic
 */
function removeFromPlaylist() {

  let userLoggedIn = users.find(x => x.active === true);
  const songId = JSON.parse(localStorage.getItem("state")).song_id;
  const playlistId = JSON.parse(localStorage.getItem("state")).playlist_id;

  const deletedPlaylistSong = playlistSongs.find(x => x.playlistId == playlistId && x.songId == songId);

  for (var i = 0; i < playlistSongs.length; i++) {

    if (playlistSongs[i].id == deletedPlaylistSong.id) {
        playlistSongs.splice(i, 1);
    }
  }

  const storageObject = JSON.stringify(playlistSongs);
  localStorage.setItem('playlistSongs', storageObject);
  location.reload();

}


/**
 * @async
 * @function
 * @name addToPlaylist
 * @returns {(string|void)} if the user fails to provide a valid playlist when adding a song to a playlist this function will return a string.
 * @description this function is handling the logic when a user want to add a song to a playlist.
 */
function addToPlaylist() {

  let userLoggedIn = users.find(x => x.active === true);

  let userPlaylists = playlists.filter(x => x.ownerUserId == userLoggedIn.id);
  const playlistNames = userPlaylists.map(x => x.name);
  const newNames = toObject(playlistNames);

  (async () => {
    var {value: newSongToPlaylist} = await Swal.fire({
    title: 'Tilføj til playliste',
    input: 'select',
    inputOptions: newNames,
    inputPlaceholder: 'Vælg din playliste',
    background: '#181818',
    icon: 'question',
    confirmButtonText: 'Tilføj denne sang til din playliste',
    confirmButtonColor: '#2FBD5A',
    inputValidator: (value) => {
        if (!value) {
          return 'Du bliver nødt til at vælge en playliste';
        };
      }
  })

    const choosenPlaylist = userPlaylists[newSongToPlaylist];

    const songId = JSON.parse(localStorage.getItem("state")).song_id

        playlistSongs.push({
                'id': playlistSongs.length,
                'playlistId': choosenPlaylist.id,
                'songId': songId
            })

        const storageObject = JSON.stringify(playlistSongs);
        localStorage.setItem('playlistSongs', storageObject);

})()
}

/**
 * @async
 * @params {object} the this keyword is sent as a param, which is the current iteration of the element that is pressed
 * @params {integer} songId is the id of the song, whose row is pressed
 * @function
 * @name showOptionsMenu
 * @returns {void}
 * @description this function is handling the logic when the optionsMenu is pressed on any given element
 */
function showOptionsMenu(button, songId) {

  songOnclickHandler(songId);

  var menu = $(".optionsMenu");
  var menuWidth = menu.width();

  var scrollTop = $(window).scrollTop();
  var elementOffset = $(button).offset().top;

  var top = elementOffset - scrollTop;
  var left = $(button).position().left;

  menu.css({
    "top": top + "px",
    "left": left - menuWidth + "px",
    "display": "inline"
  });
}


/** @function
 * @name genericRendering
 * @returns void
 * @description This function is populating the view the respective variable content that is on each path
 */
 $(document).ready(function() {
  let userLoggedIn = users.find(x => x.active === true);
  setTimeout(function(){document.getElementById('activeUserName').innerHTML = userLoggedIn.firstName + " " + userLoggedIn.lastName}, 50);
  switch (window.location.pathname) {
    case '/browse':
      //render data in html
      console.log(albums);
      document.querySelector('.gridViewContainer').innerHTML = albums.map(album =>
        `<div class='gridViewItem'>
			 <span id=${album.id} role='link' tabindex='0' onclick='onAlbumClickHandler(this)'>
					 <img src='${album.pathToPicture}'>
					 <div class='gridViewInfo '>
							 ${album.title}
					 </div>
				 </span>
				 </div>`
      ).join('')
      break;
    case '/yourMusic':

    let userLoggedIn = users.find(x => x.active === true);

    let userPlaylists = playlists.filter(x => x.ownerUserId == userLoggedIn.id);

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
      break;

		case '/settings':

		let userLoggedIn2 = users.find(x => x.active === true);

		document.getElementById('activeUserName').innerHTML = userLoggedIn2.firstName + ' ' + userLoggedIn2.lastName;
			break;
    case '/search':
    const typeHandler = function(e) {
      console.log(e);
        let searchString = e.target.value;
        const songsMacthingSearchString = songs.filter(x => x.title.includes(searchString))
        const albumsMacthingSearchString = albums.filter(x => x.title.includes(searchString))
        const artistsMacthingSearchString = artist.filter(x => x.name.includes(searchString))

          if (searchString !== '') {
            // render songs
            document.querySelector('.tracklist').innerHTML = songsMacthingSearchString.map((song, index) =>
              `      <li class='tracklistRow'>
                      <div class='trackCount'>
                        <span class='trackNumber'>${index + 1}</span>
                      </div>
                      <div class='trackInfo'>
                        <span class='trackName'>${song.title}</span>
                        <span class='artistName'>${artist.find(x => x.id === song.artistId).name}</span>
                      </div>

                      <div class='trackOptions'>
                        <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.id})'>
                      </div>

                      <div class='trackDuration'>
                        <span class='duration'>${song.duration}</span>
                      </div>
                    </li>`
            ).join('')

          //render artist
          document.querySelector('.artistsInnerContainer').innerHTML = artistsMacthingSearchString.map((artist, index) =>
          ` <div class='searchResultRow'>
              <div class='artistName'>
                <span role='link' id=${artist.id} tabindex='0' onclick='onArtistClickHandler(this)'>
                    ${artist.name}
                </span>
              </div>
            </div>`
          ).join('')

          //render albums
          document.querySelector('.gridViewInnerContainer').innerHTML = albumsMacthingSearchString.map((album, index) =>
          ` <div class='gridViewItem'>
      				<span role='link' id=${album.id} tabindex='0' onclick='onAlbumClickHandler(this)'>
      					<img src='${album.pathToPicture}'>
      					<div class='gridViewInfo'>${album.title}</div>
      					</span>
      				</div>`
          ).join('')
          }
    }

    const source = document.querySelector('.searchInput');
    source.addEventListener('input', typeHandler)
    source.addEventListener('propertychange', typeHandler)
      break;
  }
})

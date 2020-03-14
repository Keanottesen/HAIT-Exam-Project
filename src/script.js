/**
 * Array of objects
 * @type {Object}
 */
let state = null;
let userLoggedIn = JSON.parse(localStorage.getItem('activeUser'))
let playlists = JSON.parse(localStorage.getItem('userPlaylists'))
let albums = JSON.parse(localStorage.getItem('albums'))
let currentPlaylist = [];
let shufflePlaylist = [];
let tempPlaylist = [];
let audioElement;
let mouseDown = false;
let currentIndex = 0;
let repeat = false;
let shuffle = false;
let timer;

$(document).click(function(click) {
	var target = $(click.target);

	if(!target.hasClass("item") && !target.hasClass("optionsButton")) {
		hideOptionsMenu();
	}
});

$(window).scroll(function() {
	hideOptionsMenu();
});

function hideOptionsMenu() {
	var menu = $(".optionsMenu");
	if(menu.css("display") != "none") {
		menu.css("display", "none");
	}
}

if (window.location.pathname !== "/") {
  $(function(){
    $("#nav-placeholder").load("navBarContainer.html");
  });
  $(function(){
    $("#nowPlaying-placeholder").load("nowPlayingBar.html");
  });
}

const update_time = setInterval(time, 100)

function time() {
	try{
		const song = document.getElementById(state.currentSongPlaying)
		document.getElementById('progressTimeCurrent').innerHTML = song.currentTime.toFixed(2)
		document.getElementById('progressTimeRemaining').innerHTML = (song.duration - song.currentTime).toFixed(2)

} catch(e){
}
}

function playSong(id, title, contributors, albumCover) {

	var song = document.getElementById(id);
	setState('currentSongPlaying', song.id)

	document.addEventListener('play', function(e){
	    var audios = document.getElementsByTagName('audio');
	    for(var i = 0, len = audios.length; i < len;i++){
	        if(audios[i] != e.target){
	            audios[i].pause();
	        }
	    }
	}, true);
	console.log(albumCover);
	if (song.paused) {
			song.play();
			document.getElementById('albumCoverNowPLaying').src = albumCover
			document.getElementById('nowPlayingSongName').innerHTML = title
			document.getElementById('nowPlayingArtists').innerHTML = contributors
			document.getElementById("playButton").style.display = "none";
			document.getElementById("pauseButton").style.display = "inline";
			} else {
			song.pause();
			document.getElementById("playButton").style.display = "inline";
			document.getElementById("pauseButton").style.display = "none";
			}

}

function pauseSong() {
	const song = document.getElementById(state.currentSongPlaying)
	document.getElementById("pauseButton").style.display = "none";
	document.getElementById("playButton").style.display = "inline";
	song.pause()
}

function turnUpOrDown(control) {
	const song = document.getElementById(state.currentSongPlaying)

	if (control == 'down') {
			song.volume = song.volume - 0.1
	} else {
		song.volume = song.volume + 0.1
	}

}



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

function pushToLocalStorage(object, name) {
  let storageObject = JSON.stringify(object);
  localStorage.setItem(name, storageObject);
}

if (localStorage.getItem("state") === null) {
  state = {
    album_id: null,
    artist_id: null,
    playlist_id: null,
    song_id: null,
    activeUser: {},
		currentSongPlaying: null
  }
  const storageState = JSON.stringify(state);
  localStorage.setItem('state', storageState);
} else {
  var retrievedObject = localStorage.getItem('state');
  state = JSON.parse(retrievedObject);
}

/**
 * @function
 * @name playlistOnclickHandler
 * @returns {void}
 * @description this function calling the setState function in order to globally know what playlist that has been clicked, and thus render the correct view without routing
 */
const playlistOnclickHandler = (clicked) => {
  console.log(clicked);
  setState('playlist_id', clicked.id);
  getPlaylistById(clicked.id);
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
  console.log(clicked);
  setState('album_id', clicked.id);
  getAlbumById(clicked.id);

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
  getArtistById(clicked.id)
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
 * @async
 * @function
 * @name addToPlaylist
 * @returns {(string|void)} if the user fails to provide a valid playlist when adding a song to a playlist this function will return a string.
 * @description this function is handling the logic when a user want to add a song to a playlist.
 */
function addToPlaylist() {

  const playlistNames = playlists.map(x => x.name);
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
    const playlistId = playlists.filter(x => x.name == playlistNames[newSongToPlaylist])[0].id
    const songId = state.song_id

    axios.post('http://localhost:8000/api/createPlaylistSong', {
        song_id: songId,
        playlist_id: playlistId
      })
      .then(response => {
        console.log(response);
        const data = response.data

      })
      .catch(error => {
        console.log(error);
      })


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

   if (window.location.pathname !== "/") {
     setTimeout(function(){document.getElementById('activeUserName').innerHTML = userLoggedIn.firstName + " " + userLoggedIn.lastName}, 200);
   }
  switch (window.location.pathname) {
    case '/browse':
      //render data in html
      getAlbums()
      const browseAlbums = albums.slice(0, 28)
      console.log(browseAlbums[0]);
      document.querySelector('.gridViewContainer').innerHTML = browseAlbums.map(album =>
        `<div class='gridViewItem'>
			 <span id=${album.id} role='link' tabindex='0' onclick='onAlbumClickHandler(this)'>
					 <img src='${album.cover}'>
					 <div class='gridViewInfo '>
							 ${album.title}
					 </div>
				 </span>
				 </div>`
      ).join('')
      break;
		case '/settings':

		document.getElementById('activeUserName').innerHTML = userLoggedIn.firstName + ' ' + userLoggedIn.lastName;
			break;
    case '/search':
    const typeHandler = function(e) {
      console.log(e);
        let searchString = e.target.value;

        const albumRequest = axios.get('http://localhost:8000/api/queryAlbum/?q=' + searchString)
        const songRequest = axios.get('http://localhost:8000/api/querySong/?q=' + searchString)
        const artistRequest = axios.get('http://localhost:8000/api/queryArtist/?q=' + searchString)

        axios.all([albumRequest, songRequest, artistRequest]).then(axios.spread((...responses) => {
            const albumResponse = responses[0].data.slice(0, 5)
            const songResponse = responses[1].data.slice(0, 5)
            const artistResponse = responses[2].data.slice(0, 5)

            console.log(albumResponse);
            console.log(songResponse);
            console.log(artistResponse);

            if (searchString !== '') {
              // render songs
              document.querySelector('.tracklist').innerHTML = songResponse.map((song, index) =>
                `      <li class='tracklistRow'>
                        <div class='trackCount'>
                        <img class='play' src='assets/images/icons/play-white.png' onclick=''>
                          <span class='trackNumber'>${index + 1}</span>
                        </div>
                        <div class='trackInfo'>
                          <span class='trackName'>${song.title}</span>
                          <span class='artistName'>${song.contributors.map(x => x.name).join(', ')}</span>
                        </div>

                        <div class='trackOptions'>
                          <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.id})'>
                        </div>

                        <div class='trackDuration'>
                          <span class='duration'>${(song.duration / 60).toFixed(2)}</span>
                        </div>
                      </li>`
              ).join('')

            //render artist
            document.querySelector('.artistsInnerContainer').innerHTML = artistResponse.map((artist, index) =>
            `
            <div class='gridViewItem'>
                <span role='link' id=${artist.id} tabindex='0' onclick='onArtistClickHandler(this)'>
                  <img src='${artist.picture}'>
                  <div class='gridViewInfo'>${artist.name}</div>
                  </span>
                </div>`
            ).join('')

            //render albums
            document.querySelector('.gridViewInnerContainer').innerHTML = albumResponse.map((album, index) =>
            ` <div class='gridViewItem'>
                <span role='link' id=${album.id} tabindex='0' onclick='onAlbumClickHandler(this)'>
                  <img src='${album.cover}'>
                  <div class='gridViewInfo'>${album.title}</div>
                  </span>
                </div>`
            ).join('')
            }
          })).catch(errors => {
            // react on errors.
          })
    }

    const source = document.querySelector('.searchInput');
    source.addEventListener('input', typeHandler)
    source.addEventListener('propertychange', typeHandler)
      break;
  }
})

var currentPlaylist = [];
var shufflePlaylist = [];
var tempPlaylist = [];
var audioElement;
var mouseDown = false;
var currentIndex = 0;
var repeat = false;
var shuffle = false;
var userLoggedIn;
var timer;
let state = null;
let playlists = JSON.parse(localStorage.playlists);
let albums = JSON.parse(localStorage.albums);
let artist = JSON.parse(localStorage.artist);
let songs = JSON.parse(localStorage.songs);
let users = JSON.parse(localStorage.users);
let playlistSongs = JSON.parse(localStorage.playlistSongs);



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



function setState(key, value) {
  state[key] = value;

  const storageState = JSON.stringify(state);
  localStorage.setItem('state', storageState);
}

const playlistOnclickHandler = (clicked) => {
  setState('playlist_id', clicked.id);
  window.location = 'playlist.html';
}

const songOnclickHandler = (song) => {
  setState('song_id', song);
}

const onAlbumClickHandler = (clicked) => {

  setState('album_id', clicked.id);
  window.location = 'album.html';
}

const onArtistClickHandler = (clicked) => {

  setState('artist_id', clicked.id);
  window.location = 'artist.html';
}

function pushToLocalStorage(object, name) {
  const storageObject = JSON.stringify(object);
  localStorage.setItem(name, storageObject);
}




$(document).click(function(click) {
  var target = $(click.target);

  if (!target.hasClass("item") && !target.hasClass("optionsButton")) {
    hideOptionsMenu();
  }
});

$(window).scroll(function() {
  hideOptionsMenu();
});

function toObject(arr) {
  var rv = {};
  for (var i = 0; i < arr.length; ++i)
    if (arr[i] !== undefined) rv[i] = arr[i];
  return rv;
}


function removeFromPlaylist() {

  const userLoggedIn = users.find(x => x.active === true);
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

function addToPlaylist() {

  const userLoggedIn = users.find(x => x.active === true);

//when the playlist datastructure is right
  //const userPlaylists = playlists.map(x => x.owner == userLoggedIn.userName)
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
    confirmButtonText: 'Skab din playliste',
    confirmButtonColor: '#2FBD5A',
    inputValidator: (value) => {
        if (!value) {
          return 'Du bliver nødt til at vælge en playliste';
        };
      }
  })

    const choosenPlaylist = playlists[newSongToPlaylist];
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

function updateEmail() {

  const newEmail = document.querySelectorAll('.updatedEmail')[0].value;

  const userLoggedIn = users.find(x => x.active === true);

  let usersArray = users

  for (var i = 0; i < usersArray.length; i++) {
    if (usersArray[i].id == userLoggedIn.id) {
        usersArray.splice(i, 1);
    }
  }

  usersArray.push({
        'active': userLoggedIn.active,
        'email': newEmail,
        'firstName': userLoggedIn.firstName,
        'id': userLoggedIn.id,
        'lastName': userLoggedIn.lastName,
        'password': userLoggedIn.password,
        'userName': userLoggedIn.userName
      })

  this.pushToLocalStorage(usersArray, 'users');
}

function updatePassword() {

  const oldPassword = document.querySelectorAll('.oldPassword')[0].value;
  const new1Password = document.querySelectorAll('.newPassword1')[0].value;
  const new2Password = document.querySelectorAll('.newPassword2')[0].value;

  const userLoggedIn = users.find(x => x.active === true);

  if (new1Password == new2Password) {

    let usersArray = users

    for (var i = 0; i < usersArray.length; i++) {
      if (usersArray[i].id == userLoggedIn.id) {
          usersArray.splice(i, 1);
      }
    }
    usersArray.push({
          'active': userLoggedIn.active,
          'email': userLoggedIn.email,
          'firstName': userLoggedIn.firstName,
          'id': userLoggedIn.id,
          'lastName': userLoggedIn.lastName,
          'password': new1Password,
          'userName': userLoggedIn.userName
        })

    this.pushToLocalStorage(usersArray, 'users');

  }
}

function logout() {

  const userLoggedIn = users.find(x => x.active === true);
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == userLoggedIn.id) {
        users.splice(i, 1);
    }
  }

  users.push({
        'active': false,
        'email': userLoggedIn.email,
        'firstName': userLoggedIn.firstName,
        'id': userLoggedIn.id,
        'lastName': userLoggedIn.lastName,
        'passWord': userLoggedIn.passWord,
        'userName': userLoggedIn.userName
      })

  this.pushToLocalStorage(users, 'users');

  window.location = 'index.html';

}

function openPage(url) {

  if (timer != null) {
    clearTimeout(timer);
  }

  if (url.indexOf("?") == -1) {
    url = url + "?";
  }

  var encodedUrl = encodeURI(url + "&userLoggedIn=" + userLoggedIn);
  $("#mainContent").load(encodedUrl);
  $("body").scrollTop(0);
  history.pushState(null, null, url);
}


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

  	const userLoggedIn = users.find(x => x.active === true);

    if (newPlaylist != null) {
  		playlists.push({
  			    'id': JSON.parse(localStorage.playlists).length + 1,
  			    'name': newPlaylist,
  			    'owner': userLoggedIn.userName,
  			    'dateCreated': new Date()
  			  })

  				this.pushToLocalStorage(playlists, 'playlists');

          location.reload();
        };

})()

  }
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

function hideOptionsMenu() {
  var menu = $(".optionsMenu");
  if (menu.css("display") != "none") {
    menu.css("display", "none");
  }
}

function showOptionsMenu(button, songId) {

  songOnclickHandler(songId);

  var songId = $(button).prevAll(".songId").val();
  var menu = $(".optionsMenu");
  var menuWidth = menu.width();
  menu.find(".songId").val(songId);

  var scrollTop = $(window).scrollTop(); //Distance from top of window to top of document
  var elementOffset = $(button).offset().top; //Distance from top of document

  var top = elementOffset - scrollTop;
  var left = $(button).position().left;

  menu.css({
    "top": top + "px",
    "left": left - menuWidth + "px",
    "display": "inline"
  });

}


function formatTime(seconds) {
  var time = Math.round(seconds);
  var minutes = Math.floor(time / 60); //Rounds down
  var seconds = time - (minutes * 60);

  var extraZero = (seconds < 10) ? "0" : "";

  return minutes + ":" + extraZero + seconds;
}

function updateTimeProgressBar(audio) {
  $(".progressTime.current").text(formatTime(audio.currentTime));
  $(".progressTime.remaining").text(formatTime(audio.duration - audio.currentTime));

  var progress = audio.currentTime / audio.duration * 100;
  $(".playbackBar .progress").css("width", progress + "%");
}

function updateVolumeProgressBar(audio) {
  var volume = audio.volume * 100;
  $(".volumeBar .progress").css("width", volume + "%");
}

function playFirstSong() {
  setTrack(tempPlaylist[0], tempPlaylist, true);
}


function Audio() {

  this.currentlyPlaying;
  this.audio = document.createElement('audio');

  this.audio.addEventListener("ended", function() {
    nextSong();
  });

  this.audio.addEventListener("canplay", function() {
    //'this' refers to the object that the event was called on
    var duration = formatTime(this.duration);
    $(".progressTime.remaining").text(duration);
  });

  this.audio.addEventListener("timeupdate", function() {
    if (this.duration) {
      updateTimeProgressBar(this);
    }
  });

  this.audio.addEventListener("volumechange", function() {
    updateVolumeProgressBar(this);
  });

  this.setTrack = function(track) {
    this.currentlyPlaying = track;
    this.audio.src = track.path;
  }

  this.play = function() {
    this.audio.play();
  }

  this.pause = function() {
    this.audio.pause();
  }

  this.setTime = function(seconds) {
    this.audio.currentTime = seconds;
  }

}


//all rendering before ducoument is ready
$(document).ready(function() {

  const userLoggedIn = users.find(x => x.active === true);
  setTimeout(function(){document.getElementById('activeUserName').innerHTML = userLoggedIn.firstName + " " + userLoggedIn.lastName}, 50);


  switch (window.location.pathname) {
    case '/album':

      const albumId = JSON.parse(localStorage.getItem("state")).album_id
      const albumProperty = albums.find(x => x.id == albumId)
      const artistProperty = artist.find(x => x.id == albumProperty.artistId)
      const songProperty = songs.filter(x => x.albumId == albumId)

      //setting values in album.html
      document.getElementById('artistName').innerHTML = artistProperty.name;
      document.getElementById('albumTitle').innerHTML = albumProperty.title;
      document.getElementById('numberOfSongs').innerHTML = songProperty.length;
      document.getElementById('albumCover').src = albumProperty.pathToPicture;

      document.querySelector('.tracklist').innerHTML = songProperty.map((song, index) =>
        `            <li class='tracklistRow'>
			                      <div class='trackCount'>
			                        <img class='play' src='assets/images/icons/play-white.png' onclick=''>
			                        <span class='trackNumber'>${index + 1}</span>
			                      </div>


			                      <div class='trackInfo'>
			                        <span class='trackName'>"${song.title}"</span>
			                        <span class='artistName'>${artist.find(x => x.id == song.artistId).name}</span>
			                      </div>

			                      <div class='trackOptions'>
			                        <input type='hidden' class='songId' value=''>
			                        <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.id})'>
			                      </div>

			                      <div class='trackDuration'>
			                        <span class='duration'>${song.duration}</span>
			                      </div>
			                    </li>`
      ).join('')


      break;
      case '/artist':

        const artistId = JSON.parse(localStorage.getItem("state")).artist_id
        const choosenArtist = artist.find(x => x.id == artistId);
        const artistSongs = songs.filter(x => x.artistId == artistId)
        const artistAlbums = albums.filter(x => x.artistId == artistId)
        //setting values in artist.html
        document.querySelector('.artistName').innerHTML = choosenArtist.name;

        document.querySelector('.tracklist').innerHTML = artistSongs.map((song, index) =>
          `<li class='tracklistRow'>
      					<div class='trackCount'>
      						<img class='play' src='assets/images/icons/play-white.png' onclick='setTrack(\"" . $albumSong->getId() . "\", tempPlaylist, true)'>
      						<span class='trackNumber'>${index + 1}</span>
      					</div>


      					<div class='trackInfo'>
      						<span class='trackName'>${song.title}</span>
      						<span class='artistName'>${artist.find(x => x.id == song.artistId).name}</span>
      					</div>

      					<div class='trackOptions'>
      						<input type='hidden' class='songId' value=''>
      						<img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this)'>
      					</div>

      					<div class='trackDuration'>
      						<span class='duration'>${song.duration}</span>
      					</div>
      				</li>`
        ).join('')

        document.querySelector('.gridViewInnerContainer').innerHTML = artistAlbums.map((album, index) =>
        `<div class='gridViewItem'>
            <span role='link' id=${album.id} tabindex='0' onclick='onAlbumClickHandler(this)'>
              <img src='${album.pathToPicture}'>
              <div class='gridViewInfo'>${album.title}</div>
              </span>
            </div>`
        ).join('')


        break;
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
      document.querySelector('.playlistsGridContainer').innerHTML = JSON.parse(localStorage.playlists).map(playlist =>
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
    case '/playlist':

      const playlistId = JSON.parse(localStorage.getItem("state")).playlist_id
      const playlistProperty = playlists.find(x => x.id == playlistId)
      const songIds = playlistSongs.filter(x => x.playlistId == playlistId).map(item => item.songId)
      const songsInPlaylist = songs.filter(x => songIds.includes(x.id))

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

      break;
		case '/settings':
		const userLoggedIn = users.find(x => x.active === true);
		document.getElementById('activeUserName').innerHTML = userLoggedIn.firstName + ' ' + userLoggedIn.lastName;
			break;
    case '/search':
    const typeHandler = function(e) {

        let searchString = e.target.value;
        const songsMacthingSearchString = songs.filter(x => x.title.includes(searchString))
        const albumsMacthingSearchString = albums.filter(x => x.title.includes(searchString))
        const artistsMacthingSearchString = artist.filter(x => x.name.includes(searchString))

          if (searchString !== '') {
            // render songs
            document.querySelector('.tracklist').innerHTML = songsMacthingSearchString.map((song, index) =>
              `      <li class='tracklistRow'>
                      <div class='trackCount'>
                        <img class='play' src='assets/images/icons/play-white.png' onclick=''>
                        <span class='trackNumber'>${index + 1}</span>
                      </div>
                      <div class='trackInfo'>
                        <span class='trackName'>${song.title}</span>
                        <span class='artistName'>${artist.find(x => x.id === song.artistId).name}</span>
                      </div>

                      <div class='trackOptions'>
                        <input type='hidden' class='songId' value='" . $albumSong->getId() . "'>
                        <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this)'>
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

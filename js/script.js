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
    playlist_id: null
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

const onAlbumClickHandler = (clicked) => {

  setState('album_id', clicked.id);
  window.location = 'album.html';
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

$(document).on("change", "select.playlist", function() {
  var select = $(this);
  var playlistId = select.val();
  var songId = select.prev(".songId").val();

  $.post("includes/handlers/ajax/addToPlaylist.php", {
      playlistId: playlistId,
      songId: songId
    })
    .done(function(error) {

      if (error != "") {
        alert(error);
        return;
      }

      hideOptionsMenu();
      select.val("");
    });
});


function updateEmail(emailClass) {
  var emailValue = $("." + emailClass).val();

  $.post("includes/handlers/ajax/updateEmail.php", {
      email: emailValue,
      username: userLoggedIn
    })
    .done(function(response) {
      $("." + emailClass).nextAll(".message").text(response);
    })


}

function updatePassword(oldPasswordClass, newPasswordClass1, newPasswordClass2) {
  var oldPassword = $("." + oldPasswordClass).val();
  var newPassword1 = $("." + newPasswordClass1).val();
  var newPassword2 = $("." + newPasswordClass2).val();

  $.post("includes/handlers/ajax/updatePassword.php", {
      oldPassword: oldPassword,
      newPassword1: newPassword1,
      newPassword2: newPassword2,
      username: userLoggedIn
    })

    .done(function(response) {
      $("." + oldPasswordClass).nextAll(".message").text(response);
    })


}

function logout() {
  $.post("includes/handlers/ajax/logout.php", function() {
    location.reload();
  });
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

function removeFromPlaylist(button, playlistId) {
  var songId = $(button).prevAll(".songId").val();

  $.post("includes/handlers/ajax/removeFromPlaylist.php", {
      playlistId: playlistId,
      songId: songId
    })
    .done(function(error) {

      if (error != "") {
        alert(error);
        return;
      }

      //do something when ajax returns
      openPage("playlist.php?id=" + playlistId);
    });
}

function createPlaylist() {

  var popup = prompt("Please enter the name of your playlist");

	let users = JSON.parse(localStorage.users)
	const userLoggedIn = users.find(x => x.active === true);

  if (popup != null) {
		playlists.push({
			    'id': JSON.parse(localStorage.playlists).length + 1,
			    'name': popup,
			    'owner': userLoggedIn.userName,
			    'dateCreated': new Date()
			  })

				this.pushToLocalStorage(playlists, 'playlists');

        location.reload();
      };

  }

function deletePlaylist(playlistId) {



        window.location = 'yourMusic.html'

}

function hideOptionsMenu() {
  var menu = $(".optionsMenu");
  if (menu.css("display") != "none") {
    menu.css("display", "none");
  }
}

function showOptionsMenu(button) {
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
			                        <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this)'>
			                      </div>

			                      <div class='trackDuration'>
			                        <span class='duration'>${song.duration}</span>
			                      </div>
			                    </li>`
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
				        						<img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this)'>
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
  }
})

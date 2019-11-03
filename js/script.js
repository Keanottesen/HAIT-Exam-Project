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

//hardcoded albums
const albums =
[
	{
    'id': 1,
    'title': 'Bacon and Eggs',
    'artistId': 2,
    'genreId': 4,
    'pathToPicture': 'assets/images/artwork/clearday.jpg'
  },
  {
    'id': 2,
    'title': 'Pizza head',
    'artistId': 5,
    'genreId': 10,
    'pathToPicture': 'assets/images/artwork/energy.jpg'
  },
  {
    'id': '3',
    'title': 'Summer Hits',
    'artistId': 3,
    'genreId': 1,
    'pathToPicture': 'assets/images/artwork/goinghigher.jpg'
  },
  {
    'id': 4,
    'title': 'The movie soundtrack',
    'artistId': 2,
    'genreId': 9,
    'pathToPicture': 'assets/images/artwork/funkyelement.jpg'
  },
  {
    'id': 5,
    'title': 'Best of the Worst',
    'artistId': 1,
    'genreId': 3,
    'pathToPicture': 'assets/images/artwork/popdance.jpg'
  },
  {
    'id': 6,
    'title': 'Hello World',
    'artistId': 3,
    'genreId': 6,
    'pathToPicture': 'assets/images/artwork/ukulele.jpg'
  },
  {
    'id': 7,
    'title': 'Best beats',
    'artistId': 4,
    'genreId': 7,
    'pathToPicture': 'assets/images/artwork/sweet.jpg'
  }
];

const artist = [
	{
    'id': 1,
    'name': 'Mickey Mouse'
  },
  {
    'id': 2,
    'name': 'Goofy'
  },
  {
    'id': 3,
    'name': 'Bart Simpson'
  },
  {
    'id': 4,
    'name': 'Homer'
  },
  {
    'id': 5,
    'name': 'Bruce Lee'
  }
];

const songs = [
	{
    'id': 1,
    'title': 'Acoustic Breeze',
    'artistId': 1,
    'albumId': 5,
    'genreId': 8,
    'duration': '2:37',
    'path': 'assets/music/bensound-acousticbreeze.mp3',
    'albumOrder': 1,
    'plays': 10
  },
  {
    'id': 2,
    'title': 'A new beginning',
    'artistId': 1,
    'albumId': 5,
    'genreId': 1,
    'duration': '2:35',
    'path': 'assets/music/bensound-anewbeginning.mp3',
    'albumOrder': 2,
    'plays': 4
  },
  {
    'id': 3,
    'title': 'Better Days',
    'artistId': 1,
    'albumId': 5,
    'genreId': 2,
    'duration': '2:33',
    'path': 'assets/music/bensound-betterdays.mp3',
    'albumOrder': 3,
    'plays': 10
  },
  {
    'id': 4,
    'title': 'Buddy',
    'artistId': 1,
    'albumId': 5,
    'genreId': 3,
    'duration': '2:02',
    'path': 'assets/music/bensound-buddy.mp3',
    'albumOrder': 4,
    'plays': 13
  },
  {
    'id': 5,
    'title': 'Clear Day',
    'artistId': 1,
    'albumId': 5,
    'genreId': 4,
    'duration': '1:29',
    'path': 'assets/music/bensound-clearday.mp3',
    'albumOrder': 5,
    'plays': 8
  },
  {
    'id': 6,
    'title': 'Going Higher',
    'artistId': 2,
    'albumId': 1,
    'genreId': 1,
    'duration': '4:04',
    'path': 'assets/music/bensound-goinghigher.mp3',
    'albumOrder': 1,
    'plays': 34
  },
  {
    'id': 7,
    'title': 'Funny Song',
    'artistId': 2,
    'albumId': 4,
    'genreId': 2,
    'duration': '3:07',
    'path': 'assets/music/bensound-funnysong.mp3',
    'albumOrder': 2,
    'plays': 12
  },
  {
    'id': 8,
    'title': 'Funky Element',
    'artistId': 2,
    'albumId': 1,
    'genreId': 3,
    'duration': '3:08',
    'path': 'assets/music/bensound-funkyelement.mp3',
    'albumOrder': 2,
    'plays': 26
  },
  {
    'id': 9,
    'title': 'Extreme Action',
    'artistId': 2,
    'albumId': 1,
    'genreId': 4,
    'duration': '8:03',
    'path': 'assets/music/bensound-extremeaction.mp3',
    'albumOrder': 3,
    'plays': 29
  },
  {
    'id': 10,
    'title': 'Epic',
    'artistId': 2,
    'albumId': 4,
    'genreId': 5,
    'duration': '2:58',
    'path': 'assets/music/bensound-epic.mp3',
    'albumOrder': 3,
    'plays': 17
  },
  {
    'id': 11,
    'title': 'Energy',
    'artistId': 2,
    'albumId': 1,
    'genreId': 6,
    'duration': '2:59',
    'path': 'assets/music/bensound-energy.mp3',
    'albumOrder': 4,
    'plays': 26
  },
  {
    'id': 12,
    'title': 'Dubstep',
    'artistId': 2,
    'albumId': 1,
    'genreId': 7,
    'duration': '2:03',
    'path': 'assets/music/bensound-dubstep.mp3',
    'albumOrder': 5,
    'plays': 22
  },
  {
    'id': 13,
    'title': 'Happiness',
    'artistId': 3,
    'albumId': 6,
    'genreId': 8,
    'duration': '4:21',
    'path': 'assets/music/bensound-happiness.mp3',
    'albumOrder': 5,
    'plays': 3
  },
  {
    'id': 14,
    'title': 'Happy Rock',
    'artistId': 3,
    'albumId': 6,
    'genreId': 9,
    'duration': '1:45',
    'path': 'assets/music/bensound-happyrock.mp3',
    'albumOrder': 4,
    'plays': 8
  },
  {
    'id': 15,
    'title': 'Jazzy Frenchy',
    'artistId': 3,
    'albumId': 6,
    'genreId': 10,
    'duration': '1:44',
    'path': 'assets/music/bensound-jazzyfrenchy.mp3',
    'albumOrder': 3,
    'plays': 11
  },
  {
    'id': 16,
    'title': 'Little Idea',
    'artistId': 3,
    'albumId': 6,
    'genreId': 1,
    'duration': '2:49',
    'path': 'assets/music/bensound-littleidea.mp3',
    'albumOrder': 2,
    'plays': 12
  },
  {
    'id': 17,
    'title': 'Memories',
    'artistId': 3,
    'albumId': 6,
    'genreId': 2,
    'duration': '3:50',
    'path': 'assets/music/bensound-memories.mp3',
    'albumOrder': 1,
    'plays': 6
  },
  {
    'id': 18,
    'title': 'Moose',
    'artistId': 4,
    'albumId': 7,
    'genreId': 1,
    'duration': '2:43',
    'path': 'assets/music/bensound-moose.mp3',
    'albumOrder': 5,
    'plays': 2
  },
  {
    'id': 19,
    'title': 'November',
    'artistId': 4,
    'albumId': 7,
    'genreId': 2,
    'duration': '3:32',
    'path': 'assets/music/bensound-november.mp3',
    'albumOrder': 4,
    'plays': 5
  },
  {
    'id': 20,
    'title': 'Of Elias Dream',
    'artistId': 4,
    'albumId': 7,
    'genreId': 3,
    'duration': '4:58',
    'path': 'assets/music/bensound-ofeliasdream.mp3',
    'albumOrder': 3,
    'plays': 5
  },
  {
    'id': 21,
    'title': 'Pop Dance',
    'artistId': 4,
    'albumId': 7,
    'genreId': 2,
    'duration': '2:42',
    'path': 'assets/music/bensound-popdance.mp3',
    'albumOrder': 2,
    'plays': 11
  },
  {
    'id': 22,
    'title': 'Retro Soul',
    'artistId': 4,
    'albumId': 7,
    'genreId': 5,
    'duration': '3:36',
    'path': 'assets/music/bensound-retrosoul.mp3',
    'albumOrder': 1,
    'plays': 11
  },
  {
    'id': 23,
    'title': 'Sad Day',
    'artistId': 5,
    'albumId': 2,
    'genreId': 1,
    'duration': '2:28',
    'path': 'assets/music/bensound-sadday.mp3',
    'albumOrder': 1,
    'plays': 9
  },
  {
    'id': 24,
    'title': 'Sci-fi',
    'artistId': 5,
    'albumId': 2,
    'genreId': 2,
    'duration': '4:44',
    'path': 'assets/music/bensound-scifi.mp3',
    'albumOrder': 2,
    'plays': 9
  },
  {
    'id': 25,
    'title': 'Slow Motion',
    'artistId': 5,
    'albumId': 2,
    'genreId': 3,
    'duration': '3:26',
    'path': 'assets/music/bensound-slowmotion.mp3',
    'albumOrder': 3,
    'plays': 4
  },
  {
    'id': 26,
    'title': 'Sunny',
    'artistId': 5,
    'albumId': 2,
    'genreId': 4,
    'duration': '2:20',
    'path': 'assets/music/bensound-sunny.mp3',
    'albumOrder': 4,
    'plays': 19
  },
  {
    'id': 27,
    'title': 'Sweet',
    'artistId': 5,
    'albumId': 2,
    'genreId': 5,
    'duration': '5:07',
    'path': 'assets/music/bensound-sweet.mp3',
    'albumOrder': 5,
    'plays': 17
  },
  {
    'id': 28,
    'title': 'Tenderness ',
    'artistId': 3,
    'albumId': 3,
    'genreId': 7,
    'duration': '2:03',
    'path': 'assets/music/bensound-tenderness.mp3',
    'albumOrder': 4,
    'plays': 13
  },
  {
    'id': 29,
    'title': 'The Lounge',
    'artistId': 3,
    'albumId': 3,
    'genreId': 8,
    'duration': '4:16',
    'path': 'assets/music/bensound-thelounge.mp3 ',
    'albumOrder': 3,
    'plays': 7
  },
  {
    'id': 30,
    'title': 'Ukulele',
    'artistId': 3,
    'albumId': 3,
    'genreId': 9,
    'duration': '2:26',
    'path': 'assets/music/bensound-ukulele.mp3 ',
    'albumOrder': 2,
    'plays': 22
  },
  {
    'id': 31,
    'title': 'Tomorrow',
    'artistId': 3,
    'albumId': 3,
    'genreId': 1,
    'duration': '4:54',
    'path': 'assets/music/bensound-tomorrow.mp3 ',
    'albumOrder': 1,
    'plays': 15
  }
];

const playlists = [
	{
    'id': 2,
    'name': 'Playlist2',
    'owner': 'reece-kenney',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 3,
    'name': 'Running Songs',
    'owner': 'reece-kenney',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 4,
    'name': 'Classics',
    'owner': 'reece-kenney',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 5,
    'name': 'Party',
    'owner': 'reece-kenney',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 6,
    'name': 'This is a test',
    'owner': 'reece-kenney',
    'dateCreated': '2017-12-04 00:00:00'
  },
  {
    'id': 7,
    'name': 'Bulldozer',
    'owner': 'reece-kenney',
    'dateCreated': '2017-12-04 00:00:00'
  },
];

const playlistSongs = [
	{
    'id': 6,
    'songId': 17,
    'playlistId': 2,
    'playlistOrder': 4
  },
  {
    'id': 8,
    'songId': 16,
    'playlistId': 5,
    'playlistOrder': 0
  },
  {
    'id': 9,
    'songId': 15,
    'playlistId': 3,
    'playlistOrder': 0
  },
  {
    'id': 10,
    'songId': 14,
    'playlistId': 4,
    'playlistOrder': 0
  },
  {
    'id': 11,
    'songId': 17,
    'playlistId': 3,
    'playlistOrder': 1
  },
  {
    'id': 12,
    'songId': 16,
    'playlistId': 3,
    'playlistOrder': 2
  },
  {
    'id': 13,
    'songId': 16,
    'playlistId': 5,
    'playlistOrder': 1
  },
  {
    'id': 14,
    'songId': 14,
    'playlistId': 3,
    'playlistOrder': 3
  },
  {
    'id': 15,
    'songId': 5,
    'playlistId': 5,
    'playlistOrder': 2
  },
  {
    'id': 16,
    'songId': 23,
    'playlistId': 4,
    'playlistOrder': 1
  },
  {
    'id': 17,
    'songId': 6,
    'playlistId': 2,
    'playlistOrder': 5
  },
  {
    'id': 18,
    'songId': 29,
    'playlistId': 3,
    'playlistOrder': 4
  },
];

let state = null;

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

  if (popup != null) {

    $.post("includes/handlers/ajax/createPlaylist.php", {
        name: popup,
        username: userLoggedIn
      })
      .done(function(error) {

        if (error != "") {
          alert(error);
          return;
        }

        //do something when ajax returns
        openPage("yourMusic.php");
      });

  }

}

function deletePlaylist(playlistId) {
  var prompt = confirm("Are you sure you want to delte this playlist?");

  if (prompt == true) {

    $.post("includes/handlers/ajax/deletePlaylist.php", {
        playlistId: playlistId
      })
      .done(function(error) {

        if (error != "") {
          alert(error);
          return;
        }

        //do something when ajax returns
        openPage("yourMusic.php");
      });


  }
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
      console.log(playlists);
      document.querySelector('.playlistsGridContainer').innerHTML = playlists.map(playlist =>
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
  }
})

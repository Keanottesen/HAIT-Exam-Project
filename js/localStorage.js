//hardcoded albums
let albums = [
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
pushToLocalStorage(albums, 'albums')
let artist = [
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
pushToLocalStorage(artist, 'artist')
let songs = [
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
pushToLocalStorage(songs, 'songs')
let playlists = [
	{
    'id': 1,
    'name': 'Playlist2',
    'ownerUserId': '1',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 2,
    'name': 'Running Songs',
    'ownerUserId': '1',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 3,
    'name': 'Classics',
    'ownerUserId': '1',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 4,
    'name': 'Party',
    'ownerUserId': '1',
    'dateCreated': '2017-08-27 00:00:00'
  },
  {
    'id': 5,
    'name': 'This is a test',
    'ownerUserId': '1',
    'dateCreated': '2017-12-04 00:00:00'
  },
  {
    'id': 6,
    'name': 'Bulldozer',
    'ownerUserId': '2',
    'dateCreated': '2017-12-04 00:00:00'
  },
	{
		'id': 7,
		'name': 'Playlist2',
		'ownerUserId': '2',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 8,
		'name': 'Running Songs',
		'ownerUserId': '2',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 9,
		'name': 'Classics',
		'ownerUserId': '2',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 10,
		'name': 'Party',
		'ownerUserId': '3',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 11,
		'name': 'This is a test',
		'ownerUserId': '3',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 12,
		'name': 'Bulldozer',
		'ownerUserId': '3',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 13,
		'name': 'Playlist2',
		'ownerUserId': '3',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 14,
		'name': 'Running Songs',
		'ownerUserId': '3',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 15,
		'name': 'Classics',
		'ownerUserId': '4',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 16,
		'name': 'Party',
		'ownerUserId': '4',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 17,
		'name': 'This is a test',
		'ownerUserId': '4',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 18,
		'name': 'Bulldozer',
		'ownerUserId': '4',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 19,
		'name': 'Playlist2',
		'ownerUserId': '4',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 20,
		'name': 'Running Songs',
		'ownerUserId': '5',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 21,
		'name': 'Classics',
		'ownerUserId': '5',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 22,
		'name': 'Party',
		'ownerUserId': '5',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 23,
		'name': 'This is a test',
		'ownerUserId': '5',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 24,
		'name': 'Bulldozer',
		'ownerUserId': '5',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 25,
		'name': 'Playlist2',
		'ownerUserId': '1',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 26,
		'name': 'Running Songs',
		'ownerUserId': '1',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 27,
		'name': 'Classics',
		'ownerUserId': '1',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 28,
		'name': 'Party',
		'ownerUserId': '1',
		'dateCreated': '2017-08-27 00:00:00'
	},
	{
		'id': 29,
		'name': 'This is a test',
		'ownerUserId': '1',
		'dateCreated': '2017-12-04 00:00:00'
	},
	{
		'id': 32,
		'name': 'Bulldozer',
		'ownerUserId': '1',
		'dateCreated': '2017-12-04 00:00:00'
	},
];
pushToLocalStorage(playlists, 'playlists')
let playlistSongs = [
	{
    'id': 1,
    'songId': 17,
    'playlistId': 2
  },
  {
    'id': 2,
    'songId': 16,
    'playlistId': 5
  },
  {
    'id': 3,
    'songId': 15,
    'playlistId': 3
  },
  {
    'id': 4,
    'songId': 14,
    'playlistId': 4
  },
  {
    'id': 5,
    'songId': 17,
    'playlistId': 3
  },
  {
    'id': 6,
    'songId': 16,
    'playlistId': 3
  },
  {
    'id': 7,
    'songId': 16,
    'playlistId': 5
  },
  {
    'id': 14,
    'songId': 14,
    'playlistId': 3
  },
  {
    'id': 8,
    'songId': 5,
    'playlistId': 5
  },
  {
    'id': 9,
    'songId': 23,
    'playlistId': 4
  },
  {
    'id': 10,
    'songId': 6,
    'playlistId': 2
  },
  {
    'id': 11,
    'songId': 29,
    'playlistId': 3
  },
];
pushToLocalStorage(playlistSongs, 'playlistSongs')

function pushToLocalStorage(object, name) {
  let storageObject = JSON.stringify(object);
  localStorage.setItem(name, storageObject);
}

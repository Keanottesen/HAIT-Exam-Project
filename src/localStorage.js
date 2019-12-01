// hardcoded users
var users =[
{    'id': 1,
    'firstName': 'Kean',
    'userName': 'Kean1234',
    'lastName': 'Ottesen',
    'email': 'kean_ottesen@hotmail.com',
    'password': '123456789',
    'active': false
},
{    'id': 2,
    'firstName': 'Mikkel',
    'userName': 'Mikkel1234',
    'lastName': 'Svensson',
    'email': 'mikkel_svensson@hotmail.com',
    'password': '123456789',
    'active': false
},
{    'id': 3,
    'firstName': 'Oliver',
    'userName': 'Oliver1234',
    'lastName': 'Larsen',
    'email': 'oliver_larsen@hotmail.com',
    'password': '123456789',
    'active': false
},
{    'id': 4,
    'firstName': 'Svend',
    'userName': 'Svend1234',
    'lastName': 'Sørensen',
    'email': 'Svend_Sørensen@hotmail.com',
    'password': '123456789',
    'active': false
},
{    'id': 5,
    'firstName': 'Lars',
    'userName': 'Lard1234',
    'lastName': 'Larsen',
    'email': 'lars_larsen@hotmail.com',
    'password': '123456789',
    'active': false
}
];
pushToLocalStorage(users, 'users')
//hardcoded albums
let albums = [
	{
    'id': 1,
    'title': 'Bacon and Eggs',
    'artistId': 2,
    'pathToPicture': 'assets/images/artwork/clearday.jpg'
  },
  {
    'id': 2,
    'title': 'Pizza head',
    'artistId': 5,
    'pathToPicture': 'assets/images/artwork/energy.jpg'
  },
  {
    'id': '3',
    'title': 'Summer Hits',
    'artistId': 3,
    'pathToPicture': 'assets/images/artwork/goinghigher.jpg'
  },
  {
    'id': 4,
    'title': 'The movie soundtrack',
    'artistId': 2,
    'pathToPicture': 'assets/images/artwork/funkyelement.jpg'
  },
  {
    'id': 5,
    'title': 'Best of the Worst',
    'artistId': 1,
    'pathToPicture': 'assets/images/artwork/popdance.jpg'
  },
  {
    'id': 6,
    'title': 'Hello World',
    'artistId': 3,
    'pathToPicture': 'assets/images/artwork/ukulele.jpg'
  },
  {
    'id': 7,
    'title': 'Best beats',
    'artistId': 4,
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
    'duration': '2:37',
    'plays': 10
  },
  {
    'id': 2,
    'title': 'A new beginning',
    'artistId': 1,
    'albumId': 5,
    'duration': '2:35',
    'plays': 4
  },
  {
    'id': 3,
    'title': 'Better Days',
    'artistId': 1,
    'albumId': 5,
    'duration': '2:33',
    'plays': 10
  },
  {
    'id': 4,
    'title': 'Buddy',
    'artistId': 1,
    'albumId': 5,
    'duration': '2:02',
    'plays': 13
  },
  {
    'id': 5,
    'title': 'Clear Day',
    'artistId': 1,
    'albumId': 5,
    'duration': '1:29',
    'plays': 8
  },
  {
    'id': 6,
    'title': 'Going Higher',
    'artistId': 2,
    'albumId': 1,
    'duration': '4:04',
    'plays': 34
  },
  {
    'id': 7,
    'title': 'Funny Song',
    'artistId': 2,
    'albumId': 4,
    'duration': '3:07',
    'plays': 12
  },
  {
    'id': 8,
    'title': 'Funky Element',
    'artistId': 2,
    'albumId': 1,
    'duration': '3:08',
    'plays': 26
  },
  {
    'id': 9,
    'title': 'Extreme Action',
    'artistId': 2,
    'albumId': 1,
    'duration': '8:03',
    'plays': 29
  },
  {
    'id': 10,
    'title': 'Epic',
    'artistId': 2,
    'albumId': 4,
    'duration': '2:58',
    'plays': 17
  },
  {
    'id': 11,
    'title': 'Energy',
    'artistId': 2,
    'albumId': 1,
    'duration': '2:59',
    'plays': 26
  },
  {
    'id': 12,
    'title': 'Dubstep',
    'artistId': 2,
    'albumId': 1,
    'duration': '2:03',
    'plays': 22
  },
  {
    'id': 13,
    'title': 'Happiness',
    'artistId': 3,
    'albumId': 6,
    'duration': '4:21',
    'plays': 3
  },
  {
    'id': 14,
    'title': 'Happy Rock',
    'artistId': 3,
    'albumId': 6,
    'duration': '1:45',
    'plays': 8
  },
  {
    'id': 15,
    'title': 'Jazzy Frenchy',
    'artistId': 3,
    'albumId': 6,
    'duration': '1:44',
    'plays': 11
  },
  {
    'id': 16,
    'title': 'Little Idea',
    'artistId': 3,
    'albumId': 6,
    'duration': '2:49',
    'plays': 12
  },
  {
    'id': 17,
    'title': 'Memories',
    'artistId': 3,
    'albumId': 6,
    'duration': '3:50',
    'plays': 6
  },
  {
    'id': 18,
    'title': 'Moose',
    'artistId': 4,
    'albumId': 7,
    'duration': '2:43',
    'plays': 2
  },
  {
    'id': 19,
    'title': 'November',
    'artistId': 4,
    'albumId': 7,
    'duration': '3:32',
    'plays': 5
  },
  {
    'id': 20,
    'title': 'Of Elias Dream',
    'artistId': 4,
    'albumId': 7,
    'duration': '4:58',
    'plays': 5
  },
  {
    'id': 21,
    'title': 'Pop Dance',
    'artistId': 4,
    'albumId': 7,
    'duration': '2:42',
    'plays': 11
  },
  {
    'id': 22,
    'title': 'Retro Soul',
    'artistId': 4,
    'albumId': 7,
    'duration': '3:36',
    'plays': 11
  },
  {
    'id': 23,
    'title': 'Sad Day',
    'artistId': 5,
    'albumId': 2,
    'duration': '2:28',
    'plays': 9
  },
  {
    'id': 24,
    'title': 'Sci-fi',
    'artistId': 5,
    'albumId': 2,
    'duration': '4:44',
    'plays': 9
  },
  {
    'id': 25,
    'title': 'Slow Motion',
    'artistId': 5,
    'albumId': 2,
    'duration': '3:26',
    'plays': 4
  },
  {
    'id': 26,
    'title': 'Sunny',
    'artistId': 5,
    'albumId': 2,
    'duration': '2:20',
    'plays': 19
  },
  {
    'id': 27,
    'title': 'Sweet',
    'artistId': 5,
    'albumId': 2,
    'duration': '5:07',
    'plays': 17
  },
  {
    'id': 28,
    'title': 'Tenderness ',
    'artistId': 3,
    'albumId': 3,
    'duration': '2:03',
    'plays': 13
  },
  {
    'id': 29,
    'title': 'The Lounge',
    'artistId': 3,
    'albumId': 3,
    'duration': '4:16',
    'plays': 7
  },
  {
    'id': 30,
    'title': 'Ukulele',
    'artistId': 3,
    'albumId': 3,
    'duration': '2:26',
    'plays': 22
  },
  {
    'id': 31,
    'title': 'Tomorrow',
    'artistId': 3,
    'albumId': 3,
    'duration': '4:54',
    'plays': 15
  }
];
pushToLocalStorage(songs, 'songs')
let playlists = [
	{
    'id': 1,
    'name': 'Playlist2',
    'ownerUserId': '1',
    'dateCreated': '2019-08-27 00:00:00'
  },
  {
    'id': 2,
    'name': 'Running Songs',
    'ownerUserId': '1',
    'dateCreated': '2019-08-27 00:00:00'
  },
  {
    'id': 3,
    'name': 'Classics',
    'ownerUserId': '1',
    'dateCreated': '2019-08-27 00:00:00'
  },
  {
    'id': 4,
    'name': 'Party',
    'ownerUserId': '1',
    'dateCreated': '2019-08-27 00:00:00'
  },
  {
    'id': 5,
    'name': 'This is a test',
    'ownerUserId': '1',
    'dateCreated': '2019-12-04 00:00:00'
  },
  {
    'id': 6,
    'name': 'Bulldozer',
    'ownerUserId': '2',
    'dateCreated': '2019-12-04 00:00:00'
  },
	{
		'id': 7,
		'name': 'Playlist2',
		'ownerUserId': '2',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 8,
		'name': 'The Best Songs',
		'ownerUserId': '2',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 9,
		'name': 'Hyklere',
		'ownerUserId': '2',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 10,
		'name': 'Mors sange',
		'ownerUserId': '3',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 11,
		'name': 'Old school',
		'ownerUserId': '3',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 12,
		'name': 'Old but gold',
		'ownerUserId': '3',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 13,
		'name': 'Playlist3',
		'ownerUserId': '3',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 14,
		'name': 'New music',
		'ownerUserId': '3',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 15,
		'name': 'Syndere',
		'ownerUserId': '4',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 16,
		'name': 'Feelings',
		'ownerUserId': '4',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 17,
		'name': 'Fredag aften',
		'ownerUserId': '4',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 18,
		'name': 'FEST!',
		'ownerUserId': '4',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 19,
		'name': 'Hip hop',
		'ownerUserId': '4',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 20,
		'name': 'POP',
		'ownerUserId': '5',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 21,
		'name': 'Cry your heart out',
		'ownerUserId': '5',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 22,
		'name': 'School',
		'ownerUserId': '5',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 23,
		'name': 'Koncentration',
		'ownerUserId': '5',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 24,
		'name': 'Yndlings',
		'ownerUserId': '5',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 25,
		'name': 'Søsters',
		'ownerUserId': '1',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 26,
		'name': 'den bedste',
		'ownerUserId': '1',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 27,
		'name': 'poppen',
		'ownerUserId': '1',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 28,
		'name': 'Dansk',
		'ownerUserId': '1',
		'dateCreated': '2019-08-27 00:00:00'
	},
	{
		'id': 29,
		'name': 'Money',
		'ownerUserId': '1',
		'dateCreated': '2019-12-04 00:00:00'
	},
	{
		'id': 32,
		'name': 'Fokus',
		'ownerUserId': '1',
		'dateCreated': '2019-12-04 00:00:00'
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

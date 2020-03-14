/**
 * Class to create a Artist object
  * @class
 */
class Artist {
  /**
   *
   * @param {Object} AlbumInfo Information about the Artist
   */
  constructor(id, name) {
    /**
    * @property {integer} id artist id
    * @property {string} name artist name
    */
    this.id = id;
    this.name = name;
  }

}

function getArtistById(id){

  axios.get('http://localhost:8000/api/artist/?artist_id=' + id)
  .then(response => {
    const data = response.data
    pushToLocalStorage(data, 'choosenArtist')
  })
  .catch(error => {
    // TODO: Catch error
    console.log(error.response);
  })

}

/**
 * object containing an array of alubums
* @typedef {Object} Artist
 */
const choosenArtist = JSON.parse(localStorage.getItem('choosenArtist'))

  console.log(choosenArtist);
/** @function
 * @name renderingAlbum
 * @returns void
 * @description This function is populating the view with all the artist specefic information
 */

$(document).ready(function() {

  /**
   * @description This is populating the artist view whith the choosen artist name
   */
  document.querySelector('.artistName').innerHTML = choosenArtist.artistName;
  document.getElementById('artistPicture').src = choosenArtist.artistPicture;

 document.querySelector('.tracklist').innerHTML = choosenArtist.songs.map((song, index) =>
   `<li class='tracklistRow'>
         <div class='trackCount'>
         <img class='play' src='assets/images/icons/play-white.png' onclick='playSong("${song.api_id}", "${song.songTitle}", "${song.songContributors.join(', ')}", "${song.songAlbumCover}")'>
           <span class='trackNumber'>${index + 1}</span>
         </div>


         <div class='trackInfo'>
           <span class='trackName'>${song.songTitle}</span>
           <span class='artistName'>${song.songContributors.join(', ')}</span>
         </div>

         <div class='trackOptions'>
         <audio id="${song.api_id}" src="${song.songPreview}"></audio>
           <input type='hidden' class='songId' value=''>
           <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.songId})'>
         </div>

         <div class='trackDuration'>
           <span class='duration'>${(song.songDuration / 60).toFixed(2)}</span>
         </div>
       </li>`
 ).join('')

 document.querySelector('.gridViewInnerContainer').innerHTML = choosenArtist.albums.map((album, index) =>
 `<div class='gridViewItem'>
     <span role='link' id=${album.albumId} tabindex='0' onclick='onAlbumClickHandler(this)'>
       <img src='${album.albumCover}'>
       <div class='gridViewInfo'>${album.albumTitle}</div>
       </span>
     </div>`
 ).join('')

 })

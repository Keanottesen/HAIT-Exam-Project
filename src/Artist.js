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

/**
 * Artist id
 * @type {integer}
 */
const artistId = JSON.parse(localStorage.getItem("state")).artist_id
/**
 * object containing an array of alubums
* @typedef {Object} Artist
 */
const choosenArtist = artist.find(x => x.id == artistId);
/**
 * See {@link Song}
 */
const artistSongs = songs.filter(x => x.artistId == artistId)
/**
 * See {@link Album}
 */
const artistAlbums = albums.filter(x => x.artistId == artistId)


/** @function
 * @name renderingAlbum
 * @returns void
 * @description This function is populating the view with all the artist specefic information
 */

$(document).ready(function() {

  /**
   * @description This is populating the artist view whith the choosen artist name
   */
  document.querySelector('.artistName').innerHTML = choosenArtist.name;
  
 document.querySelector('.tracklist').innerHTML = artistSongs.map((song, index) =>
   `<li class='tracklistRow'>
         <div class='trackCount'>
           <span class='trackNumber'>${index + 1}</span>
         </div>


         <div class='trackInfo'>
           <span class='trackName'>${song.title}</span>
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

 document.querySelector('.gridViewInnerContainer').innerHTML = artistAlbums.map((album, index) =>
 `<div class='gridViewItem'>
     <span role='link' id=${album.id} tabindex='0' onclick='onAlbumClickHandler(this)'>
       <img src='${album.pathToPicture}'>
       <div class='gridViewInfo'>${album.title}</div>
       </span>
     </div>`
 ).join('')

 })

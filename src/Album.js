/**
 * Class to create a Artist object
  * @class
 */
class Album{
  /**
   *
   * @param {Object} AlbumInfo Information about the Album
   */
  constructor(id, title, artistId, pathToPicture) {
    /**
    * @property {integer} id album id
    * @property {string} title album title
    * @property {integer} artistId album artistId
    * @property {string} pathToPicture album pathToPicture
    */
    this.id = id;
    this.title = title;
    this.artistId = artistId;
    this.pathToPicture = pathToPicture;
  }

}

/** @function
 * @name renderingAlbum
 * @returns void
 * @description This function is populating the view with all the album specefic information
 */

$(document).ready(function() {
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
})

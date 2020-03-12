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

function getAlbums() {
  axios.get('http://localhost:8000/api/queryAlbum/?q=%')
  .then(response => {
    const data = response.data
    pushToLocalStorage(data, 'albums')
  })
  .catch(error => {
    // TODO: Catch error
    console.log(error);
  })
}

function getAlbumById(id){

  axios.get('http://localhost:8000/api/album/?album_id=' + id)
  .then(response => {
    const data = response.data

    pushToLocalStorage(data, 'choosenAlbum')
  })
  .catch(error => {
    // TODO: Catch error
    console.log(error);
  })

}


$(document).ready(function() {

  const albumProperty = JSON.parse(localStorage.getItem('choosenAlbum'))
  getAlbumSong(albumProperty.api_id)
  const artistProperty = albumProperty.contributors[0]
  const songProperty = JSON.parse(localStorage.getItem('choosenAlbumSongs'))

  //setting values in album.html
  document.getElementById('artistName').innerHTML = artistProperty.name;
  document.getElementById('albumTitle').innerHTML = albumProperty.title;
  document.getElementById('numberOfSongs').innerHTML = songProperty.length;
  document.getElementById('albumCover').src = albumProperty.cover;

  document.querySelector('.tracklist').innerHTML = songProperty.map((song, index) =>
    `            <li class='tracklistRow'>
                        <div class='trackCount'>
                          <span class='trackNumber'>${index + 1}</span>
                        </div>


                        <div class='trackInfo'>
                          <span class='trackName'>"${song.title}"</span>
                          <span class='artistName'>${song.contributors.map(x => x.name)}</span>
                        </div>

                        <div class='trackOptions'>
                          <input type='hidden' class='songId' value=''>
                          <img class='optionsButton' src='assets/images/icons/more.png' onclick='showOptionsMenu(this, ${song.id})'>
                        </div>

                        <div class='trackDuration'>
                          <span class='duration'>${(song.duration / 60).toFixed(2)}</span>
                        </div>
                      </li>`
  ).join('')
})

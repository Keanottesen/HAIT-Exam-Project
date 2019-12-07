const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');



(async () => {
  try {

    const browser = await puppeteer.launch()
    const page = await browser.newPage()





    await page.goto('http://localhost:5000/')



    await expect(page).toFillForm('form[name="loginForm"]', {
    loginEmail: 'kean_ottesen@hotmail.com',
    loginPassword: '123456789',
    })

    await page.screenshot({path: 'test/screenshots/screenshotIndex.png'})
    await page.click('button[name="loginButton"]')
    await page.screenshot({path: 'test/screenshots/screenshotBrowse.png'})

    let localStorage = await page.evaluate(() => {
        let json = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          json[key] = localStorage.getItem(key);
        }
        return json;
      });
      const users = JSON.parse(localStorage.users)

    await expect(page).toMatch('Du vil måske også kunne lide')
    await expect(page).toMatch('Hello World')
    await expect(page).toMatch('Best beats')
    console.log('Browse looks fine');
    await expect(page).toClick('.navItemLink', { text: 'Søg' })
    await page.waitForSelector('.searchInput')
    await expect(page).toFill('.searchInput', 'S')
    console.log('I can search');
    await page.screenshot({path: 'test/screenshots/screenshotSearchResult.png'})
    await page.waitForSelector('.optionsButton')
    await expect(page).toClick('.optionsButton')
    await page.waitForSelector('#playlistOptions')
    await expect(page).toClick('#playlistOptions')
    await page.waitForSelector('.swal2-select')
    await expect(page).toClick('.swal2-confirm')
    await page.screenshot({path: 'test/screenshots/screenshotFailedToPassASong.png'})
    console.log('I failed to parse a song');
    await page.select('.swal2-select', '8')
    await expect(page).toClick('.swal2-confirm')
    console.log('I selected a song to the playlist Dansk');
    await page.waitFor(1000)
    await expect(page).toClick('.navItemLink', { text: 'Din Musik' })
    await page.screenshot({path: 'test/screenshots/screenshotPlaylists.png'})
    console.log('Your music looks fine, see my screenshot');
    await page.waitForSelector('.playlistsGridContainer')
    await page.click('.playlistsGridContainer > div:nth-child(9)')
    await page.waitForSelector('.trackName')
    await expect(page).toMatch('Funny Song')
    await page.screenshot({path: 'test/screenshots/screenshotValidateSongInPlaylist.png'})
    console.log('I found a funny song in your playlist just as i added, it seems great')
    await expect(page).toClick('.button', { text: 'Slet Playliste' })
    await expect(page).toClick('.swal2-confirm')
    console.log('I have just deleted the playlist, now I would like to check the aritst view')
    await page.waitFor(1000)
    await expect(page).toClick('.navItemLink', { text: 'Søg' })
    await page.waitForSelector('.searchInput')
    await expect(page).toFill('.searchInput', 'S')
    await page.click('.artistName > span:nth-child(1)')
    await page.screenshot({path: 'test/screenshots/screenshotArtist.png'})
    console.log('Artist seems fine, check my screenshot, how about looking at his album')
    await page.waitFor(1000)
    await page.click('.gridViewInnerContainer > div:nth-child(1) > span:nth-child(1)')
    await page.screenshot({path: 'test/screenshots/screenshotAlbum.png'})
    console.log('How about changing the users password and email?')
    await expect(page).toClick('.navItemLink', { text: 'Kean Ottesen' })
    await page.waitForSelector('.button')
    await page.click('.buttonItems > button:nth-child(1)')
    await page.screenshot({path: 'test/screenshots/screenshotUserDetails.png'})
    await page.waitForSelector('.updatedEmail')
    await expect(page).toFill('.updatedEmail', 'kno@hotmail.com')
    await expect(page).toFill('.oldPassword', '123456789')
    await expect(page).toFill('.newPassword1', 'kean123456')
    await expect(page).toFill('.newPassword2', 'kean123456')
    console.log('I have written a new password and mail');
    await page.screenshot({path: 'test/screenshots/screenshotUpdateDetails.png'})
    console.log(users.find(x => x.active === true));
    await expect(page).toClick('.button', { text: 'Gem ny email' })
    await expect(page).toClick('.button', { text: 'Gem nyt password' })
    const updatedLocalStorage = await page.evaluate(() => {
        let json = {};
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          json[key] = localStorage.getItem(key);
        }
        return json;
      });
    const updatedUsers = JSON.parse(updatedLocalStorage.users)
    console.log(updatedUsers.find(x => x.active === true));
    if (JSON.stringify(users.find(x => x.active === true)) != JSON.stringify(updatedUsers.find(x => x.active === true))) {
        console.log('it worked, they did not match');
    } else {
        console.log('Damn, try look at the user class one more time');
    }
    console.log('Well it all seems to work fine, lets log out now');
    await expect(page).toClick('.navItemLink', { text: 'Kean Ottesen' })
    await page.waitForSelector('.buttonItems')
    await page.click('.buttonItems > button:nth-child(2)')
    await page.screenshot({path: 'test/screenshots/screenshotAfterLogout.png'})
    await browser.close()
  } catch (e) {
    console.log(e)
  }
})();

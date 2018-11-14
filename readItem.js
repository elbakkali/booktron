
const {BrowserWindow} = require('electron')

let bgItemWin

module.exports = (url, callback) => {
  bgItemWin = new BrowserWindow({
    width: 1000,
    height: 1000,
    show: false,
    webPreferences: {
      offscreen: true
    }
  })

  bgItemWin.loadURL(url)

  bgItemWin.webContents.on('did-finish-load', () => {
    bgItemWin.webContents.capturePage((image) => {
      let screenshot = image.toDataURL()
      let title = bgItemWin.getTitle()
      callback({ title, screenshot, url })
      bgItemWin.close()
      bgItemWin = null
    })
  })
}

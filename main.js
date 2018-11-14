const {app, BrowserWindow} = require('electron')
const mainWindow = require('./mainWindow')

app.on('ready', mainWindow.createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
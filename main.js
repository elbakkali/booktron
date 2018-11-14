const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow')

ipcMain.on('new-item', (e, itemURL) => {
  setTimeout(() => {
    e.sender.send('new-item-success', 'new read item')
  }, 3000);
})

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

const {app, ipcMain} = require('electron')
const mainWindow = require('./mainWindow')
const readItem = require('./readItem')

ipcMain.on('new-item', (e, itemURL) => {
    readItem( itemURL, (item) => {
      e.sender.send('new-item-success', item)
    })
})

app.on('ready', mainWindow.createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) mainWindow.createWindow()
})

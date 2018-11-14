const {BrowserWindow} = require('electron')
exports.win

exports.createWindow = () => {
    this.win = new BrowserWindow({
        width: 500,
        height: 650,
        minWidth: 350,
        maxWidth: 650,
        minHeight: 310
    })

    this.win.webContents.openDevTools()
    this.win.loadFile('./renderer/main.html')

    this.win.on('closed', () => {
        this.win = null
    })
}
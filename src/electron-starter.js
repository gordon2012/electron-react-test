const electron = require('electron');

const { app, BrowserWindow } = electron;

const path = require('path');
const url = require('url');

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({ width: 800, height: 600});

    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow == null) {
        createWindow();
    }
});

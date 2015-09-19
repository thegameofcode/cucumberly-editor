'use babel';

import app from 'app';
import BrowserWindow from 'browser-window';
import path from 'path';

const INDEX_HTML = path.join(process.cwd(), 'src/index.html');
const WINDOW_OPTS = {
  title: 'Cucumberly Editor',
  width: 1400,
  height: 700,
  'min-width': 1000,
  'min-height': 600,
  center: true
};

const debug = process.env.NODE_ENV !== 'production';

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow(WINDOW_OPTS);

  mainWindow.loadUrl(`file://${INDEX_HTML}`);
  mainWindow.show();

  if (debug) {
    mainWindow.openDevTools({/* detach:true */});
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


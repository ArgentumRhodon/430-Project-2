import { app, BrowserWindow, screen } from "electron";

let mainWindow;

const createMainWindow = () => {
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
    minWidth: 1000,
    minHeight: 500,
    webPreferences: {
      contextIsolation: true,
      sandbox: true,
    },
  });
  mainWindow.loadFile("./hosted/index.html");

  // mainWindow.removeMenu();
};

app.whenReady().then(() => {
  createMainWindow();

  /* 
    In MacOS, an application can still be running when all windows are closed.
    If so, create a new window if none are active.
  */
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });

  /*
    On Windows, an application will typically exit when you've closed all active
    windows. However, this is not the case on MacOS. So, only quit the
    application when the last window is closed if not running on MacOS.

    MacOS is called 'Darwin' in the backend.
  */
  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

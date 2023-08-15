const {
  app,
  BrowserWindow
} = require('electron');
const createLive2dWindow = require('./src/utils/live2d.js');

app
  .whenReady()
  .then(() => {
    // 创建live2d
    const live2dWindow = createLive2dWindow();

    app
      .on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createLive2dWindow()
        }
      });
  })
  .catch(err => {
    console.error('启动失败', `启动应用程序时出错，详细原因：${err}`)
      .then(() => {
        app.quit()
      })
  });
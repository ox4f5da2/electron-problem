const Live2DCubismCore = require('../assets/lib/live2dcubismcore.min.js');
window.Live2DCubismCore = Live2DCubismCore;
require('../assets/lib/live2d.min.js');
const PIXI = require('pixi.js');
window.PIXI = PIXI;
const { Live2DModel } = require('pixi-live2d-display');

function createSprite(view, modelLink) {
  return new Promise((resolve, reject) => {
    let timer = null;
    timer = setTimeout(async () => {
      const app = new PIXI.Application({
        view,
        antialias: true,
        autoStart: true,
        backgroundAlpha: 0
      });
      try {
        const model = await Live2DModel.from(modelLink);
        app.stage.addChild(model);
        model.x = document.body.offsetWidth / 2;
        model.y = document.body.offsetHeight / 4;
        model.scale.set(0.3);
        model.on("hit", (hitAreas) => {
          if (hitAreas.includes("body")) {
            model.motion("tap_body");
          }

          if (hitAreas.includes("head")) {
            model.expression();
          }
        });
        clearTimeout(timer);
        resolve(model);
      } catch (error) {
        reject(error);
      }
    }, 2000);

  });
}

function initSprite() {
  const storeLink = "https://cdn.jsdelivr.net/gh/guansss/pixi-live2d-display/test/assets/shizuku/shizuku.model.json";
  const canvas = document.querySelector('#canvas');
  createSprite(canvas, storeLink);
};

module.exports = initSprite;
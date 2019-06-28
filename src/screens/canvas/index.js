import './index.css';
import './draw';
import './tools';
import './frames';
import './layers';
import './shortcuts';

const body = document.getElementsByTagName('body')[0];
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const newCanvas = document.getElementsByClassName('newCanvas');
const animateCanvas = document.getElementById('animateCanvas');
const tool = document.getElementsByClassName('tool');
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const changeColorButton = document.getElementById('changeColorButton');
const frame = document.getElementsByClassName('frame');
const animationFrame = document.getElementById('animationFrame');
const input = document.getElementById('input');
const fpsValue = document.getElementById('fpsValue');
const fullScreen = document.getElementById('fullScreen');
const app = document.getElementById('app');
const landing = document.getElementById('landing');
const createSpriteBtn = document.getElementById('createSpriteBtn');
// const signIn = document.getElementById('signIn');
tool[0].style.border = '3px solid yellow';
frame[0].style.border = '3px solid yellow';
ctx.imageSmoothingEnabled = false;

if (window.screen.width < 1100) {
  landing.style.display = 'none';
  body.innerHTML = '<p>PLEASE, OPEN THIS APP ON DESKTOP!</p>';
  body.className = 'smallScreen';
}

createSpriteBtn.addEventListener('click', () => {
    app.style.display = 'block';
    landing.style.display = 'none';
});
 /*const gif = {
  workers: 2,
  quality: 10,
};
gif.addFrame(newCanvas[0], { delay: 200 });

gif.on('finished',(blob) => {
    window.open(URL.createObjectURL(blob));
});

gif.render();*/

changeColorButton.addEventListener('click', () => {
  const primColorValue = primaryColor.value;
  primaryColor.value = secondaryColor.value;
  secondaryColor.value = primColorValue;
});

input.addEventListener('change', () => {
  fpsValue.innerHTML = `${input.value} FPS`;
});

let intervalId;
let k = 0;

function startInterval(_interval) {
  intervalId = setInterval(() => {
    if (frame.length > 1) {
      if (k + 1 === frame.length) {
        k = 0;
      }
      animateCanvas.getContext('2d').clearRect(0, 0, animateCanvas.width, animateCanvas.height);
      animateCanvas.getContext('2d').imageSmoothingEnabled = false;
      animateCanvas.getContext('2d').drawImage(newCanvas[k], 0, 0, 230, 230);
      k += 1;
    }
  }, _interval);
}
startInterval(1000 / input.value);

input.addEventListener('change', () => {
  fpsValue.innerHTML = `${input.value} FPS`;
  clearInterval(intervalId);
  startInterval(1000 / input.value);
});

fullScreen.addEventListener('click', () => {
  animationFrame.webkitRequestFullScreen();
}, false);

/*const onSignIn = (googleUser) => {
  const profile = googleUser.getBasicProfile();
  console.log(`ID: ${profile.getId()}`);
  console.log(`Name: ${profile.getName()}`);
  console.log(`Image URL: ${profile.getImageUrl()}`);
  console.log(`Email: ${profile.getEmail()}`);
  /!* const { id_token } = googleUser.getAuthResponse();
  console.log(`ID Token: ${id_token}`); *!/
};*/


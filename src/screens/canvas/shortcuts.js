import { cloneCanv, numFrame, addFrameTool } from './index';

const tool = document.getElementsByClassName('tool');
const shortcutsBlock = document.getElementById('shortcutsBlock');
const primaryColor = document.getElementById('primaryColor');
const secondaryColor = document.getElementById('secondaryColor');
const frames = document.getElementById('frames');
const frame = document.getElementsByClassName('frame');
let angle = 0;
const addFrame = document.getElementById('addFrame');
const canvas = document.getElementById('canvas');
const shortcuts = document.getElementById('shortcuts');
const closePopup = document.getElementById('closePopup');

const shortcutsFunc = (e) => {
  if (e.keyCode === 75) {
    shortcutsBlock.style.display = 'block';
    document.getElementsByTagName('header')[0].style.filter = 'brightness(30%)';
    document.getElementsByTagName('main')[0].style.filter = 'brightness(30%)';
    shortcutsBlock.style.filter = 'brightness(100%)';
  }
  if (e.keyCode === 27) {
    shortcutsBlock.style.display = 'none';
    document.getElementsByTagName('header')[0].style.filter = 'brightness(100%)';
    document.getElementsByTagName('main')[0].style.filter = 'brightness(100%)';
    shortcutsBlock.style.filter = 'brightness(50%)';
  }
  if (e.keyCode === 80) {
    for (let k = 0; k < tool.length; k += 1) {
      tool[k].style.border = '3px solid darkslategrey';
    }
    tool[0].style.border = '3px solid yellow';
  }
  if (e.keyCode === 86) {
    for (let k = 0; k < tool.length; k += 1) {
      tool[k].style.border = '3px solid darkslategrey';
    }
    tool[1].style.border = '3px solid yellow';
  }
  if (e.keyCode === 66) {
    for (let k = 0; k < tool.length; k += 1) {
      tool[k].style.border = '3px solid darkslategrey';
    }
    tool[2].style.border = '3px solid yellow';
  }
  if (e.keyCode === 69) {
    for (let k = 0; k < tool.length; k += 1) {
      tool[k].style.border = '3px solid darkslategrey';
    }
    tool[3].style.border = '3px solid yellow';
  }
  if (e.keyCode === 88) {
    const primColorValue = primaryColor.value;
    primaryColor.value = secondaryColor.value;
    secondaryColor.value = primColorValue;
  }
  if (e.keyCode === 78) {
    addFrameTool();
  }
  if (e.keyCode === 82 && frame.length > 1) {
    frames.removeChild(addFrame);
    frames.removeChild(frames.lastChild);
    frames.appendChild(addFrame);
    frame[frame.length - 1].style.border = '3px solid yellow';
    numFrame();
  }
  if (e.keyCode === 68) {
    frames.removeChild(addFrame);
    const newFrame = document.createElement('div');
    newFrame.setAttribute('class', 'frame');
    frames.appendChild(newFrame);
    frames.appendChild(addFrame);
    for (let k = 0; k < frame.length; k += 1) {
      frame[k].style.border = '3px solid darkslategrey';
      if (k > 4) {
        frames.style.overflowY = 'scroll';
      }
    }

    frame[frame.length - 1].style.border = '3px solid yellow';

    cloneCanv();
    numFrame();
  }
  if (e.keyCode === 84) {
    angle += 90;
    if (angle === 360) {
      angle = 0;
    }
    canvas.style.transform = `rotate(${angle}deg)`;
  }
  if (e.keyCode === 77) {
    if (canvas.style.transform === 'scale(-1, 1)') {
      canvas.style.transform = 'scale(1, 1)';
    } else {
      canvas.style.transform = 'scale(-1, 1)';
    }
  }
};
shortcuts.addEventListener('click', () => {
  shortcutsBlock.style.display = 'block';
  document.getElementsByTagName('header')[0].style.filter = 'brightness(30%)';
  document.getElementsByTagName('main')[0].style.filter = 'brightness(30%)';
  shortcutsBlock.style.filter = 'brightness(100%)';
});
closePopup.addEventListener('click', () => {
  shortcutsBlock.style.display = 'none';
  document.getElementsByTagName('header')[0].style.filter = 'brightness(100%)';
  document.getElementsByTagName('main')[0].style.filter = 'brightness(100%)';
  shortcutsBlock.style.filter = 'brightness(50%)';
});
document.addEventListener('keydown', shortcutsFunc);

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const newCanvas = document.getElementsByClassName('newCanvas');
const frames = document.getElementById('frames');
const addFrame = document.getElementById('addFrame');
const numberFrame = document.getElementsByClassName('numberFrame');
const removeFrame = document.getElementsByClassName('removeFrame');
const fieldSizeInput = document.getElementById('fieldSizeInput');
const frame = document.getElementsByClassName('frame');
const coords = document.getElementById('coords');
let fieldSize = fieldSizeInput.value;

const cloneCanv = () => {
  for (let k = 0; k < frame.length; k += 1) {
    const el = frame[k];
    if (el.style.border === '3px solid yellow') {
      el.innerHTML = '<div class="numberFrame">1</div><div class="removeFrame">X</div>\n<canvas class="newCanvas" width="115" height="115"></canvas>';
      /* const createCanvasEl = document.createElement('canvas');
                      createCanvasEl.setAttribute('class', 'newCanvas');
                      createCanvasEl.setAttribute('width', 115);
                      createCanvasEl.setAttribute('height', 115);
                      el.appendChild(createCanvasEl); */
      /* const divEl = document.createElement('div');
              divEl.setAttribute('class', 'numberFrame');
              divEl.innerHTML = '1';
              el.appendChild(divEl);
              const divRemoveEl = document.createElement('div');
              divRemoveEl.setAttribute('class', 'removeFrame');
              divRemoveEl.innerHTML = 'X';
              el.appendChild(divRemoveEl); */
      newCanvas[k].getContext('2d').imageSmoothingEnabled = false;
      newCanvas[k].getContext('2d').drawImage(canvas, 0, 0, 115, 115);
    }
  }
};
cloneCanv();
const numFrame = () => {
  for (let k = 0; k < numberFrame.length; k += 1) {
    numberFrame[k].innerHTML = k + 1;
  }
};
numFrame();

const removeFrameTool = () => {
  frames.removeChild(frames.firstChild);
};
for (let k = 0; k < removeFrame.length; k += 1) {
  removeFrame[k].addEventListener('click', removeFrameTool);
}


cloneCanv();

const addFrameTool = () => {
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  cloneCanv();
  numFrame();
};
addFrame.addEventListener('click', addFrameTool);


canvas.onmousemove = (event) => {
  fieldSize = fieldSizeInput.value;
  const size = canvas.width / fieldSize;
  const x = event.offsetX;
  const y = event.offsetY;
  coords.innerHTML = ` [${fieldSize}x${fieldSize}] ${Math.trunc(x / size)}:${Math.trunc(y / size)}`;
  cloneCanv();
  numFrame();
};
canvas.onmouseout = () => {
  coords.innerHTML = `[${fieldSize}x${fieldSize}]`;
};

export { cloneCanv, numFrame, addFrameTool }

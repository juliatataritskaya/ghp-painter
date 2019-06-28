const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const primaryColor = document.getElementById('primaryColor');
const fieldSizeInput = document.getElementById('fieldSizeInput');
const tool = document.getElementsByClassName('tool');
let fieldSize = fieldSizeInput.value;
const penSizeBtn = document.getElementsByClassName('penSizeBnt');
let penSize = 1;
const mirrorPen = document.getElementById('mirrorPen');
const eraser = document.getElementById('eraserTool');
const bgCanvas = document.getElementById('bgCanvas');
const bgCtx = bgCanvas.getContext('2d');
const coords = document.getElementById('coords');
const changeSizeBtn = document.getElementById('changeSizeBtn');

const draw = (event) => {
  fieldSize = fieldSizeInput.value;
  const size = canvas.width / fieldSize;
  const x = event.offsetX;
  const y = event.offsetY;
  for (let i = 0; i < penSizeBtn.length; i += 1) {
    if (penSizeBtn[i].checked === true) {
      penSize = penSizeBtn[i].value;
      if (tool[0].style.border === '3px solid yellow' || mirrorPen.style.border === '3px solid yellow') {
        ctx.fillRect(Math.trunc(x / size) * size, Math.trunc(y / size) * size, size * penSize + 1, size * penSize + 1);
      }
      if (mirrorPen.style.border === '3px solid yellow') {
        ctx.fillRect(canvas.width - Math.trunc(x / size) * size, Math.trunc(y / size) * size, size * penSize, size * penSize);
      }
    }
  }
  if (eraser.style.border === '3px solid yellow') {
    ctx.clearRect(Math.trunc(x / size) * size, Math.trunc(y / size) * size, size * penSize + 1, size * penSize + 1);
  } else {
    ctx.fillStyle = primaryColor.value;
  }
  ctx.fill();
};

const drawField = () => {
  bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  fieldSize = fieldSizeInput.value;
  if (fieldSize % 2 === 1) {
    fieldSize++;
    fieldSizeInput.value++;
  }
  if (fieldSize > 128) {
    fieldSize = 128;
    fieldSizeInput.value = 128;
  }
  if (fieldSize < 4) {
    fieldSize = 4;
    fieldSizeInput.value = 4;
  }
  coords.innerHTML = `[${fieldSize}x${fieldSize}]`;
  const size = canvas.width / fieldSize;
  for (let i = 0; i <= fieldSize; i += 1) {
    for (let j = 0; j <= fieldSize; j += 1) {
      if (j % 2 === 0) {
        i += 1;
      } else {
        i -= 1;
      }
      bgCtx.fillStyle = '#E1E0E0';
      bgCtx.fillRect(i * size, j * size, size, size);
    }
  }
};
drawField();
changeSizeBtn.addEventListener('click', drawField);
canvas.onmousedown = () => {
  canvas.addEventListener('mousemove', draw);
  canvas.onmouseup = () => {
    canvas.removeEventListener('mousemove', draw);
  };
};

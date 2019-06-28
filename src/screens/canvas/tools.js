const tool = document.getElementsByClassName('tool');
const frame = document.getElementsByClassName('frame');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const primaryColor = document.getElementById('primaryColor');
const paintAll = document.getElementById('paintAll');
const fieldSizeInput = document.getElementById('fieldSizeInput');
let fieldSize = fieldSizeInput.value;
let angle = 0;
const rotate = document.getElementById('rotate');
const mirrorCanvas = document.getElementById('mirrorCanvas');
const secondaryColor = document.getElementById('secondaryColor');
let penSize = 1;


/* for (let k = 0; k < frame.length; k += 1) {
  frame[k].addEventListener('mousedown', () => {
    frame[k].addEventListener('mousemove', (e) => {
      const y = e.offsetY;
      e.target.style.position = 'absolute';
      e.target.style.top = `${y}px`;
    });
  });
  frame[k].addEventListener('mouseup', () => {
    frame[k].onmousemove = null;
    frame[k].onmousedown = null;
  });
} */
const currentTool = (e) => {
  for (let k = 0; k < tool.length; k += 1) {
    tool[k].style.border = '3px solid darkslategrey';
  }
  e.target.style.border = '3px solid yellow';
};
for (let k = 0; k < tool.length; k += 1) {
  tool[k].addEventListener('click', currentTool);
}

const frameTool = (e) => {
  for (let k = 0; k < frame.length; k += 1) {
    frame[k].style.border = '3px solid darkslategrey';
  }
  e.target.style.border = '3px solid yellow';
};
for (let j = 0; j < frame.length; j += 1) {
  frame[j].addEventListener('click', frameTool);
}


const rectangleTool = (event) => {
  if (tool[7].style.border === '3px solid yellow') {
    const x = event.offsetX;
    const y = event.offsetY;
    let x1;
    let y1;
    canvas.addEventListener('mousedown', () => {
      x1 = x;
      y1 = y;
      console.log(x1, y1);
      canvas.addEventListener('mousemove', () => {
        // console.log(x2, y2);
        ctx.fillRect(x1, y1, x, y);
      });
    });
  }
};
canvas.addEventListener('mouseup', rectangleTool);


/*
const rectangleTool = (event) => {
  if (tool[7].style.border === '3px solid yellow') {
    const x = event.offsetX;
    const y = event.offsetY;
    let x1;
    let x2;
    let y1;
    let
      y2;
    canvas.addEventListener('mousedown', () => {
      x1 = x;
      y1 = y;
      console.log(x1, y1);
      canvas.addEventListener('mouseup', () => {
        // console.log(x2, y2);
        ctx.fillRect(x1, y1, x, y);
      });
    });
  }
};
canvas.addEventListener('mousemove', rectangleTool);
*/


const paintAllTool = () => {
  if (paintAll.style.border === '3px solid yellow') {
    const size = canvas.width / fieldSize;
    for (let i = 0; i <= fieldSize; i += 1) {
      for (let j = 0; j <= fieldSize; j += 1) {
        ctx.fillStyle = primaryColor.value;
        ctx.fillRect(i * size, j * size, size + 1, size + 1);
      }
    }
  }
};
canvas.addEventListener('mousedown', paintAllTool);

rotate.addEventListener('mousedown', () => {
  angle += 90;
  if (angle === 360) {
    angle = 0;
  }
  canvas.style.transform = `rotate(${angle}deg)`;
});

mirrorCanvas.addEventListener('click', () => {
  if (canvas.style.transform === 'scale(-1, 1)') {
    canvas.style.transform = 'scale(1, 1)';
  } else {
    canvas.style.transform = 'scale(-1, 1)';
  }
});

canvas.addEventListener('click', (event) => {
  if (tool[4].style.border === '3px solid yellow') {
    const x = event.offsetX;
    const y = event.offsetY;
    const { data } = ctx.getImageData(x, y, 1, 1);
    const rgba = `rgba(${data[0]}, ${data[1]
    }, ${data[2]}, ${data[3] / 255})`;
    const convertToHex = (str) => {
      const raw = str.match(/(\d+)/g);
      let hexr = parseInt(raw[0]).toString(16);
      let hexg = parseInt(raw[1]).toString(16);
      let hexb = parseInt(raw[2]).toString(16);
      hexr = hexr.length === 1 ? `0${hexr}` : hexr;
      hexg = hexg.length === 1 ? `0${hexg}` : hexg;
      hexb = hexb.length === 1 ? `0${hexb}` : hexb;
      secondaryColor.value = primaryColor.value;
      const hex = `#${hexr}${hexg}${hexb}`;
      primaryColor.value = hex;
    };
    convertToHex(rgba);
  }
});

canvas.addEventListener('mousedown', (event) => {
  const size = canvas.width / fieldSize;
  if (tool[10].style.border === '3px solid yellow') {
    const x = event.offsetX;
    const y = event.offsetY;
    const { data } = ctx.getImageData(x, y, 1, 1);
    data[3] -= 25;
    const rgba = `rgba(${data[0]}, ${data[1]
    }, ${data[2]}, ${data[3] / 255})`;
    ctx.clearRect(Math.trunc(x / size) * size, Math.trunc(y / size) * size, size * penSize + 1, size * penSize + 1);
    ctx.fillStyle = rgba;
    ctx.fillRect(Math.trunc(x / size) * size, Math.trunc(y / size) * size, size * penSize + 1, size * penSize + 1);
  }
});
/*
const drawLine = (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  let x1; let y1; let x2; let y2;
  canvas.addEventListener('mousedown', () => {
    x1 = x;
    y1 = y;
    canvas.addEventListener('mouseup', () => {
      x2 = x;
      y2 = y;

      const deltaX = Math.abs(x2 - x1);
      const deltaY = Math.abs(y2 - y1);
      const signX = x1 < x2 ? 1 : -1;
      const signY = y1 < y2 ? 1 : -1;

      let error = deltaX - deltaY;

      while (x1 !== x2 || y1 !== y2) {
        const error2 = error * 2;

        if (error2 > -deltaY) {
          error -= deltaY;
          x1 += signX;
        }
        if (error2 < deltaX) {
          error += deltaX;
          y1 += signY;
        }
      }
    });
  });
};
*/

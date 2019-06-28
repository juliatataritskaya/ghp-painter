const canvasClass = document.getElementsByClassName('canvas');
const canvasBlock = document.getElementById('canvasBlock');
const addLayer = document.getElementById('addLayer');
const removeLayer = document.getElementById('removeLayer');
const layersList = document.getElementById('layersList');

const addLayerTool = () => {
  if (layersList.childNodes.length - 2 < 10) {
    const newLi = document.createElement('li');
    const createCanvasEl = document.createElement('canvas');
    const numberLi = canvasClass.length + 1;
    newLi.innerHTML = `layer ${numberLi}`;
    createCanvasEl.setAttribute('class', 'canvas');
    createCanvasEl.setAttribute('width', 700);
    createCanvasEl.setAttribute('height', 700);
    layersList.appendChild(newLi);
    canvasBlock.appendChild(createCanvasEl);
    canvasClass[0].removeAttribute('id', 'canvas');
    canvasClass[1].id = 'canvas';
  }
};
addLayer.addEventListener('click', addLayerTool);

const removeLayerTool = () => {
  if (layersList.childNodes.length - 2 > 1) {
    layersList.removeChild(layersList.lastChild);
    canvasBlock.removeChild(canvasBlock.lastChild);
  }
};
removeLayer.addEventListener('click', removeLayerTool);

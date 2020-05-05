/* eslint-disable camelcase */
/* eslint-disable max-len */
'use strict';
const graf = {};
const loops = [];
const N = 11;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.font = '17px Times new Roman';
ctx.textBaseline = 'middle';
ctx.textAlign = 'center';


const G = [
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];

const A = [
  [0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
  [1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
];
const  W  = [
  [0,  21, 0,  63, 72, 14, 0,  0,  84, 89, 95],
  [21, 0,  23, 4,  13, 0,  83, 35, 28, 0,  25],
  [0,  23, 0,  44, 45, 0,  0,  28, 0,  57, 0 ],
  [63, 4,  44, 0,  40, 0,  0,  46, 0,  0,  0 ],
  [72, 13, 45, 40, 0,  51, 98, 80, 15, 39, 0 ],
  [14, 0,  0,  0,  51, 0,  0,  25, 0,  0,  0 ],
  [0,  83, 0,  0,  98, 0,  0,  78, 0,  26, 0 ],
  [0,  35, 28, 46, 80, 25, 78, 0,  65, 0,  22],
  [84, 28, 0,  0,  15, 0,  0,  65, 0,  5,  0 ],
  [89, 0,  57, 0,  39, 0,  26, 0,  5,  0,  0 ],
  [95, 25, 0,  0,  0,  0,  0,  22, 0,  0,  0 ],
];

const r = 12;
const rloops = 3 * r / 4;
const fullCopy = x => JSON.parse(JSON.stringify(x));

const calcVertics = (n, P, x0, y0, obj) => {

  const step = P / n;
  const side = P / 3;
  let left = 0;
  let vert = 1;
  let newX = x0;
  let newY = y0;

  ctx.beginPath();
  ctx.setLineDash([5, 15]);
  ctx.moveTo(x0, y0);

  ctx.lineTo(x0 + side / 2, y0 - side * Math.sin(Math.PI / 3));
  ctx.lineTo(x0 + side, y0);
  ctx.lineTo(x0, y0);
  ctx.stroke();

  ctx.setLineDash([]);

  for (let curMargin = 0; curMargin <= side; curMargin += step) {
    Object.defineProperty(obj, `vert${vert}`, {
      value: {
        coords: [newX, newY],
        num: vert,
      },
      enumerable: true,
      writable: true
    });
    newX += step * Math.cos(Math.PI / 3);
    newY += -step * Math.sin(Math.PI / 3);
    left = side - curMargin;
    vert++;
  }

  newX = x0 + side / 2;
  newY = y0 - side * Math.sin(Math.PI / 3);

  for (let curMargin = left; curMargin <= side; curMargin += step) {
    Object.defineProperty(obj, `vert${vert}`, {
      value: {
        coords: [newX, newY],
        num: vert,
      },
      enumerable: true,
      writable: true
    });
    newX += step * Math.cos(Math.PI / 3);
    newY += step * Math.sin(Math.PI / 3);
    left = side - curMargin;
    vert++;
  }

  newX = x0 + side;
  newY = y0;

  for (vert; vert <= n; vert++) {
    newX += -step;

    Object.defineProperty(obj, `vert${vert}`, {
      value: {
        coords: [newX, newY],
        num: vert,
      },
      enumerable: true,
      writable: true
    });
  }
};

calcVertics(11, 2000, 50, 600, graf);

const makeCons = (matrix, obj) => {
  for (const key in obj) {
    obj[key].double = [];
    obj[key].double = [];
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j]) {
        const names = [`vert${i + 1}`, `vert${j + 1}`];
        if (i === j) loops.push(`vert${i + 1}`);
        else if (!matrix[j][i]) {
          obj[names[0]].double.push(`vert${j + 1}`);
        } else {
          obj[names[0]].double.push(`vert${j + 1}`);
        }
      }
    }
  }
};
const center = (x0, y0, p) => {
  const x = x0 + p / 6;
  const y = y0 + p / 6;
  return {
    x,
    y
  };
};

const drawLoops = (arr, obj, x0, y0) => {
  let alpha;
  const xc = center(x0, y0, 1600).x;
  const yc = center(x0, y0, 1600).y;
  for (const i in arr) {
    alpha = Math.atan2(obj[arr[i]].coords[1] - yc, obj[[arr[i]]].coords[0] - xc);
    const R = Math.sqrt((obj[arr[i]].coords[0] - xc) ** 2 + (obj[arr[i]].coords[1] - yc) ** 2) + r;
    const xloops = xc + R * Math.cos(alpha);
    const yloops = yc + R * Math.sin(alpha);
    ctx.beginPath();
    ctx.arc(xloops, yloops, rloops, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
};



function singleAdditionalDots(x0, y0, x1, y1) {
  const alpha = Math.atan2(y1 - y0, x1 - x0);
  return {
    dx: -(r * 5.8) * Math.cos(Math.PI / 2 - alpha),
    dy: (r * 3.8) * Math.sin(Math.PI / 2 - alpha)
  };
}
const single = obj => {
  for (const key in obj) {
    for (let i = 0; i < obj[key].double.length; i++) {
      const fromX = obj[key].coords[0];
      const fromY = obj[key].coords[1];
      const toX = obj[`${obj[key].double[i]}`].coords[0];
      const toY = obj[`${obj[key].double[i]}`].coords[1];

      if (obj[key].num <= obj[`${obj[key].double[i]}`].num) {
        if (Math.abs(obj[key].num - obj[`${obj[key].double[i]}`].num) === 1 || Math.abs(obj[key].num - obj[`${obj[key].double[i]}`].num) === (Object.keys(obj).length - 1)) {
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        } else {
          const { dx, dy } = singleAdditionalDots(fromX, fromY, toX, toY);
          let newX = (fromX + toX) / 2;
          let newY = (fromY + toY) / 2;
          newX -= dx;
          newY += dy;
          ctx.beginPath();
          ctx.moveTo(fromX, fromY);
          ctx.lineTo(newX, newY);
          ctx.lineTo(toX, toY);
          ctx.stroke();
        }
      }
    }
  }
};



const drawVertex = obj => {
  for (const key in obj) {
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.arc(obj[key].coords[0], obj[key].coords[1], r, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'grey';
    ctx.fill();
    ctx.font = '17px Times new Roman';
    ctx.strokeStyle = 'white';
    ctx.strokeText(obj[key].num, obj[key].coords[0], obj[key].coords[1]);
    ctx.strokeStyle = 'black';
    ctx.stroke();
  }
};



function drawCircle(context, x, y, r, fillStyle, strokeStyle) {
  context.fillStyle = fillStyle;
  context.strokeStyle = strokeStyle;
  context.arc(x, y, r, 0, Math.PI * 2);
  context.stroke();
  if (fillStyle) context.fill();
  context.closePath();
}


makeCons(A, graf);


const weightsArr = [];

for (let i = 0; i < W.length; i++) { //add weights
  for (let j = i; j < W[i].length; j++) {
    if (W[i][j]) {
      weightsArr.push({
        weight: W[i][j],
        name: [i + 1, j + 1]
      });
    }
  }
}
weightsArr.sort((a, b) => a.weight - b.weight);






const builder = [];
let components = [];
const compBuilder = [];

const returnConcat = (arr1, arr2) => {
  const copied1 = fullCopy(arr1);
  const copied2 = fullCopy(arr2);
  return copied1.concat(copied2);
};

const Krskl = (weights, comp, curr = 0) => {
  const v1 = weights[curr].name[0];
  const v2 = weights[curr].name[1];
  const compCopy = fullCopy(comp);
  let flag = true;
  for (let i = 0; i < compCopy.length; i++) { // if both in components
    if (compCopy[i].includes(v1)) {
      for (let j = 0; j < compCopy.length; j++) {
        if (compCopy[j].includes(v2)) {
          flag = false;
          if (i === j) continue;
          compBuilder[i] = [...compBuilder[i], ...compBuilder[j], [v1, v2]];
          compCopy[i] = returnConcat(compCopy[i], compCopy[j]);
          compBuilder.splice(j, 1);
          compCopy.splice(j, 1);
          builder.push(fullCopy(compBuilder));
        }
      }
    }
  }
  if (flag) { // if 1 in components
    for (let i = 0; i < compCopy.length; i++) {
      if (compCopy[i].includes(v1)) {
        compCopy[i].push(v2);
        compBuilder[i] = [...compBuilder[i], [v1, v2]];
        flag = false;
        builder.push(fullCopy(compBuilder));
        break;
      } else if (compCopy[i].includes(v2)) {
        compCopy[i].push(v1);
        compBuilder[i] = [...compBuilder[i], [v1, v2]];
        flag = false;
        builder.push(fullCopy(compBuilder));
        break;
      }
    }
  }
  if (flag) { //if new
    compCopy.push([v1, v2]);
    compBuilder.push([[v1, v2]]);
    builder.push(fullCopy(compBuilder));
  }
  components = fullCopy(compCopy);
  if (curr === weights.length - 1) return;
  Krskl(weights, compCopy, curr + 1);
};

Krskl(weightsArr, []);



const drawWeigths = (matrix, obj) => {
  for (let i = 0; i < A.length; i++) {
    for (let j = i; j < A.length; j++) {
      if (matrix[i][j]) {
        const w = matrix[i][j];
        const fromX = obj[`vert${i + 1}`].coords[0];
        const fromY = obj[`vert${i + 1}`].coords[1];
        const toX = obj[`vert${j + 1}`].coords[0];
        const toY = obj[`vert${j + 1}`].coords[1];
        const { dx, dy } = singleAdditionalDots(fromX, fromY, toX, toY);
        let newX = (fromX + toX) / 2;
        let newY = (fromY + toY) / 2;
        newX -= dx;
        newY += dy;

        if (Math.abs(obj[`vert${i + 1}`].num - obj[`vert${j + 1}`].num) === 1 || Math.abs(obj[`vert${i + 1}`].num - obj[`vert${j + 1}`].num) === (Object.keys(obj).length - 1)) {
          ctx.beginPath();
          ctx.strokeStyle = 'black';
          ctx.fillStyle = 'white';
          ctx.arc((fromX + toX) / 2, (fromY + toY) / 2, 8, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.font = '12px Arial';
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(w, (fromX + toX) / 2, (fromY + toY) / 2);
        } else {
          ctx.beginPath();
          ctx.strokeStyle = 'black';
          ctx.fillStyle = 'white';
          ctx.arc(newX, newY, 8, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.font = '12px Arial';
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'center';
          ctx.fillText(w, newX, newY);
        }
      }
    }
  }
};


const iter = builder[Symbol.iterator]();

const colors = ['DeepPink', 'Cyan', 'Blue'];

const halt = () => {
  const currArr = iter.next().value;
  currArr.forEach((component, compIndex) => {
    component.forEach(pair => { //draw colored
      const from = graf[`vert${pair[0]}`];
      const to = graf[`vert${pair[1]}`];
      const fromX = from.coords[0];
      const fromY = from.coords[1];
      const toX = to.coords[0];
      const toY = to.coords[1];


      if (Math.abs(from.num - to.num) === 1 || Math.abs(from.num - to.num) === (Object.keys(graf).length - 1)) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = colors[(compIndex >= colors.length) ? 'yellow' : compIndex];
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        drawVertex(graf);
        drawWeigths(W, graf);
      } else {
        const { dx, dy } = singleAdditionalDots(fromX, fromY, toX, toY);
        let newX = (fromX + toX) / 2;
        let newY = (fromY + toY) / 2;
        newX -= dx;
        newY += dy;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.strokeStyle = colors[(compIndex >= colors.length) ? 'yellow' : compIndex];
        ctx.moveTo(fromX, fromY);
        ctx.lineTo(newX, newY);
        ctx.lineTo(toX, toY);
        ctx.stroke();
        drawVertex(graf);
        drawWeigths(W, graf);
      }
    });
  });


};



drawLoops(loops, graf, 75, 100);
single(graf);
drawVertex(graf);
drawWeigths(W, graf);

const treeMatrix = [];
for (let i = 0; i < N; i++) {
  treeMatrix[i] = [];
  for (let j = 0; j < N; j++) {
    treeMatrix[i][j] = 0;
  }
}

builder[builder.length - 1][0].forEach(pair => {
  treeMatrix[pair[0] - 1][pair[1] - 1] = A[pair[0] - 1][pair[1] - 1];
  treeMatrix[pair[1] - 1][pair[0] - 1] = A[pair[0] - 1][pair[1] - 1];
});
console.log(treeMatrix);
for (const key in graf) { //draw vertics
  ctx.beginPath();
  drawCircle(ctx, graf[key].x, graf[key].y, r, 'grey', 'black');
}
for (let i = 1; i <= N; i++) { //draw text
  ctx.font = '20px Arial';
  ctx.fillStyle = 'black';
  ctx.strokeStyle = 'black';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.strokeText(i, graf[`vert${i}`].x, graf[`vert${i}`].y);
  ctx.fillText(i, graf[`vert${i}`].x, graf[`vert${i}`].y);
}


let treeObj = {};
{
  const n = A.length;
  const x = 900;
  const y = 325;
  const r = 230;
  const alpha = 2 * Math.PI / n;

  const vertics = {};
  let i = 1;

  for (let angle = 0; i <= n; angle += alpha) {
    const newX = x + r * Math.cos(angle);
    const newY = y + r * Math.sin(angle);
    vertics[`vert${i}`] = {};
    vertics[`vert${i}`].coords = [];
    vertics[`vert${i}`].coords.push(newX);
    vertics[`vert${i}`].coords.push(newY);
    vertics[`vert${i}`].num = graf[`vert${i}`].num;
    i++;
  }
  treeObj = vertics;
}
makeCons(treeMatrix, treeObj);

const drawNewOrdoubleCons = obj => {
  for (const key in obj) {
    for (let i = 0; i < obj[key].double.length; i++) {
      const fromX = obj[key].coords[0];
      const fromY = obj[key].coords[1];
      //console.log(obj[`${obj[key].double[i]}`].number);
      const toX = obj[`${obj[key].double[i]}`].coords[0];
      const toY = obj[`${obj[key].double[i]}`].coords[1];
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.strokeStyle = 'black';
      ctx.lineTo(toX, toY);
      ctx.stroke();





      ctx.font = '15px Arial';
      ctx.fillStyle = 'red';
      ctx.strokeStyle = 'black';
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      console.log(W);
    }
  }
};

drawNewOrdoubleCons(treeObj);
drawVertex(treeObj);

for (let i = 0; i < N; i++) { // draw weights
  for (let j = i; j < N; j++) {
    if (W[i][j]) {
      if (treeMatrix[i][j]) {
        const wgh = W[i][j];
        const from = treeObj[`vert${i + 1}`];
        const to = treeObj[`vert${j + 1}`];
        ctx.font = '15px Arial';
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillText(wgh, (from.coords[0] + to.coords[0]) / 2, (from.coords[1] + to.coords[1]) / 2);
      }
    }
  }
}

ctx.fillStyle = 'black';
ctx.font = '22px Times new Roman';
ctx.fillText('Adjacency matrix', 250, 700);
for (let i = 0; i < G.length; i++) {
  ctx.font = '24px Times new Roman';
  ctx.fillText(G[i], 250, 700 + (i + 1) * 25);
}

ctx.font = '22px Times new Roman';
ctx.fillText('Adjacency matrix of non-or', 600, 700);
for (let i = 0; i < A.length; i++) {
  ctx.font = '24px Times new Roman';
  ctx.fillText(A[i], 600, 700 + (i + 1) * 25);
}

ctx.font = '22px Times new Roman';
ctx.fillText('Adjacency matrix of tree', 900, 700);
for (let i = 0; i < treeMatrix.length; i++) {
  ctx.font = '24px Times new Roman';
  ctx.fillText(treeMatrix[i], 900, 700 + (i + 1) * 25);
}







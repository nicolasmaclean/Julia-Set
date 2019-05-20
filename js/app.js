const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const mandelbrotRad = document.getElementById('mandelbrot');
const juliaRad = document.getElementById('julia');

const rgbBox = document.getElementById('rgb');
const hslBox = document.getElementById('hsl');

const iterationsText = document.getElementById('iterationsText');
const iterationsRange = document.getElementById('iterationsRange');

const minColorText = document.getElementById('minColorText');
const maxColorText = document.getElementById('maxColorText');
const minColorRange = document.getElementById('minColorRange');
const maxColorRange = document.getElementById('maxColorRange');

const escapeText = document.getElementById('escapeText');
const escapeRange = document.getElementById('escapeRange');

const aText = document.getElementById('aText');
const aRange = document.getElementById('aRange');
const bText = document.getElementById('bText');
const bRange = document.getElementById('bRange');

let fractal;
let pixels;
let fractalType = false;
var iterations = 100;
var infinLimit = 16;
var hslBot = 0;
var hslTop = 360;
var hsl = false;
var ca = -.2321;
var cb = -0.835;

mandelbrotRad.addEventListener('change', () => {
    fractalType = false;
    init();
})

juliaRad.addEventListener('change', () => {
    fractalType = true;
    init();
})

rgbBox.addEventListener('change', () => {
    hsl = false;
    init();
})

hslBox.addEventListener('change', () => {
    hsl = true;
    init();
})

iterationsText.addEventListener('input', () => {
    iterations = iterationsText.value;
    iterationsRange.value = iterations;
    init();
})

iterationsRange.addEventListener('input', () => {
    iterations = iterationsRange.value;
    iterationsText.value = iterations;
    init();
})

minColorRange.addEventListener('input', () => {
    hslBot = minColorRange.value;
    minColorText.value = hslBot;
    init();
})

minColorText.addEventListener('input', () => {
    hslBot = minColorText.value;
    minColorRange.value = hslBot;
})

maxColorRange.addEventListener('input', () => {
    hslTop = maxColorRange.value;
    maxColorText.value = hslTop;
    init();
})

escapeText.addEventListener('input', () => {
    infinLimit = escapeText.value;
    escapeRange.value = infinLimit;
    init();
})

escapeRange.addEventListener('input', () => {
    infinLimit = escapeRange.value;
    escapeText.value = infinLimit;
    init();
})

aText.addEventListener('input', () => {
    ca = parseFloat(aText.value);
    aRange.value = ca;
    init();
})

aRange.addEventListener('input', () => {
    ca = parseFloat(aRange.value);
    aText.value = ca;
    init();
})

bText.addEventListener('input', () => {
    cb = parseFloat(bText.value);
    bRange.value = cb;
    init();
})

bRange.addEventListener('input', () => {
    cb = parseFloat(bRange.value);
    bText.value = cb;
    init();
})

iterationsRange.max = 200;
iterationsRange.value = iterations;
iterationsText.value = iterations;

minColorRange.max = hslTop;
maxColorRange.max = hslTop;

minColorRange.value = hslBot;
minColorText.value = hslBot;
maxColorRange.value = hslTop;
maxColorText.value = hslTop;

escapeRange.value = infinLimit;
escapeText.value = infinLimit;

aRange.min = -2;
aRange.max = 1;
aRange.step = .01;
bRange.min = -1;
bRange.max = 1;
bRange.step = .01;

aRange.defaultValue = ca;
aText.defaultValue = ca;
bRange.defaultValue = cb;
bText.defaultValue = cb;

function init() {
    // if(canvas.width > canvas.height){
    //     canvas.height = window.innerHeight;
    //     canvas.width = canvas.height;
    // } else {
    //     canvas.width = window.innerWidth;
    //     canvas.height = canvas.width;
    // }
    canvas.width = 500;
    canvas.height = 500;

    c.fillStyle = "#282828";
    c.fillRect(0, 0, canvas.width, canvas.height);

    pixels = c.createImageData(canvas.width, canvas.height);
    if(fractalType){
        fractal = new Julia(pixels, canvas.width, canvas.height);
    } else {
        fractal = new Mandelbrot(pixels, canvas.width, canvas.height);
    }
    
    fractal.draw();
}

window.addEventListener('resize', init);

init();

//helper functions
function map(n, start1, start2, stop1, stop2){
    return (n - start1) / (start2 - start1) * (stop2 - stop1) + stop1;
}

function hslToRgb(h, s, l){
    s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
    if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return {
        r: r,
        g: g,
        b: b
    }
}
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const mandelbrotRad = document.getElementById('mandelbrot');
const juliaRad = document.getElementById('julia');
const multiRad = document.getElementById('multi');
const coolRad = document.getElementById('cool');

const rgbBox = document.getElementById('rgb');
const hslBox = document.getElementById('hsl');
const hueBox = document.getElementById('huemode')

const iterationsText = document.getElementById('iterationsText');
const iterationsRange = document.getElementById('iterationsRange');

const colorText = document.getElementById('colorText');
const colorRange = document.getElementById('colorRange');

const escapeText = document.getElementById('escapeText');
const escapeRange = document.getElementById('escapeRange');

const aText = document.getElementById('aText');
const aRange = document.getElementById('aRange');
const bText = document.getElementById('bText');
const bRange = document.getElementById('bRange');

let fractal;
let pixels;
let fractalType = 0;
var iterations = 100;
var infinLimit = 16;
var hue = 360;
var hsl = 0;
var ca = -.2321;
var cb = -0.835;

mandelbrotRad.addEventListener('change', () => {
    fractalType = 0;
    init();
})

juliaRad.addEventListener('change', () => {
    fractalType = 1;
    init();
})

multiRad.addEventListener('change', () => {
    fractalType = 2;
    init();
})

coolRad.addEventListener('change', () => {
    fractalType = 3;
    init();
})

rgbBox.addEventListener('change', () => {
    hsl = 0;
    init();
})

hslBox.addEventListener('change', () => {
    hsl = 1;
    init();
})

hueBox.addEventListener('change', () => {
    hsl = 2;
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

colorRange.addEventListener('input', () => {
    hue = colorRange.value;
    colorText.value = hue;
    init();
})

colorText.addEventListener('input', () => {
    hue = colorText.value;
    colorRange.value = hue;
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

colorRange.max = 0;
colorRange.max = 360;

colorRange.value = hue;
colorText.value = hue;

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
    if(window.innerHeight > 500){
        canvas.height = 500;
        canvas.width = 500;
    } else {
        canvas.height = window.innerHeight;
        canvas.width = canvas.height;
    }

    c.fillStyle = "#282828";
    c.fillRect(0, 0, canvas.width, canvas.height);

    pixels = c.createImageData(canvas.width, canvas.height);
    switch(fractalType){
        case 0: fractal = new Mandelbrot(pixels, canvas.width, canvas.height); break;
        case 1: fractal = new Julia(pixels, canvas.width, canvas.height); break;
        case 2: fractal = new Z3(pixels, canvas.width, canvas.height); break;
        case 3: fractal = new Cool(pixels, canvas.width, canvas.height); break;
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
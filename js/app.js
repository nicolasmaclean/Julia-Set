const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

let mandelbrot;

function init() {
    if(canvas.width > canvas.height){
        canvas.height = window.innerHeight;
        canvas.width = canvas.height;
    } else {
        canvas.width = canvas.innerWidth;
        canvas.height = canvas.width;
    }

    c.fillStyle = "#282828";
    c.fillRect(0, 0, canvas.width, canvas.height);

    let pixels = c.createImageData(canvas.width, canvas.height);
    mandelbrot = new Mandelbrot(pixels, canvas.width, canvas.height);

    mandelbrot.draw();
}

window.addEventListener('resize', init);

init();
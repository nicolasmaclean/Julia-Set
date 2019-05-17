const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    c.fillStyle = "#fff";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "#fff";
    c.fillRect(0, 0, canvas.width, canvas.height);
}

window.addEventListener('resize', init);

init();
animate();
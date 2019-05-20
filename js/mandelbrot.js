class Mandelbrot {
    constructor(pixels, width, height) {
        this.pixels = pixels;
        for(let x = 0; x < width; x++){
            for(let y = 0; y < height; y++){
                let a = map(x, 0, width, -2, 2);
                let b = map(y, 0, height, -2, 2);

                let ca = a;
                let cb = b;

                let n = 0;
                let z = a+b;

                while(Math.abs(z) < infinLimit && n < iterations){
                    let a2 = a*a;
                    let b2 = b*b;
                    b = 2*a*b + cb;
                    a = a2-b2 + ca;

                    // if(Math.abs(a + b) > infinLimit){
                    //     break;
                    // }

                    n++;
                    z = a + b;
                }

                // n = (a+b)%255;
                // n = ((a+b)*(a+b))%255;
                let pixInd = (y * width + x) * 4;
                if(hsl){
                    let brightness = map(n, 0, iterations, hslBot, hslTop);
                    if(n == iterations){
                        brightness = 0;
                    }
                    brightness = brightness;
                    
                    let rgb = hslToRgb(brightness, 100, 50);
                    this.pixels.data[pixInd] = rgb.r; //red
                    this.pixels.data[pixInd+1] = rgb.g; //green
                    this.pixels.data[pixInd+2] = rgb.b; //blue
                    this.pixels.data[pixInd+3] = 255; //alpha
                } else {
                    // let brightness = map(n, 0, iterations, 0, 255);
                    let brightness = map(n, 0, iterations, 0, 255);
                    if(n == iterations){
                        brightness = 0;
                    }
                    
                    this.pixels.data[pixInd] = brightness; //red
                    this.pixels.data[pixInd+1] = brightness; //green
                    this.pixels.data[pixInd+2] = brightness; //blue
                    this.pixels.data[pixInd+3] = 255; //alpha
                }

            }
        }
    }

    draw() {
        c.putImageData(this.pixels, 0, 0);
    }
}
class Cool {
    constructor(pixels, width, height) {
        this.pixels = pixels;
        for(let x = 0; x < width; x++){
            for(let y = 0; y < height; y++){
                var a = map(x, 0, width, -2, 2);
                var b = map(y, 0, height, -2, 2);
                
                // let ca = a;
                // let cb = b;
                
                let n = 0;
                let z = a+b;
                let dz = 0;
                
                while(Math.abs(z) < infinLimit && n < iterations){
                    let da = a;
                    let db = b;
                    // let dz = 2*z;
                    let a2 = a*a;
                    let b2 = b*b;
                    let a3 = a*a*a;
                    let b3 = b*b*b;
                    let na = a3 - b2*a - 2*a*b2;
                    let nb = 2*a2*b + a2*b - b3;
                    a = (na + ca)/da;
                    b = (nb + cb)/db;
                    
                    z = a+b;
                    n++;
                }
                
                // n = (a+b)%255;
                // n = ((a+b)*(a+b))%255;
                let pixInd = (y * width + x) * 4;
                if(hsl){
                    let brightness = map(z, 0, iterations, 0, 360);
                    if(n == iterations){
                        brightness = 0;
                    }
                    
                    let rgb;
                    if(hsl === 1){
                        rgb = hslToRgb(brightness, 100, 50);
                    } else if(hsl ===2){
                        rgb = hslToRgb(hue, 100, brightness);
                    }
                    
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
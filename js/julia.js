class Julia {
    constructor(pixels, width, height) {
        this.pixels = pixels;
        let ca = -.2321;
        let cb = -0.835;
        for(let x = 0; x < width; x++){
            for(let y = 0; y < height; y++){
                let a = map(x, 0, width, -2, 2);
                let b = map(y, 0, height, -2, 2);

                let n = 0;

                while(n < iterations){
                    let a2 = a*a;
                    let b2 = b*b;
                    b = 2*a*b + cb;
                    a = a2-b2 + ca;

                    if(Math.abs(a + b) > infinLimit){
                        break;
                    }

                    n++;
                }

                // n = (a+b)%255;
                // n = ((a+b)*(a+b))%255;
                let brightness = map(n, 0, iterations, 0, 255);
                if(n == iterations){
                    brightness = 0;
                }
                
                var pixInd = (y * width + x) * 4;
                this.pixels.data[pixInd] = brightness; //red
                this.pixels.data[pixInd+1] = brightness; //green
                this.pixels.data[pixInd+2] = brightness; //blue
                this.pixels.data[pixInd+3] = 255; //alpha
            }
        }
    }

    draw() {
        c.putImageData(this.pixels, 0, 0);
    }
}

function map(n, start1, start2, stop1, stop2){
    return (n - start1) / (start2 - start1) * (stop2 - stop1) + stop1;
}
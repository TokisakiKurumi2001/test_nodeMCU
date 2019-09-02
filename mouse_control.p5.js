var canvas;
var size;

function setup()
{
    // get the size to draw a canvas according to the size of screen of device
    size = document.querySelector("#p5_mouse_control").offsetWidth;
    // add the canvas into a parent dir whose's id is `p5_mouse_control`
    canvas = createCanvas(size, size).parent("p5_mouse_control");

    colorMode(HSL);
    background(236,31,20);
}

function draw()
{
    noStroke();
    // big circle
    fill(236,54,19);
    ellipse(width/2, height/2, width, height);

    // small cicle
    fill(236,54,16);
    ellipse(width/2, height/2, width/2, height/2);

    // all the buttons has the color white
    fill(236, 21, 94);

    // top button in big circle
    triangle(width/2, height * 0.05, width/2*0.85, height * 0.1, width/2*1.15, height * 0.1);

    // bottom button in big circle
    triangle(width/2, height * 0.95, width/2*0.85, height * 0.9, width/2*1.15, height * 0.9);

    // left button in big circle
    triangle(width * 0.05, height/2, width * 0.1, height/2*0.85, width * 0.1, height/2*1.15);

    // right button in big circle
    triangle(width * 0.95, height/2, width * 0.9, height/2*0.85, width * 0.9, height/2*1.15);

    // up button in small circle
    triangle(width/2, height * 0.05 + height/2*0.65, width/2*0.85, height * 0.1 + height/2*0.65, width/2*1.15, height * 0.1 + height/2*0.65);

    // down button in small circle
    triangle(width/2, height * 0.95 - height/2*0.65, width/2*0.85, height * 0.9 - height/2*0.65, width/2*1.15, height * 0.9 - height/2*0.65);

    // a line to distinguish two half part of the small circle
    stroke(236, 21, 94);
    line(width/4, height/2, width*3/4, height/2);
}
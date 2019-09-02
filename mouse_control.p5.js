var canvas;
var size;

function setup()
{
    size = document.querySelector("#p5_mouse_control").offsetWidth;
    canvas = createCanvas(size, size).parent("p5_mouse_control");
    colorMode(HSL);
    background(236,31,20);
}

function draw()
{
    noStroke();
    fill(236,54,19);
    ellipse(width/2, height/2, width, height);

    fill(236,54,16);
    ellipse(width/2, height/2, width/2, height/2);
}
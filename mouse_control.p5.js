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
    fill(74,100,100);
    ellipse(width/2, height/2, width, height);
}
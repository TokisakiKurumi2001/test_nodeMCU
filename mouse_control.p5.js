var canvas;
var size;
var links = new Array(6);

function setup()
{
    // get the size to draw a canvas according to the size of screen of device
    size = document.querySelector("#p5_mouse_control").offsetWidth;
    // add the canvas into a parent dir whose's id is `p5_mouse_control`
    canvas = createCanvas(size, size).parent("p5_mouse_control");

    // initialize some links to the mouse

    // Top link in big circle -> mouse goes up
    links[0] = createElement("a","Up").position(width*0.475, height * 0.05).attribute("href","http://192.168.1.90/keyboard?params=$u");
    links[0].attribute("data-link","u").attribute("class","links").attribute("target","_blank").parent("links_control");

    // Bottom link in big circle -> mouse goes down
    links[1] = createElement("a","Down").position(width*0.475, height * 0.90).attribute("href","http://192.168.1.90/keyboard?params=$d");
    links[1].attribute("data-link","d").attribute("class","links").attribute("target","_blank").parent("links_control");

    // Left link in big circle -> mouse goes left
    links[2] = createElement("a","Left").position(width * 0.06, height*0.47).attribute("href","http://192.168.1.90/keyboard?params=$l");
    links[2].attribute("data-link","l").attribute("class","links").attribute("target","_blank").parent("links_control");

    // Right link in big circle -> mouse goes right
    links[3] = createElement("a","Right").position(width * 0.90, height*0.47).attribute("href","http://192.168.1.90/keyboard?params=$r");
    links[3].attribute("data-link","r").attribute("class","links").attribute("target","_blank").parent("links_control");

    // Top link in small circle -> mouse scrolls up
    links[4] = createElement("a","Sup").position(width*0.475, height * 0.375 * 1.01).attribute("href","http://192.168.1.90/keyboard?params=$t");
    links[4].attribute("data-link","t").attribute("class","links").attribute("target","_blank").parent("links_control");

    // Bottom link in small circle -> mouse scrolls down
    links[5] = createElement("a","Sown").position(width*0.475, height * 0.625*0.90).attribute("href","http://192.168.1.90/keyboard?params=$b");
    links[5].attribute("data-link","b").attribute("class","links").attribute("target","_blank").parent("links_control");
    
    colorMode(HSL);
    background(236,31,20);
    print(width);
    print(height);
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
$(function(){
    /*
    *   mouse_control.p5.js will create an interface for controlling mouse
    *   It's shape is a circle. This canvas(p5.canvas) is put into `div.col.s12`
    *   to strech all the width of the device.
    * 
    *   At the same time, p5.js will create some links to control mouse
    *   at relative position. However, these links are not in the correct position
    *   in term of vertical position. Those links are algined to the top of the page.
    *   
    *   Therefore, we will lower those links down with this file.
    *   1. Get the height of the canvas, which is also its width
    *   2. Prepeare CSS format for the `top` attribute: -> top:-[height]px
    *   3. Apply the CSS change to the div#links_control, which is the parent of those links
    */

    // step 1: get height
    var my_height = document.querySelector("#p5_mouse_control").offsetWidth;

    // step 2: get CSS format
    var my_top_pos = my_height * (-1);
    var top_pos = '';
    top_pos += my_top_pos.toString() + "px";

    // step 3: apply CSS change
    $("#links_control").css("top", top_pos);
});
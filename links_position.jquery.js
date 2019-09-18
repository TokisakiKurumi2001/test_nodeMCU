$(function(){
    var my_height = document.querySelector("#p5_mouse_control").offsetWidth;
    var my_top_pos = my_height * (-1);
    var top_pos = '';
    top_pos += my_top_pos.toString() + "px";
    $("#links_control").css("top", top_pos);
});
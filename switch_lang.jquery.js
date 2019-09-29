$(function(){
    var flag = 1;
    $("#switch_lang").click(function(){
        flag *= -1;
        if(flag < 0) {
            $("script[src=\"speech_recognition_vi.p5.js\"").remove();
            $("body").append("<script src = \"speech_recognition_en.p5.js\"></script>");
        }else{
            $("script[src=\"speech_recognition_en.p5.js\"").remove();
            $("body").append("<script src = \"speech_recognition_vi.p5.js\"></script>");
        }
    });
});
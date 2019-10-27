$(function(){
    /*
    *   By default, the language we used for recognition is Vietnamese
    *   However, if we can change it to English and switch back by the `switch`
    *   
    *   By default, flag > 0
    *   When the switch is clicked, flag change sign
    *   Depends on the sign, we decide to remove which lang and add which lang
    *
    *   flag < 0 -> change to English -> remove Vietnamese, add English
    *   flag > 0 -> change to Vietnamese -> remove English, add Vietnamese
    */
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
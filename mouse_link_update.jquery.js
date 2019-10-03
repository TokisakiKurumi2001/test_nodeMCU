$(function(){
    $("#device_ip").change(function(){
        var link = "http://" + $("#device_ip").val() + "/keyboard?params=$";
        var command = "";
        $(".links").each(function(){
            command = $(this)[0].dataset.link;
            $(this).attr("href",link + command);
        });
    });
});
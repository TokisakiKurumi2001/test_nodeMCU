$(function(){
    var ip = $("#device_ip").text();
    var device = new Device(ip);
    $("#send").click(function(){
        var text = $("#sending_text").text();
        device.callFunction('led',text);
    });
})
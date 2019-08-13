$(function(){
    function updateLink(message)
    {
        var new_link = "http://";
        var addr = $("#device_ip").val();
        new_link += addr;
        new_link += "/led?params=";
        var send_message = message;
        new_link += send_message;
        $("#id").attr("href",new_link);
    }
})
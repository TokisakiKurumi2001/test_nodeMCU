/*
*   This function is called when `format` inside the vue `app` changed
*   This function receive a string then replace the old link to control 
*   keyboard with new message to control keyboard
*
*   @params message: message receive(aka formatted string)
*/
function updateLink(message)
{
    /*
    *   Get the value of `device_ip` input and concat with some parameters
    *   and the `message`, then replace the link of the button establishing
    *   controlling to the keyboard
    */
    var new_link = "http://";
    var addr = document.getElementById("device_ip").value;
    new_link += addr + "/keyboard?params=" + message;
    document.getElementById("link").href = new_link;
}
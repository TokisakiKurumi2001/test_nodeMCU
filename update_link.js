function updateLink(message)
{
    var new_link = "http://";
    var addr = document.getElementById("device_ip").value;
    new_link += addr + "/keyboard?params=" + message;
    document.getElementById("link").href = new_link;
}
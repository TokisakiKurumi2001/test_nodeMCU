$(function(){
    /*
    *   Every time the input#device_ip has some changes(aka user inputs new address)
    *   We will update the mouse links
    *   http://[new_address]/keyboard?params=$[link_job]
    * 
    *   All the links has same class .links
    *   Foreach link with class `links`: 
    *   1. get its DOM
    *   2. access its field name `dataset`
    *   3. in that field, access `link` field. That will the link_job
    *   4. change the `href` attribute to the new update link
    * 
    *   Every link will have attribute `data-link` prepared in mouse_control.p5.js
    *   That attribute store the link_job. To access that link_job value,
    *   we must do like the above
    */
    $("#device_ip").change(function(){

        // get the new ip address of device
        var link = "http://" + $("#device_ip").val() + "/keyboard?params=$";
        var command = "";

        // foreach link having class `links`
        $(".links").each(function(){
            // access link_job = `$(this)[0]` -> dataset -> link
            command = $(this)[0].dataset.link; // $(this) -> array of 1 element
            // apply the new address by changing the href attribute
            $(this).attr("href",link + command);
        });
    });
});
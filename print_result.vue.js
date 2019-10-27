var app = new Vue({
    el: "#speech_recog",
    data: {
        message: "",
        format: ""
    }
})

/*
*   when there is any change in the value `message`
*   which means that the user record voice command or type in the command.
*   We will remove some Vietnamese accent of the newValue of `message`
*   (aka: new command from user)
*/
app.$watch("message", function(newValue, _) {
    format_symbol(newValue);
})

/*
*   When the `format` value change, which mean that the accent has been removed
*   We will update the link for the keyboard command button.
*   There is a button which has the link to open in new page and address to
*   establish command on nodeMCU, we need to update the link of that button
*   so that is has the right command to deliver
*/
app.$watch("format", function(newValue, _) {
    updateLink(newValue);
})
var app = new Vue({
    el: "#speech_recog",
    data: {
        message: "",
        format: ""
    }
})

app.$watch("message", function(newValue, oldValue) {
    format_symbol(newValue);
})
var lang = 'vi-VN';
var myRec = new p5.SpeechRec(lang);
myRec.continuous = true;
myRec.interimResults = true;

function start_record()
{
    myRec.onResult = parseResult;
    myRec.start();
}

function parseResult()
{
    var word = myRec.resultString;
    console.log(app.message = word);
}

function stop_record()
{
    myRec.stop();
}
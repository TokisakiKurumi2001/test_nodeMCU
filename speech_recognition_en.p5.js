var lang = 'en-US';
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
    // `word` : what the webapp have listened from us
    // then we pass it to the webpage through the pipe which Vue has created for us
    console.log(app.message = word);
}

function stop_record()
{
    myRec.stop();
}
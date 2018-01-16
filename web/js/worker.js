var i = 0;

function timedCount() {
    i++;
    var firstNumber = Math.floor((Math.random() * 250) + 1)
    var secondNumber = Math.floor((Math.random() * 250) + 1)
    var thirdNumber = Math.floor((Math.random() * 250) + 1)
    var color = "rgb("+firstNumber+","+ secondNumber+","+ thirdNumber+")";
    debugger;
    postMessage(color);
    setTimeout("timedCount()",500);
}

timedCount();
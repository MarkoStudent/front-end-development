
$(document).ready(function () {

    init();

});

function init() {

    var canvas = $("canvas").get(0);
    var context = canvas.getContext('2d');
    context.fillStyle = 'rgb(128, 186, 218)'
    context.fillRect(45, 20, 50, 30);
    context.fillRect(125, 20, 50, 30);
    context.fillRect(205, 20, 50, 30);

    //context.fillStyle = 'rgb(226, 222, 222)'
    context.fillRect(45, 70, 50, 30);
    context.fillRect(125, 70, 50, 30);
    context.fillRect(205, 70, 50, 30);

    //context.fillStyle = 'rgb(226, 222, 222)'
    context.fillRect(45, 120, 50, 30);
    context.fillRect(125, 120, 50, 30);
    context.fillRect(205, 120, 50, 30);
}


var ANIMAL_ENTITY = {
    animalsArray: [],

    createAnimalsArray: function () {

        var dog = {
            name: "dog",
            noise: "bark",
            executeNoise: function () {
                alert(this.noise);
            }
        }
        this.animalsArray.push(dog);
        var cat = {
            name: "cat",
            noise: "meow",
            executeNoise: function () {
                alert(this.noise);
            }
        }
        this.animalsArray.push(cat);
        var lion = {
            name: "lion",
            noise: "roar",
            executeNoise: function () {
                alert(this.noise);
            }
        }
        this.animalsArray.push(lion);

        this.animalsArray.forEach(displayNames);

        function displayNames(item) {
            alert(item.name);
        }

    },
    getAnimalsArray: function () {
        return this.animalsArray;
    },
    noise: function (animalName) {
        for (var index in this.animalsArray) {
            var entry = this.animalsArray[index];
            if (entry.name === animalName) {
                entry.executeNoise();
            }
        }

    }
}


function displayHideSections(entity, section) {
    var currentRow = entity.parentNode;
    var courseContent = $("#" + section).get(0);

    var topicsList = $("#navContainer").find(".topicsRow");
    var sectionList = $("#courseContainer").find("section");



    $.each(topicsList, function (index, entry) {

        if (entry == currentRow) {

            //Converting DOM object to JQuery Object
            var topicLabel = $($(currentRow).find("h3").get(0)).html();
            var img = $(currentRow).find("img").get(1);

            var headers = $("#headerContainer").find("div");

            $.each(headers, function (index, header) {
                var headerLabel = $(header).find("h2")[0].innerHTML;
                if (headerLabel != "HTML") {
                    if (headerLabel == topicLabel) {
                        $(header).removeClass();
                        $(header).addClass("headerTopicConainerVisible");
                    } else {
                        $(header).removeClass();
                        $(header).addClass("headerTopicConainerHidden");
                    }
                }
            });


            img.style.display = "block";
        } else {
            var img = $(entry).find("img").get(1);
            img.style.display = "none";
        }

    });

    $.each(sectionList, function (index, entry) {
        if (entry == courseContent) {
            $(courseContent).removeClass();
            $(courseContent).addClass("lessonContentVisible");
        } else {
            $(entry).removeClass();
            $(entry).addClass("lessonContentHidden");
        }
    });

}

function displayExample(itemId) {
    var examples = $(".example")
    examples.each(function (index) {
        $(this).css("display", "none")
    });

    var exampleToShow = $("#" + itemId);
    exampleToShow.css("display", "block")
}

function createAnimals() {
    ANIMAL_ENTITY.createAnimalsArray();
    var animals = ANIMAL_ENTITY.getAnimalsArray();
    var selectItem = $("#animalSelection");

    $.each(animals, function (index, entry) {
        selectItem.append("<option value='" + entry.name + "'>" + entry.name + "</option>");
    });

    selectItem.bind("change", onAnimalSwitch);


}

function onAnimalSwitch() {
    ANIMAL_ENTITY.noise(this.value);
}


//PROMISES CODE

//Get XML Google Maps
getXmlRequestPromise = function () {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        var url = "http://maps.googleapis.com/maps/api/geocode/xml?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false";
        req.open('GET', url);

        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function () {
            reject(Error(" Error"));
        };
        req.send();
    });
}

//Get JSON Google Maps
getJsonRequestPromise = function () {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        var url = "http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false";
        req.open('GET', url);

        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            }
            else {
                reject(Error(req.statusText));
            }
        };

        req.onerror = function () {
            reject(Error(" Error"));
        };
        req.send();
    });
}

var flag = true;

failedPromise = function () {
    return new Promise(function (resolve, reject) {

        if (!flag) {
            resolve(req.response);
        }
        else {
            reject(Error("Error with flag"));
        }
    });
}

exceptionPromise = function () {
    return new Promise(function (resolve, reject) {
        throw new Error("Exception in promise");
    });
}

function executeGetRequest() {


    getXmlRequestPromise().then(function (xmlResponse) {
        $("#responseXmlContainer").html(xmlResponse);
        return getJsonRequestPromise();
    }).then(function (jsonResponse) {
        $("#responseJsonContainer").html(JSON.stringify(JSON.parse(jsonResponse), null, 2));
        return exceptionPromise();
    }).catch(function (error) {
        console.log(error.message);
    });



}

//Web Worker code
var w;
function startWorker() {
    if (typeof (Worker) !== "undefined") {
        if (typeof (w) == "undefined") {
            w = new Worker("js/worker.js");
        }
        w.onmessage = function (event) {
            $("#result").css("backgroundColor", event.data);
        };
    } else {
        $("#result").html("Sorry! No Web Worker support.");
    }
}

function stopWorker() {
    w.terminate();
    w = undefined;
}


//Animate with JQuery
function startAnimation() {
    $("#square").css("position", "relative")
    $("#square").animate({ "left": "200px" }, "slow");
    $("#square").fadeTo(300, 0.4);
    $("#square").animate({ "top": "200px" }, "slow");
    $("#square").animate({ "left": "0px" }, "slow");
    $("#square").animate({ "top": "0px" }, "slow");
    $("#square").fadeTo(300, 1);
    $("#square").animate({ "top": "0px" }, "slow", startAnimation);

}

function makeAjaxRequest(url) {
    $.ajax({
        url: url,
        converters: {
            "text json": function (result) {
                return jQuery.parseJSON(result)
            },
            "text xml": function (result) {
                var userXml = $(jQuery.parseXML(result));
                var jsonUser = { name: userXml.find("name").text(), lastName: userXml.find("lastName").text(), age: userXml.find("age").text(), receiveNotifications: userXml.find("receiveNotifications").text() == 'true' ? true : false }

                return jsonUser;
            }

        },
        success: function (result) {
            $("#ajaxResponseContent").css("color", "black");
            $("#ajaxResponseContent").html(JSON.stringify(result));
        }, error: function (xhr) {
            $("#ajaxResponseContent").html("Status: " + xhr.status + " Message: " + xhr.statusText);
            $("#ajaxResponseContent").css("color", "red");
        }
    });
}

function runEffects() {
    var options = {};
    $("#effectDestroyContent").effect("explode", options, 500, effectCallback);
}

function effectCallback() {
    setTimeout(function () {
        $("#effectDestroyContent").removeAttr("style").hide().fadeIn();
    }, 1000);
};


function runEffectProgressBar() {
    var delayInMilliseconds = 1000; //1 second
    $('#progressBar').progressbar({ value: 0 });


    setTimeout(function () {
        $.ajax({
            method: 'GET',
            url: 'http://127.0.0.1:8080/json/user.json',
            xhr: function () {
                var xhr = $.ajaxSettings.xhr();
                xhr.onprogress = function (e) {
                    if (e.lengthComputable) {
                        var pct = (e.loaded / e.total);

                        $('#progressBar').css({
                            width: pct * 100 + '%'
                        });
                        if (pct === 1) {
                            $('#progressBar').addClass('hide');
                        }

                    } else {
                        console.warn('Content Length not reported!');
                    }
                };
                return xhr;
            }
        }).done(function (result) {
            $("#progressBarResult").html(JSON.stringify(result));
        }).fail(function (e) {
            console.log('Error');
        });
    }, delayInMilliseconds);


}

function resetEffects() {
    $("#effectDestroyContent").removeClass();
    $("#effectProgressBarContent").removeClass();


    $("#effectDestroyContent").addClass("destroyEffectContainer");
    $("#effectProgressBarContent").addClass("progressBarContainer");

    $("#progressBarResult").html("");
    $('#progressBar').css({
        width: "0px"
    });

}


function ajaxDefferExample() {
    $("#ajaxResponseContent").css("color", "black");
    callEndpoint("http://127.0.0.1:8080/json/user.json").then(function (jsonResponse) {
        console.log(JSON.stringify(jsonResponse))
        $("#ajaxResponseContent").html("<b>REQUEST TO JSON ENDPOINT:</b> " + JSON.stringify(jsonResponse) + "<br/>");
        return callEndpoint("http://127.0.0.1:8080/xml/user.xml")
    }).then(function (xmlResponse) {
        var jsonUser = { name: $(xmlResponse).find("name").text(), lastName: $(xmlResponse).find("lastName").text(), age: $(xmlResponse).find("age").text(), receiveNotifications: $(xmlResponse).find("receiveNotifications").text() == 'true' ? true : false }
        console.log(JSON.stringify(jsonUser));
        $("#ajaxResponseContent").append("<b>REQUEST TO XML ENDPOINT:</b> " + JSON.stringify(jsonUser));
    });
}


function callEndpoint(url) {
    var deferred = $.Deferred();
    $.get(url)
        .done(function (data) {
            deferred.resolve(data)
        })
        .fail(function (e) {
            deferred.reject(e);
        });
    return deferred.promise();
}




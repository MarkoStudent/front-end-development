window.addEventListener('load', init, false);

function init() {
    var canvas = document.querySelector("canvas");
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
    var courseContent = document.getElementById(section);
    var topicsList = document.getElementById("navContainer").getElementsByClassName("topicsRow");
    var sectionList = document.getElementById("courseContainer").getElementsByTagName("section");



    for (var index=0;index < topicsList.length; index++) {
        debugger;
        var entry = topicsList[index];
        if (entry == currentRow) {
            var topicLabel = currentRow.getElementsByTagName("h3")[0].innerHTML;
            var img = currentRow.getElementsByTagName("img")[1];

            var headers = document.getElementById("headerContainer").getElementsByTagName("div");

            for (var counter=0;counter<headers.length;counter++) {
                var header = headers[counter];
                var headerLabel = header.getElementsByTagName("h2")[0].innerHTML;
                if (headerLabel != "HTML") {
                    if (headerLabel == topicLabel) {
                        header.className = "headerTopicConainerVisible";
                    } else {
                        header.className = "headerTopicConainerHidden";
                    }
                }
            }


            img.style.display = "block";
        } else {
            var img = entry.getElementsByTagName("img")[1];
            img.style.display = "none";
        }

    }

    for (var index=0;index<sectionList.length;index++) {
        var entry = sectionList[index];
        if (entry == courseContent) {
            courseContent.className = "lessonContentVisible";
        } else {
            entry.className = "lessonContentHidden";
        }

    }

}

function displayExample(itemId) {
    var examples = document.getElementsByClassName("example")

    for (var index=0;index<examples.length;index++) {
        var entry = examples[index];
        entry.style.display = "none";

    }

    var exampleToShow = document.getElementById(itemId);

    exampleToShow.style.display = "block";
}

function createAnimals() {
    ANIMAL_ENTITY.createAnimalsArray();
    var animals = ANIMAL_ENTITY.getAnimalsArray();
    var selectItem = document.getElementById("animalSelection");

    for (var index=0;index<animals.length;index++) {
        var entry = animals[index];
        var opt = document.createElement("option");
        opt.value = entry.name;
        opt.innerHTML = entry.name;


        selectItem.appendChild(opt);

    }
    selectItem.addEventListener("change", onAnimalSwitch);


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
        debugger;
        document.querySelector("#responseXmlContainer").innerHTML = xmlResponse;
        return getJsonRequestPromise();
    }).then(function (jsonResponse) {
        debugger;
        document.querySelector("#responseJsonContainer").innerHTML = JSON.stringify(JSON.parse(jsonResponse), null, 2);
        //return failedPromise();
        return exceptionPromise();
    }).catch(function (error) {
        console.log(error.message);
    });


   
}

//Web Worker code
var w;
function startWorker() {
    debugger;
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("js/worker.js");
        }
        w.onmessage = function(event) {
            document.getElementById("result").style.backgroundColor = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
    }
}

function stopWorker() { 
    w.terminate();
    w = undefined;
}

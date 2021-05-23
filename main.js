var ime = "";
var status = "";
var objects = [];

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);

    ImageDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Identifing Object";
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {

        r = random(255);
        g = random(255);
        b = random(255);

        ImageDetector.detect(video,GotResult);

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status = Object Identified";

            document.getElementById("number_of_objects").innerHTML = "Number of objects identified = "+ objects.length;

            percent = floor(objects[i].confidence * 100);
            fill(r,g,b);
            noFill();
            stroke(r,g,b);
            text(objects[i].label + "" + percent + "%", objects[i].x, objects[i].y);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }



    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}

function GotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }

}

function preload(){

}
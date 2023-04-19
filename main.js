objectDetecter = "";
img = "";
objects = [];
status = "";

function preload() {
    img = loadImage('https://upload.wikimedia.org/wikipedia/commons/4/4d/Cat_November_2010-1a.jpg');
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status: Dectecting Object"
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetecter.detect(img, gotResults);
}

function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else{
    console.log(results);
    objects = results;    
    }
    
}

function draw() {
    image(img, 0, 0, 600, 400)
    if(status != ""){
    for(var i = 0; i<objects.length; i++){
        document.getElementById("status").innerHTML = "status: Object Dectected";
        fill("lightblue");
        stroke("blue")
        percent = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percent + "%" , objects[i].x + 15, objects[i].y + 15);
        noFill();
        rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
    }
    }
}
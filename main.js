function setup(){
    c1 = createCanvas(380, 380)
    c1.center()
    v1 = createCapture(VIDEO)
    v1.hide()
    myModel = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "detecting objects"
}
status = ""
objects = []
song = ""
function preload(){
    song = loadSound("old_telephone.mp3");
}
function modelLoaded(){
    console.log("cocossd has loaded");
    status = true;
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
console.log(results)
objects = results
    }
}

function draw(){
    image(v1, 0, 0, 380, 380)

if(status != ""){
    myModel.detect(v1, gotResult);
for(i = 0; i<objects.length; i++){
document.getElementById("status").innerHTML = "objects detected!!"
persent = floor(objects[i].confidence * 100)
fill("black")
text(objects[i].label + "   " + persent + " %", objects[i].x, objects[i].y)
noFill()
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
if(objects[i].label == "person"){
    document.getElementById("number").innerHTML = "anshul found";
song.stop();
}
else{
    document.getElementById("number").innerHTML = "alert. anshul is missing";
song.play();
}
}
if(objects.length == 0){
    document.getElementById("number").innerHTML = "alert. anshul is missing";
song.play();
}

}


}

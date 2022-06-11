leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWristX=0;
scorerightWristY=0;
song="";
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotposes);

}

function modelLoaded(){
    console.log('PoseNet is Initialized');
}
    
function draw(){
    image(video,0,0,600,500);

    fill("#FF000")
    stroke("#FF000")
    circle(rightWristX,rightWristY,20)
if(scorerightWristY>0.2){


    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed=0.5x"
        song.rate(0.5);
    }

    else if(rightWristY>100 && rightWristY <=200){
        document.getElementById("speed").innerHTML="Speed=1x"
        song.rate(1);
    }

    else if(rightWristY>200 && rightWristY <=300){
        document.getElementById("speed").innerHTML="Speed=1.5x"
        song.rate(1.5);
    }

    else if(rightWristY>300 && rightWristY <=400){
        document.getElementById("speed").innerHTML="Speed=2x"
        song.rate(2);
    }

    else if(rightWristY>400 && rightWristY <=500){
        document.getElementById("speed").innerHTML="Speed=2.5x"
        song.rate(2.5);
    }
}
    
    if(scoreLeftWristX>0.2)
    {
        circle(leftWristX,leftWristY,20);
    inNumber=Number(leftWristY);
    remove_decimal=floor(inNumber);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="volume="+volume;
    song.setVolume(volume);
    }
}


function play(){
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function gotposes(result){
    if(result.length>0){
        console.log(result)
        scoreLeftWristX=result[0].pose.keypoints[9].score;
        scorerightWristY=result[0].pose.keypoints[10].score
        console.log("scoreLeftWristX="+scoreLeftWristX+"scorerightWristY="+scorerightWristY)
        leftWristX=result[0].pose.leftWrist.x
        leftWristY=result[0].pose.leftWrist.y
        console.log("leftWristX="+leftWristX+"leftWristY="+leftWristY)

        rightWristX=result[0].pose.rightWrist.x
        rightWristY=result[0].pose.rightWrist.y
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY)


    }
}
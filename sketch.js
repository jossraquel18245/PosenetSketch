let video;
let poseNet;
let pose;
let skeleton;

function preload(){
  img = loadimage('assets/1.jpg');
}


function setup() {
  createCanvas(640, 480);

//webcam
  video = createCapture(VIDEO);
  //hide the webcam under canvas.
  video.hide();

//create posenet
  poseNet = ml5.poseNet(video, modelLoaded);
//turns this on
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses) {
  console.log(poses);
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
  }
}

function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {




//draw it as image on canvas
  image(video, 0, 0);

  if (pose) {

    let eyeR = pose.rightEye;
    let eyeL = pose.leftEye;

    //measure distance from camera by measuring distance between eyes
    let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
    image(img, pose.rightEye.x, pose .eye.y, d);
    image(img, pose.leftEye.x, pose .eye.y, d);

    //draw nose
    fill(245, 198, 218);
    rect(pose.nose.x, pose.nose.y, 64);
    fill(0, 0, 255);


    //draw ellipses on the wrists
    ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
    ellipse(pose.leftWrist.x, pose.rightWrist.y, 32);



    for (let i = 0; i < pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x;
      let y = pose.Keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    //draw lines between points
    for (let i = 0; i < skeleton.length; i++){
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y, b.position.x, b.position.y);
    }

  }
}

const video = document.getElementById("video");

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
  faceapi.nets.faceExpressionNet.loadFromUri("./models"),
]).then(startVideo);

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    (stream) => (video.srcObject = stream),
    (err) => console.error(err)
  );
}

video.addEventListener("play", () => {
  const canvas = faceapi.createCanvasFromMedia(video);
  document.getElementById("leftside").append(canvas);
  const displaySize = { width: video.width, height: video.height };
  faceapi.matchDimensions(canvas, displaySize);
  setInterval(async () => {
    const detections = await faceapi
      .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    if (detections.length != 0) {
      obj = detections[0].expressions;
      var sortable = [];
      for (var vehicle in obj) {
        sortable.push([vehicle, obj[vehicle]]);
      }
      sortable.sort(function (a, b) {
        return a[1] - b[1];
      });
      let emotion = sortable[6][0];
      document.getElementById("mood").innerHTML = emotion;

      switch (emotion) {
        default:
          document.getElementById("Background").style.fill = "white";
          document.getElementById("emoji").innerHTML = "( ‾ ʖ̫ ‾)";
          break;
        case "happy":
          document.getElementById("Background").style.fill = "yellow";
          document.getElementById("emoji").innerHTML = "(☝︎ ՞ਊ ՞)☝︎";
          break;
        case "sad":
          document.getElementById("Background").style.fill = "blue";
          document.getElementById("emoji").innerHTML = "(  ꈨຶꎁꈨຶ )";
          break;
        case "angry":
          document.getElementById("Background").style.fill = "red";
          document.getElementById("emoji").innerHTML = "ᕙ( ︡'︡益'︠)ง";
          break;
        case "surprised":
          document.getElementById("Background").style.fill = "purple";
          document.getElementById("emoji").innerHTML = "(╯°□°)╯";
          break;
        case "disgusted":
          document.getElementById("Background").style.fill = "green";
          document.getElementById("emoji").innerHTML = "(╬⓪益⓪)";
          break;
        case "fearful":
          document.getElementById("Background").style.fill = "orange";
          document.getElementById("emoji").innerHTML = "(,,#ﾟДﾟ)";
          break;
      }
    }
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    //faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});

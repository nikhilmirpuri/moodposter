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
          //offwhite
          document.getElementById("neutral").style.display = "block";
          document.getElementById("happy").style.display = "none";
          document.getElementById("sad").style.display = "none";
          document.getElementById("angry").style.display = "none";
          document.getElementById("surprised").style.display = "none";
          document.getElementById("disgusted").style.display = "none";
          document.getElementById("fearful").style.display = "none";

          document.getElementById("face").style.fill = "#a09879";
          document.getElementById("BACKGROUND").style.fill = "#a09879";
          document.getElementById("neutral").style.fill = "#635d46";
          document.getElementById("emoji").style.fill = "#635d46";
          document.getElementById("emoji").innerHTML =
            "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;‾ ʖ̫ ‾&nbsp;)";
          break;
        case "happy":
          //yellow
          document.getElementById("neutral").style.display = "none";
          document.getElementById("happy").style.display = "block";
          document.getElementById("sad").style.display = "none";
          document.getElementById("angry").style.display = "none";
          document.getElementById("surprised").style.display = "none";
          document.getElementById("disgusted").style.display = "none";
          document.getElementById("fearful").style.display = "none";

          document.getElementById("face").style.fill = "#fbd266";
          document.getElementById("BACKGROUND").style.fill = "#fbd266";
          document.getElementById("happy").style.fill = "#ce9705";
          document.getElementById("emoji").style.fill = "#ce9705";
          document.getElementById("emoji").innerHTML =
            "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;՞ਊ&nbsp;՞&nbsp;)";
          //document.getElementById("emoji").innerHTML = "(☝︎ ՞ਊ ՞)☝︎";
          break;
        case "sad":
          //blue
          document.getElementById("neutral").style.display = "none";
          document.getElementById("happy").style.display = "none";
          document.getElementById("sad").style.display = "block";
          document.getElementById("angry").style.display = "none";
          document.getElementById("surprised").style.display = "none";
          document.getElementById("disgusted").style.display = "none";
          document.getElementById("fearful").style.display = "none";

          document.getElementById("face").style.fill = "#669bc5";
          document.getElementById("BACKGROUND").style.fill = "#669bc5";
          document.getElementById("sad").style.fill = "#315e82";
          document.getElementById("emoji").style.fill = "#315e82";
          document.getElementById("emoji").innerHTML =
            "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ꈨຶꎁꈨຶ&nbsp;&nbsp;)";
          break;
        case "angry":
          //red
          document.getElementById("neutral").style.display = "none";
          document.getElementById("happy").style.display = "none";
          document.getElementById("sad").style.display = "none";
          document.getElementById("angry").style.display = "block";
          document.getElementById("surprised").style.display = "none";
          document.getElementById("disgusted").style.display = "none";
          document.getElementById("fearful").style.display = "none";

          document.getElementById("face").style.fill = "#963d3d";
          document.getElementById("BACKGROUND").style.fill = "#963d3d";
          document.getElementById("angry").style.fill = "#5a2525";
          document.getElementById("emoji").style.fill = "#5a2525";
          document.getElementById("emoji").innerHTML =
            "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'益'︠&nbsp;&nbsp;)";
          break;
        case "surprised":
          //purple
          document.getElementById("neutral").style.display = "none";
          document.getElementById("happy").style.display = "none";
          document.getElementById("sad").style.display = "none";
          document.getElementById("angry").style.display = "none";
          document.getElementById("surprised").style.display = "block";
          document.getElementById("disgusted").style.display = "none";
          document.getElementById("fearful").style.display = "none";

          document.getElementById("face").style.fill = "#b07bac";
          document.getElementById("BACKGROUND").style.fill = "#b07bac";
          document.getElementById("surprised").style.fill = "#70436d";
          document.getElementById("emoji").style.fill = "#70436d";
          document.getElementById("emoji").innerHTML =
            "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;°□°&nbsp;)";
          break;
        case "disgusted":
          //green
          document.getElementById("neutral").style.display = "none";
          document.getElementById("happy").style.display = "none";
          document.getElementById("sad").style.display = "none";
          document.getElementById("angry").style.display = "none";
          document.getElementById("surprised").style.display = "none";
          document.getElementById("disgusted").style.display = "block";
          document.getElementById("fearful").style.display = "none";

          document.getElementById("face").style.fill = "#536B5B";
          document.getElementById("BACKGROUND").style.fill = "#536B5B";
          document.getElementById("disgusted").style.fill = "#324037";
          document.getElementById("emoji").style.fill = "#324037";
          document.getElementById("emoji").innerHTML = "(╬⓪益⓪)";
          break;
        case "fearful":
          //orange
          document.getElementById("neutral").style.display = "none";
          document.getElementById("happy").style.display = "none";
          document.getElementById("sad").style.display = "none";
          document.getElementById("angry").style.display = "none";
          document.getElementById("surprised").style.display = "none";
          document.getElementById("disgusted").style.display = "none";
          document.getElementById("fearful").style.display = "block";

          document.getElementById("face").style.fill = "#f4a454";
          document.getElementById("BACKGROUND").style.fill = "#f4a454";
          document.getElementById("fearful").style.fill = "#b9620c";
          document.getElementById("emoji").style.fill = "#b9620c";
          document.getElementById("emoji").innerHTML =
            "(&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;#ﾟДﾟ&nbsp;)";
          break;
      }
    }
    const resizedDetections = faceapi.resizeResults(detections, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
  }, 100);
});

html2canvas(document.querySelector("#wb_capture")).then(canvas => {
    let d_nested = document.getElementById("wb_capture");
    document.body.removeChild(d_nested);
    document.body.appendChild(canvas);
    let mycanvas = document.getElementsByTagName("canvas");
    mycanvas[0].setAttribute("id", "wb_canvas");
});


function downloadCanvas(){
  var canvas = document.getElementById("wb_canvas");
  ReImg.fromCanvas(canvas).downloadPng()
}
document.getElementById("dl").addEventListener('click', downloadCanvas, false);


var mouseX, mouseY;

var startX = 0;
var startY = window.innerHeight / 2;
var endX = window.innerWidth;
var endY = window.innerHeight / 2;
string = `M${startX},${startY} T${endX},${endY}`
document.getElementById('curve').setAttribute('d', string)


window.addEventListener(
    "mousemove",
    function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        move();
    },
    false
);

function move() {

    var startX = 0;
    var startY = window.innerHeight / 2;
    var endX = window.innerWidth ;
    var endY = window.innerHeight / 2;

    var midPointY = (endY + startY) / 2;
    var midPointX = (endX + startX) / 2;
    var xDiff = endX - startX;

    //Calculate 1st Control Point
    var cp1X = Math.floor(startX + xDiff / 4);
    var cp1Y = Math.floor(midPointY + (midPointY - mouseY) * 0.3)

    //Calculate 2nd Control Point
    var cp2X = Math.floor(startX + 2 * xDiff / 4);
    var cp2Y = Math.floor(midPointY - (midPointY - mouseY) * 0.3)

    //Calculate 3rd Control Point
    var cp3X = Math.floor(startX + 3 * xDiff / 4);
    var cp3Y = Math.floor(midPointY + (midPointY - mouseY) * 0.3)


    const points = [
        { x: startX, y: startY },
        { x: cp1X, y: cp1Y },
        { x: cp2X, y: cp2Y },
        { x: cp3X, y: cp3Y },
        { x: endX, y: endY },
    ];

    string = `M${startX},${startY} `
    for (var i = 1; i < points.length - 2; i++) {
        var xc = (points[i].x + points[i + 1].x) / 2;
        var yc = (points[i].y + points[i + 1].y) / 2;
        string += `Q${points[i].x},${points[i].y}, ${xc}, ${yc} `;
    }
    string += `T${endX},${endY}`
    // console.log(string)

    document.getElementById('curve').setAttribute('d', string)
    document.getElementById('text-path1').setAttribute('startOffset', `${50 + (mouseX - midPointX) * 0.01}%`)
    document.getElementById('text-path2').setAttribute('startOffset', `${50 - (mouseX - midPointX) * 0.004}%`)
    document.getElementById('text-path3').setAttribute('startOffset', `${50 + (mouseX - midPointX) * 0.01}%`)

}
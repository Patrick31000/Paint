var mousePressed = false;
var lastX, lastY;
var ctx;
var originX
var originY
var finalX
var finalY


var colors = [];
$("input:button").each(function() {
    colors.push($(this).attr('data-color'));
});

var i = 0;
$("input:button").each(function() {

    $(this).css("background-color", colors[i]);
    i++;
});


/*var r = finalX - originX;
console.log(r);*/

function InitThis() {
    ctx = document.getElementById('paint').getContext("2d");

    $('#paint').mousedown(function(e) {
        mousePressed = true;
        originX = e.pageX - $(this).offset().left;
        originY = e.pageY - $(this).offset().top;
        Draw(originX, originY, false);
    });

    $('#paint').mousemove(function(e) {
        if (mousePressed) {
            finalX = e.pageX - $(this).offset().left;
            finalY = e.pageY - $(this).offset().top;
            Draw(finalX, finalY, true);
        }
    });

    $('#paint').mouseup(function(e) {
        mousePressed = false;
    });
    $('#paint').mouseleave(function(e) {
        mousePressed = false;
    });
}

$("input:button").click(function() {
    fond = $(this).attr("data-color");
    var r = finalX - originX;
    console.log(r);
});

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = fond;
        ctx.lineWidth = 10; /*$('#selWidth').val();*/
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;

    $("input:button").click(function() {
        fond = $(this).attr("data-color");
    });



    /*function InitThis() {
        ctx = document.getElementById('paint').getContext("2d");

        $('#paint').mousedown(function(e) {
            mousePressed = true;
            originX = e.pageX - $(this).offset().left;
            originY = e.pageY - $(this).offset().top;
            Draw(originX, originY, false);
        });

        $('#paint').mousemove(function(e) {
            if (mousePressed) {
                finalX = e.pageX - $(this).offset().left;
                finalY = e.pageY - $(this).offset().top;
                Draw(finalX, finalY, true);
            }
        });

        $('#paint').mouseup(function(e) {
            mousePressed = false;
        });
        $('#paint').mouseleave(function(e) {
            mousePressed = false;
        });
    }

    $("input:button").click(function() {
        fond = $(this).attr("data-color");

        var r = finalX - originX;
        console.log(r);
    });

    function Circle(originX, originY, (finalX - originX), isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = fond;
            ctx.lineWidth = 10; /*$('#selWidth').val();
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();
        }
        lastX = x;
        lastY = y;
    };*/
}
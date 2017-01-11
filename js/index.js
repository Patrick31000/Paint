$(document).ready(function() {




    var mousePressed = false;
    var lastX, lastY;
    var ctx;
    var originX
    var originY
    var finalX
    var finalY
    var endX = finalX - originX
    var endY = finalY - originY



    var colors = [];
    $("input:button").each(function() {
        colors.push($(this).attr('data-color'));
    });

    var i = 0;
    $("input:button").each(function() {

        $(this).css("background-color", colors[i]);
        i++;
    });

    $("#Trait").click(function() {
        Dessin();
    });

    function Dessin() {
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
            endX = e.pageX - $(this).offset().left;
            endY = e.pageY - $(this).offset().top;
            console.log(endX)
            console.log(endY)
        });
        $('#paint').mouseleave(function(e) {
            mousePressed = false;
        });
    }

    $("input:button").click(function() {
        fond = $(this).attr("data-color");
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
    }


    $("#Initialiser").click(function() {
        Initialiser();
    });

    function Initialiser() {

        ctx.clearRect(0, 0, paint.width, paint.height);

    }



    $("#saveImage").click(function() {
        saveImage();
    });

    function saveImage() {
        var ua = window.navigator.userAgent;

        if (ua.indexOf("Chrome") > 0) {
            // save image without file type
            var canvas = document.getElementById("paint");
            document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            // save image as png
            var link = document.createElement('a');
            link.download = "test.png";
            link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");;
            link.click();
        } else {
            alert("Please use Chrome");
        }
    };
});

/*$("#carre").click(function() {
    Rectangle();
});


function Rectangle() {
    ctx = document.getElementById('paint').getContext("2d");

    $('#paint').mousedown(function(f) {
        mousePressed = true;
        originX = f.pageX - $(this).offset().left;
        originY = f.pageY - $(this).offset().top;
        square(originX, originY, false);
    });

    $('#paint').mousemove(function(f) {
        if (mousePressed) {
            finalX = f.pageX - $(this).offset().left;
            finalY = f.pageY - $(this).offset().top;;
        }
    });

    $('#paint').mouseup(function(f) {
        mousePressed = false;
        endX = f.pageX - $(this).offset().left;
        endY = f.pageY - $(this).offset().top;
        console.log(endX)
        console.log(endY)
        square(endX, endY, false);
    });
    $('#paint').mouseleave(function(e) {
        mousePressed = false;
    });
}

$("input:button").click(function() {
    fond = $(this).attr("data-color");
});

function square(originX, originY, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = fond;
        ctx.lineWidth = 10; /*$('#selWidth').val();
        ctx.moveTo(originX, originY, endX, endY);
        ctx.rect(endX, endY);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}*/
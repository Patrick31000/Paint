$(document).ready(function() {




    var mousePressed = false;
    var lastX, lastY;
    var originX
    var originY
    var finalX
    var finalY
    var endX
    var endY
    ctx = document.getElementById('paint').getContext("2d");



    //Récuperation des couleurs dans le html//
    var colors = [];
    $("input:button").each(function() {
        colors.push($(this).attr('data-color'));
    });
    //On pousse les couleurs dans les boutons//
    var i = 0;
    $("input:button").each(function() {

        $(this).css("background-color", colors[i]);
        i++;
    });
    //Initialisation de la fonction Dessin//
    $("#Trait").click(function() {
        Dessin();
    });
    //Recuperation coordonnées souris//
    function Dessin() {

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


        });
        $('#paint').mouseleave(function(e) {
            mousePressed = false;
        });
    }
    //Recuperation des couleurs quand bouton cliqué//
    $("input:button").click(function() {
        fond = $(this).attr("data-color");
    });

    //Fonction Dessin du canvas//
    function Draw(x, y, isDown) {
        if (isDown) {
            ctx.beginPath();
            ctx.strokeStyle = fond;
            ctx.lineWidth = $('#selWidth').val();;
            ctx.lineJoin = "round";
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.closePath();
            ctx.stroke();

        }
        lastX = x;
        lastY = y;
    }

    //Lancement de la fonction initialiser//

    $("#Initialiser").click(function() {
        Initialiser();
    });

    //Fonction Initialiser//

    function Initialiser() {
        ctx.clearRect(0, 0, paint.width, paint.height);
    }


    //Lancement de la fonction Sauvegarde Image//
    $("#saveImage").click(function() {
        saveImage();
    });
    //Fonction de sauvegarde d'image//
    function saveImage() {
        var ua = window.navigator.userAgent;

        if (ua.indexOf("Chrome") > 0) {
            // save image without file type
            var canvas = document.getElementById("paint");
            document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            // save image as png
            var link = document.createElement('a');
            link.download = "test.png";
            link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.click();
        } else {
            alert("Please use Chrome");
        }
    };



    //Lancement fonction carré et récupération des coordonnées de la souris//
    $('#carre').click(function() {

        $('#paint').mousedown(function(f) {
            originX = (f.pageX - this.offsetLeft);
            originY = (f.pageY - this.offsetTop);
            mousePressed = true;
        });

        $('#paint').mousemove(function(f) {
            if (mousePressed) {
                endX = (f.pageX - this.offsetLeft) - originX;
                endY = (f.pageY - this.offsetTop) - originY;
            }
        });

        $('#paint').mouseup(function(f) {
            finalX = f.pageX - this.offsetLeft;
            finalY = f.pageY - this.offsetTop;
            draw();
            mousePressed = false;
        });
        $('#paint').mouseleave(function(f) {
            mousePressed = false;
        });
        // Fonction canvas pour tracer des rectangles//
        function draw() {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = fond;
            ctx.lineWidth = $('#selWidth').val();;
            ctx.lineJoin = "round";
            ctx.strokeRect(originX, originY, endX, endY, finalX, finalY);
            ctx.closePath();
            ctx.stroke();

        };
    });

    //Lancement fonction cercle et récupération des coordonnées de la souris//
    $('#cercle').click(function() {



        $('#paint').mousedown(function(g) {
            originX = (g.pageX - this.offsetLeft);
            originY = (g.pageY - this.offsetTop);
            mousePressed = true;
        });

        $('#paint').mousemove(function(g) {
            if (mousePressed) {
                endX = (g.pageX - this.offsetLeft) - originX;
                endY = (g.pageY - this.offsetTop) - originY;
            }
        });

        $('#paint').mouseup(function(g) {
            finalX = g.pageX - this.offsetLeft;
            finalY = g.pageY - this.offsetTop;
            circle();
            mousePressed = false;
        });
        $('#paint').mouseleave(function(g) {
            mousePressed = false;
        });

        //fonction canvas du cercle//
        function circle() {
            ctx.save();
            radius = Math.sqrt(Math.pow((originX - finalX), 2) + Math.pow((originY - finalY), 2));
            ctx.beginPath();
            ctx.strokeStyle = fond;
            ctx.lineWidth = $('#selWidth').val();;
            ctx.lineJoin = "round";
            ctx.arc(originX, originY, radius, 0, (Math.PI * 2), true);
            ctx.closePath();
            ctx.stroke();
            ctx.save();
        };
    });
});

$("#save").click(function() {
    canvas2 = ctx.getImageData(0, 0, 1000, 600);
    console.log(canvas2);
});

$("#reload").click(function() {
    ctx.putImageData(canvas2, 0, 0);
});


$("#refresh").click(function() {
    var container = document.getElementById("paint");
    var content = container.innerHTML;
    container.innerHTML = content;
});
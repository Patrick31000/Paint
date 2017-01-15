$(document).ready(function() {



    var tool
    var mousePressed = false;
    var lastX, lastY;
    var originX
    var originY
    var finalX
    var finalY
    var endX
    var endY
    ctx = document.getElementById('paint').getContext("2d");



    function initDraw(e, tool) {
        if (tool == "carre") {
            rect();
        } else if (tool == "Trait") {
            Draw();
        } else if (tool == 'cercle') {
            circle();
        } else {
            return false;
        }
    }
    $(".outil").click(function(e) {
        tool = $(this).attr('id');
        console.log(tool);
        $("#paint").mousedown(function(e) {
            originX = e.pageX - $(this).offset().left;
            originY = e.pageY - $(this).offset().top;
            z = true;
            $(this).mousemove(function(e) {
                finalX = e.pageX - $(this).offset().left;
                finalY = e.pageY - $(this).offset().top;
                initDraw(e, tool);
                prevX = e.pageX - $(this).offset().left;
                prevY = e.pageY - $(this).offset().top
                $("#paint").mouseup(function(e) {
                    endX = e.pageX - $(this).offset().left;
                    endY = e.pageY - $(this).offset().top;
                    z = false;

                    $(this).unbind('mousemove');
                });
                $('#paint').mouseleave(function() {
                    endX = e.pageX - $(this).offset().left;
                    endY = e.pageY - $(this).offset().top;
                    z = false;


                    $(this).unbind('mousemove');
                });

            });
        });
        if (tool == "Initialiser") {
            Initialiser();
        }
    });

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




    //Recuperation des couleurs quand bouton cliqué//
    $("input:button").click(function() {
        fond = $(this).attr("data-color");
        console.log(fond);
    });

    //Fonction Dessin du canvas//
    function Draw(x, y, z) {
        if (z) {
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
            // Sauvegarde temporaire
            var canvas = document.getElementById("paint");
            document.location.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

            // sauvegarde au format png
            var link = document.createElement('a');
            link.download = "test.png";
            link.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            link.click();
        } else {
            alert("Please use Chrome");
        }
    };

    function rect() {
        if (z) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = fond;
            ctx.lineWidth = $('#selWidth').val();;
            ctx.lineJoin = "round";
            ctx.strokeRect(originX, originY, endX, endY, finalX, finalY);
            ctx.closePath();
            ctx.stroke();

        }
    }



    //fonction canvas du cercle//
    function circle() {
        if (z) {
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
        }
    }



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
});
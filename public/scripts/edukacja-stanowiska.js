// Functionality for zoom main image
$(".bigImg img").click(function() {
    let imgSrc = $(this).attr("src");
    $(this).closest(".bigImg").toggleClass("zoomImg");

    $("html, body").scrollTop(0);

    if ($(".bigImg").hasClass("zoomImg")) {
        $("body").css("overflow", "hidden");

        setTimeout(function() {
         $("body").click(function() {
            $(".bigImg ").removeClass("zoomImg");
            $("body").css("overflow", "");
            $("body").off("click");
        });           
        },50)


    } else {
        $("body").css("overflow", "");
    }


    $(".stanowiskaContainer .bigImg img").fadeToggle(200, function() {
        $(this).attr("src", imgSrc).fadeToggle(200);
    });
    $("#IPE-Container .bigImg img").fadeToggle(200, function() {
        $(this).fadeToggle(200);
    });
});

// Functionality for changing images
$(".smallImg img").click(function() {
    let imgSrc = $(this).attr("src");
    let previousSrc = $(".bigImg img").attr("src");

    $(".bigImg img").fadeToggle(200, function() {
        $(this).attr("src", imgSrc).fadeToggle(200);
    });

    $(this).fadeOut(400, function() {
        $(this).attr("src", previousSrc).fadeIn(400);
    });
});

